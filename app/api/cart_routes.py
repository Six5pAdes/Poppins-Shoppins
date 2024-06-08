from flask import Blueprint, request, jsonify
from app.models import Cart, Product, CartItem, db
from flask_login import current_user, login_required
from ..forms.cart_item_form import CartItemForm


cart_routes = Blueprint('cart', __name__)


# getting all carts of current user
@cart_routes.route('/')
@login_required
def getCarts():
    carts = Cart.query.filter(Cart.user_id == current_user.id).all()
    response = [cart.to_dict() for cart in carts]
    return {'carts': response}


# getting a specific cart under current user
@cart_routes.route('/active')
@login_required
def getActiveCart():
    cart = Cart.query.filter(Cart.user_id == current_user.id, Cart.is_ordered == False).first()
    if not cart:
        return jsonify({'message': 'No active cart found'})
    if cart.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}, 401)
    return {'active cart': cart.to_dict()}


# getting all cart items
@cart_routes.route('/<int:id>')
@login_required
def getCartItems(id):
    curr_cart = Cart.query.get(id)
    if curr_cart.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}, 401)

    cart_items = CartItem.query.filter(CartItem.cart_id == id).all()
    response = [cart_item.to_dict() for cart_item in cart_items]
    return {'cart_items': response}


# creating a cart
@cart_routes.route('/new-cart', methods=['POST'])
@login_required
def create_cart():
    active_cart = Cart.query.filter(Cart.user_id == current_user.id, Cart.is_ordered == False).first()
    if active_cart:
        return jsonify({'message': 'Cart is already active with user, there cannot be two new carts.'}), 400

    new_cart = Cart(
        user_id=current_user.id,
        is_ordered=False
    )
    db.session.add(new_cart)
    db.session.commit()
    return new_cart.to_dict()


# creating a new cart item
@cart_routes.route('/<int:id>/product/new', methods=['POST'])
@login_required
def create_cart_item(id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    active_cart = Cart.query.filter(Cart.user_id == current_user.id, Cart.is_ordered == False).first()
    if form.validate_on_submit():
        new_cart_item = CartItem(
            cart_id=id,
            product_id=form.data['product_id'],
            quantity=form.data['quantity']
        )
        db.session.add(new_cart_item)
        db.session.commit()
        return new_cart_item.to_dict()
    return jsonify({'error': form.errors}), 400


# updating a cart item
@cart_routes.route('/active/<int:id>/product/edit', methods=['PUT'])
@login_required
def update_cart_item(id):
    cart_item = CartItem.query.get(id)
    if not cart_item:
        return jsonify({'message': 'Cart item not found'}), 404

    curr_cart = Cart.query.filter(Cart.id == cart_item.cart_id).first()
    if curr_cart.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}, 401)
    if curr_cart.is_ordered == True:
        return jsonify({'message': 'Cannot edit cart item that was already ordered'}), 400

    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # active_cart = Cart.query.filter(Cart.user_id == current_user.id, Cart.is_ordered == False).first()

    if form.validate_on_submit():
        cart_item.quantity = form.data['quantity']
        db.session.commit()
        return cart_item.to_dict()
    return jsonify({'error': form.errors}), 400


# deleting a cart item
@cart_routes.route('/active/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_cart_item(id):
    cart_item = CartItem.query.get(id)
    if not cart_item:
        return jsonify({'message': 'Cart item not found'}), 404

    curr_cart = Cart.query.filter(Cart.id == cart_item.cart_id).first()
    if curr_cart.user_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}, 401)
    if curr_cart.is_ordered == True:
        return jsonify({'message': 'Cannot delete cart item that was already ordered'}), 400

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'}), 200
