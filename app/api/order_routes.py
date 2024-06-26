from flask import Blueprint, request, redirect, jsonify
from flask_login import login_required, current_user
from app.models import OrderItem, db


order_routes = Blueprint('orders', __name__)


# getting all cart items
@order_routes.route('/')
@login_required
def getOrders():
    orders = OrderItem.query.all()
    response = [order.to_dict() for order in orders]
    return {'OrderItems': response}, 200


# getting order by current user
@order_routes.route('/current')
@login_required
def ordersByUser():
    orders = OrderItem.query.filter_by(user_id = current_user.id).all()
    response = [order.to_dict() for order in orders]
    return {'CurrOrders': response}, 200


# getting order by order id
@order_routes.route('/<int:id>')
@login_required
def getOrderById(id):
    order = OrderItem.query.get(id)
    if not order:
        return jsonify({'message': 'No order found'}), 404
    if order.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 401
    else:
        order = order.to_dict()
        return order.to_dict(), 200


# creating an order
@order_routes.route('/new', methods=['POST'])
@login_required
def createOrder():
    data = request.json
    product_id = data.get('product_id')
    new_order = OrderItem(
        user_id=current_user.id,
        product_id=product_id,
        quantity=1,
    )
    db.session.add(new_order)
    db.session.commit()
    return {'message': 'Order created successfully'}, 201


# updating an order
@order_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def updateOrder(id):
    data = request.json
    new_quantity = data.get('quantity')
    order = OrderItem.query.get(id)
    if not order:
        return jsonify({'message': 'No order found'}), 404
    if order.user_id != current_user.id:
        return redirect({'api/auth/unauthorized'})
    if new_quantity <= 0:
        db.session.delete(order)
        db.session.commit()
        return jsonify({'message': 'Order deleted successfully'}), 200
    order.quantity = new_quantity
    db.session.commit()
    return order.to_dict(), 200


# deleting an order
@order_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def deleteOrder(id):
    order = OrderItem.query.get(id)
    if not order:
        return jsonify({'message': 'No order found'}), 404
    if order.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 401
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully'}), 200


# deleting all orders
@order_routes.route('/current/clear', methods=['DELETE'])
@login_required
def clearOrders():
    orders = OrderItem.query.filter_by(user_id=current_user.id).all()
    if not orders:
        return jsonify({'message': 'Nothing can be found in your cart'}), 400
    for order in orders:
        db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Orders deleted successfully'}), 200
