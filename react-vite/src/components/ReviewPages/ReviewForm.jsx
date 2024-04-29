import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newReviewThunk } from "../../redux/review";
import { loadOneProductThunk } from "../../redux/product";
import "./ReviewForm.css";
import { useModal } from "../../context/Modal";

const CreateReview = ({ productId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewError, setReviewError] = useState("");
    const { closeModal } = useModal();


    useEffect(() => {
        const existingReview = Object.values(reviews).find(
            review => review.product_id === parseInt(productId) && review.user_id === currentUser.id
        );

        if (existingReview) {
            setReviewError("You have already reviewed this product.");
        }
    }, [reviews, productId, currentUser.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (reviewError) {
            return;
        }

        if (reviewText.length > 255) {
            setReviewError("Review text must be 255 characters or less.");
            return;
        }

        const newReview = {
            review: reviewText,
            rating: rating,
            product_id: productId,
            user_id: currentUser.id
        };

        const result = await dispatch(newReviewThunk(newReview));
        if (result.errors) {
            setReviewError("An error occurred. Please try again later.");
        } else {
            closeModal();
            dispatch(loadOneProductThunk(productId));
        }
    };

    const handleStarClick = (newRating) => {
        setRating(newRating);
        setHoverRating(newRating);
    };

    if (reviewError === "You have already reviewed this product.") {
        return (
            <div id="create-review-modal">
                <p className="error-message-review">{reviewError}</p>
            </div>
        );
    }

    return (
        <div id="create-review-modal">
            <h1>Add a written review</h1>
            {reviewError && <p className="error-message-review">{reviewError}</p>}
            <form onSubmit={handleSubmit} id="create-review-form">
                <label id="review-text-label">
                    <textarea
                        id="review-text-input"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here... (Minimum 10 characters)"
                    />
                </label>
                <div id="rating-container">
                    <span id="overall-rating">Overall Rating:</span>
                    <div id="rating-stars" onMouseLeave={() => setHoverRating(rating)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                className={hoverRating >= star ? "star-filled" : "star-empty"}
                            >
                                ⭐️
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={reviewText.length < 10 || rating < 1 || reviewError}
                    id={
                        reviewText.length < 10 || rating < 1 || reviewError
                            ? "review-submit-disabled"
                            : "review-submit-active"
                    }
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default CreateReview;
