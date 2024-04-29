import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { useParams } from 'react-router-dom';
// import ReviewList from '../Reviews/ReviewList';
import './SingleProduct.css'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.product[productId])

    const userId = useSelector(state => state.session.user ? state.session.user.id : null)
    const user = useSelector(state => Object.values(state.product).filter(product => product.user_id === userId))

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
    }, [dispatch, productId])

    return (
        <div className="product-contain">
            <div className="product-tophalf">
                <div className="product-detail-image-container">
                    <img
                        src={product?.image}
                        alt="Product"
                        className="product-detail-image"
                    />
                </div>
                <div className="product-detail-details">
                    <h1 className="product-detail-title">{product?.name}</h1>
                    <p className="product-detail-description">{product?.description}</p>
                    {/* <div className="product-detail-rating-container">
                        {numReviews > 0 ? (
                            <span className="product-detail-rating">
                                ⭐️ {avgRating.toFixed(2)} · {numReviews}{" "}
                                {numReviews === 1 ? "Review" : "Reviews"}
                            </span>
                        ) : (
                            <span className="product-detail-rating">⭐ New</span>
                        )}
                    </div> */}
                </div>
                <div className="product-detail-actions">
                    <p className="product-detail-price">
                        Price: ${parseFloat(product?.price).toFixed(2)}
                    </p>
                    <p className="product-detail-seller">
                        Uploaded by: {user?.first_name} {user?.last_name}
                    </p>
                    <button className="add-to-here" onClick={() => alert("Wishlist unavailable, check again later.")}>Add to Wishlist</button>
                    <button className="add-to-here" onClick={() => alert("Cart unavailable, check again later.")}>Add to Cart</button>
                </div>
            </div>
            {/* <div className="product-detail-reviews">
                {sessionUser && product.user_id !== sessionUser.id && (
                    <OpenModalButton
                        buttonText="Write a Review"
                        buttonId="writeReviewButton"
                        modalComponent={<CreateReview productId={productId} />}
                    />
                )}
                <ProductReviews productId={productId} />
            </div> */}
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
