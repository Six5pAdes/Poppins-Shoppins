from flask import Blueprint, request
from app.models import Review, db
from app.forms.review_form import ReviewForm


review_routes = Blueprint('review', __name__ )


# getting reviews
@review_routes.route('/<int:reviewId>')
def getReviews(id):
    reviews = Review.query.filter(Review.product_id == id)
    response = [review.to_dict() for review in reviews]
    return {'reviews': response}


# creating review
@review_routes.route('/new-review', methods=['POST'])
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            user_id=form.data['user_id'],
            product_id=form.data['product_id'],
            body = form.data['body'],
            rating = form.data['rating'],
            created_at=form.data['created_at'],
            updated_at=form.data['updated_at']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return form.errors


# update review
@review_routes.route('/<int:reviewId>/edit', methods = ['PUT'])
def updateReview(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        old_review = Review.query.get(id)
        old_review.user_id = form.data['user_id']
        old_review.product_id = form.data['product_id']
        old_review.body = form.data['body']
        old_review.rating = form.data['rating']
        old_review.created_at = form.data['created_at']
        old_review.updated_at = form.data['updated_at']
        db.session.commit()
        return old_review.to_dict()
    return form.errors


# delete review
@review_routes.route('/<int:reviewId>/delete', methods = ['DELETE'])
def deleteReview(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Successfully deleted'}, 200
