from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    if not user:
        return {"errors": "User not found"}, 404
    return jsonify(user.to_dict())


# update user information
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": f'The user to edit was not found'}, status=404)

    data = request.get_json()

    user.username = data['username']
    user.email = data['email']
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    if 'password' in data:
        user.password = data['password']

    # Commit changes to the database
    db.session.commit()

    return jsonify(user.to_dict())


# delete
@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": f'The user to edit was not found'}, status=404)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"})
