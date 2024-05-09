import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../redux/review";
import { loadOneProductThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css"

const UpdateReview = ({ reviewId, initialReview = '', initialRating, productId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const [reviewText, setReviewText] = useState(initialReview);
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(initialRating);
    const [errors, setErrors] = useState("");
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reviewText.length < 10) {
            setErrors("Review text must be at least 10 characters.");
            return;
        }
        if (reviewText.length > 255) {
            setErrors("Review text must be 255 characters or less.");
            return;
        }

        const updatedReview = {
            body: reviewText,
            rating: hoverRating,
            product_id: productId,
            user_id: currentUser.id
        };

        const result = await dispatch(
            editReviewThunk(updatedReview, reviewId)
        );
        if (result.errors) {
            setErrors("Failed to update the review");
        } else {
            closeModal();
            dispatch(loadOneProductThunk(productId));
        }
    };

    const handleStarClick = (newRating) => {
        setRating(newRating);
        setHoverRating(newRating);
    };

    return (
        <div id="create-review-contain">
            <h1>Edit Review</h1>
            {errors && <p className="err-msg">{errors}</p>}
            <form onSubmit={handleSubmit} id="review-form">
                <label id="text-label">
                    <textarea
                        id="text-input"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here... (Minimum 10 characters)"
                    />
                </label>
                {errors.reviewText && <p className="err-msg">{errors.reviewText}</p>}
                <div id="rating-contain">
                    <span id="overall-rating">Overall Rating:</span>
                    <div id="stars" onMouseLeave={() => setHoverRating(rating)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                className={hoverRating >= star ? "filled" : "empty"}
                            >
                                🪄
                            </div>
                        ))}
                    </div>
                </div>
                {errors.hoverRating && <p className="err-msg">{errors.hoverRating}</p>}

                <button
                    type="submit"
                    disabled={reviewText.length < 10 || rating < 1 || errors}
                    className={
                        reviewText.length < 10 || rating < 1 || errors
                            ? "disabled"
                            : "success"
                    }
                >
                    Submit Review
                </button>
                <button onClick={closeModal} type="button" className="success">Cancel Review</button>
            </form>
        </div>
    );
};


export default UpdateReview
