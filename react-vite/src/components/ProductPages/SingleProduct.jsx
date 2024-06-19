import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { useParams, useNavigate } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateReview from '../ReviewPages/ReviewForm';
import ProductReviews from '../ReviewPages/ReviewList';
import { getAllUsersThunk } from '../../redux/session';
import { createOrderThunk, loadUserOrderThunk } from '../../redux/cart';
// import { createCartThunk } from '../../redux/cart';
import { getWishlistsThunk, addToWishlistsThunk, deleteWishlistThunk } from '../../redux/wishlist';
import './SingleProduct.css'

const ProductDetails = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.products[productId])
    const users = useSelector(state => state.session.users)
    const session = useSelector(state => state.session)
    const userId = useSelector(state => state.session.users?.id)
    const allCarts = useSelector(state => state.orders?.CurrOrders);
    const wishlists = useSelector(state => state.wishlists?.MyWishlists || [])

    const reviews = useSelector((state) => state.reviews);
    const [avgRating, setAvgRating] = useState(null);
    const [numReviews, setNumReviews] = useState(0);

    const [isWishlist, setIsWishlist] = useState(false);
    const [removeWishlist, setRemoveWishlist] = useState(false);

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
        if (session.user) {
            dispatch(getAllUsersThunk())
            dispatch(loadUserOrderThunk())
        }
    }, [dispatch, productId, session.user])

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

    const user = users?.find(user => user.id === product?.user_id)[0]

    const handleAddToCart = (prodId) => {
        const orderIds = allCarts.map(ele => ele.product_id)
        //check if already added item to the cart
        if (orderIds.includes(prodId)) {
            alert("This product is already in your cart! You can change the quantity in your cart page.")
        } else {
            const newOrder = {
                product_id: prodId
            }
            dispatch(createOrderThunk(newOrder))
            alert("You've placed the order successfully!")
            nav('/orders/MyOrders')
        }
    }

    useEffect(() => {
        dispatch(getWishlistsThunk())
        setIsWishlist(false)
        setRemoveWishlist(false)
    }, [dispatch, isWishlist, removeWishlist, isWishlist, removeWishlist])

    const wishlistIds = wishlists ? wishlists?.map(ele => ele.product_id) : []

    const handleFav = (productId) => {
        if (wishlistIds.includes(productId)) {
            const favToRemove = wishlists.filter(fav => fav.product_id == productId)[0];
            dispatch(deleteWishlistThunk(favToRemove.id));
            alert(`Successfully removed ${product.name} from wishlist!`);
            setIsWishlist(true);
        } else {
            const newFav = { "product_id": productId };
            dispatch(addToWishlistsThunk(newFav));
            alert(`Successfully added ${product.name} to wishlist!`);
            setRemoveWishlist(true);
        }
    };

    if (!product) {
        return <h1>✨ Loading ✨</h1>;
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
                                🪄 {avgRating.toFixed(1)} · {numReviews}{" "}
                                {numReviews === 1 ? "Review" : "Reviews"}
                            </span>
                        ) : (
                            <span className="rating">🪄 New</span>
                        )}
                    </div>
                    <p className="price">
                        Price: ${parseFloat(product?.price).toFixed(2)}
                    </p>
                    <p className="seller">
                        Seller: {user?.first_name} {user?.last_name}
                    </p>
                    <div className="actions">
                        <button className="add-to-here" onClick={() =>
                            handleFav(product?.id)}
                        >Add to Wishlist
                        </button>
                        <div className='cart'>
                            <button className="add-to-here" onClick={() => handleAddToCart(product?.id)}>
                                Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviews">
                {userId && product.user_id !== userId && (
                    <OpenModalButton
                        buttonText="Write a Review"
                        buttonId="writeReviewButton"
                        modalComponent={<CreateReview productId={productId} />}
                    />
                )}
                <ProductReviews productId={productId} />
            </div>
        </div >
    );
}

export default ProductDetails
