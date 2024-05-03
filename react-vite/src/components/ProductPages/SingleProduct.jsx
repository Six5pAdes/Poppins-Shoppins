import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateReview from '../ReviewPages/ReviewForm';
import ProductReviews from '../ReviewPages/ReviewList';
import './SingleProduct.css'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.products[productId])
    const userId = useSelector(state => state.session.user)

    const reviews = useSelector((state) => state.reviews);
    const [avgRating, setAvgRating] = useState(null);
    const [numReviews, setNumReviews] = useState(0);

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
    }, [dispatch, productId])

    useEffect(() => {
        const productReviews = Object.values(reviews).filter(
            (review) => review.product_id === parseInt(productId)
        );
        if (productReviews.length > 0) {
            const totalRating = productReviews.reduce(
                (acc, review) => acc + review.rating,
                0
            );
            setAvgRating(totalRating / productReviews.length);
            setNumReviews(productReviews.length);
        } else {
            setAvgRating(null);
            setNumReviews(0);
        }
    }, [reviews, productId]);

    if (!product) {
        return null;
    }

    return (
        <div className="product-contain">
            <div className="single-product">
                <div className="image-contain">
                    <img
                        src={product?.image}
                        alt="Product"
                        className="image-full"
                    />
                </div>
                <div className="details">
                    <h1 className="title">{product?.name}</h1>
                    <p className="description">{product?.description}</p>
                    <div className="rating-contain">
                        {numReviews > 0 ? (
                            <span className="rating">
                                ⭐️ {avgRating.toFixed(2)} · {numReviews}{" "}
                                {numReviews === 1 ? "Review" : "Reviews"}
                            </span>
                        ) : (
                            <span className="rating">⭐ New</span>
                        )}
                    </div>
                </div>
                <div className="actions">
                    <p className="price">
                        Price: ${parseFloat(product?.price).toFixed(2)}
                    </p>
                    {/* <p className="product-seller">
                        Uploaded by: {user?.first_name} {user?.last_name}
                    </p> */}
                    <button className="add-to-here" onClick={() => alert("Wishlist unavailable, check again later.")}>Add to Wishlist</button>
                    <button className="add-to-here" onClick={() => alert("Cart unavailable, check again later.")}>Add to Cart</button>
                </div>
            </div>
            <div className="reviews">
                {userId && product.user_id !== userId.id && (
                    <OpenModalButton
                        buttonText="Write a Review"
                        buttonId="writeReviewButton"
                        modalComponent={<CreateReview productId={productId} />}
                    />
                )}
                <ProductReviews productId={productId} />
            </div>
        </div>
    );
}

// const ReviewInfo = ({ numReviews, avgStarRating }) => {
//     let ratingDisplay = avgStarRating > 0 ? avgStarRating.toFixed(1) : 'New';
//     let sOrNot = numReviews !== 1 ? "s" : "";
//     return (
//         <p>
//             <i className='fa-solid fa-ring'></i>&nbsp;
//             {ratingDisplay}
//             {numReviews !== 0 ? ` • ${numReviews} review${sOrNot}` : ''}
//         </p>
//     );
// }

export default ProductDetails
