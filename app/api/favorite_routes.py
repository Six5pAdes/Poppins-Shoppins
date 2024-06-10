from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Favorite, Product

favorite_routes = Blueprint('favorite', __name__)


# get all favorites under the current user
# /api/favorites/current
@favorite_routes.route('/current')
@login_required
def fav_by_user():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorites_list = [fav.to_dict() for fav in favorites]

    product_id_list = [favorite["product_id"] for favorite in favorites_list]
    products = Product.query.filter(Product.id.in_(product_id_list)).all()
    product_list = [products.to_dict() for product in products]

    return {'MyFavorites': favorites_list, 'FavInst': product_list}, 200


# add to favorites
# /api/favorites/new
@favorite_routes.route('/new', methods=['POST'])
@login_required
def add_fav():
    data = request.json
    product_id = data.get('product_id')
    new_fav = Favorite(user_id=current_user.id, product_id=product_id)
    if not new_fav:
        return {'message': 'Cannot Add to favorites'}, 400
    db.session.add(new_fav)
    db.session.commit()
    return {'message': 'Added to favorites'}, 200

# delete a favorites
# /api/favorites/:favoriteId/delete
@favorite_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def remove_fav(id):
    favorite = Favorite.query.get(id)
    if not favorite:
        return {'message': 'Favorite item is not found'}, 404
    if favorite.user_id != current_user.id:
        return redirect('api/auth/unauthorized')
    db.session.delete(favorite)
    db.session.commit()
    return {'message': 'Successfully Deleted'}, 200
