import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newReviewThunk } from "../../redux/review";
import { loadOneProductThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";

const CreateReview = ({ productId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [errors, setErrors] = useState("");
    const { closeModal } = useModal();


    useEffect(() => {
        const existingReview = Object.values(reviews).find(
            review => review.product_id === parseInt(productId) && review.user_id === currentUser.id
        );

        if (existingReview) {
            setErrors("You have already reviewed this product.");
        }
    }, [reviews, productId, currentUser.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErr = {}

        if (reviewText.length < 10) {
            newErr.reviewText = ("Review text must be at least 10 characters.");
        }
        if (reviewText.length > 255) {
            newErr.reviewText = ("Review text must be 255 characters or less.");
        }

        const newReview = {
            body: reviewText,
            rating: rating,
            product_id: productId,
            user_id: currentUser.id
        };

        const result = await dispatch(newReviewThunk(newReview));
        if (result.errors) {
            setErrors("An error occurred. Please try again later.");
        } else {
            closeModal();
            dispatch(loadOneProductThunk(productId));
        }
    };

    const handleStarClick = (newRating) => {
        setRating(newRating);
        setHoverRating(newRating);
    };

    if (errors === "You have already reviewed this product.") {
        return (
            <div id="create-review-modal">
                <p className="err-msg">{errors}</p>
            </div>
        );
    }

    return (
        <div id="create-review-contain">
            <h1>Add a New Review</h1>
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

export default CreateReview;
