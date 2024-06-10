from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, OrderHistory, Product


order_history_routes = Blueprint('history', __name__)


# get all the order history
# /api/history
@order_history_routes.route('/')
# @login_required
def all_history():
    histories = OrderHistory.query.all()
    history_list = [history.to_dict() for history in histories]
    return {'OrderHistory': history_list}, 200

# get histories by current user
# /api/history/current
@order_history_routes.route('/current')
@login_required
def history_by_user():
    curr_history = OrderHistory.query.filter_by(user_id=current_user.id).all()
    curr_history_list = [history.to_dict() for history in curr_history]

    product_id_list = [history["product_id"] for history in curr_history_list]
    products = Product.query.filter(Product.id.in_(product_id_list)).all()
    product_list = [product.to_dict() for product in products]

    return {'UserOrderHistory': curr_history_list, 'HistoryInst': product_list }, 200


# add to history
# /api/history/new
@order_history_routes.route('/new', methods=['POST'])
@login_required
def add_history():
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    new_history = OrderHistory(user_id=current_user.id, product_id=product_id, quantity=quantity)
    if not new_history:
        return {'message': 'Cannot Add to history'}, 400
    db.session.add(new_history)
    db.session.commit()
    return {'message': 'History is stored successfully'}, 200


# delete a history
# /api/history/delete
@order_history_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_history(id):
    history = OrderHistory.query.get(id)
    if not history:
        return {'message': 'Order history is not found'}, 404
    if history.user_id != current_user.id:
        return redirect('api/auth/unauthorized')
    db.session.delete(history)
    db.session.commit()
    return {'message': 'Successfully Deleted'}, 200
