import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateReview from '../ReviewPages/ReviewForm';
import ProductReviews from '../ReviewPages/ReviewList';
import { getAllUsersThunk } from '../../redux/session';
import { createOrderThunk, loadUserOrderThunk } from '../../redux/cart';
import { getWishlistsThunk, addToWishlistsThunk, deleteWishlistThunk } from '../../redux/wishlist';
import './SingleProduct.css'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const session = useSelector(state => state.session)
    const sellers = useSelector(state => state.session.users)
    const product = useSelector(state => state.products[productId])
    const userId = session?.user?.id
    const allCarts = useSelector(state => state.orders?.CurrOrders);

    const reviews = useSelector((state) => state.reviews);
    const [avgRating, setAvgRating] = useState(null);
    const [numReviews, setNumReviews] = useState(0);

    const wishlists = useSelector(state => state.wishlists?.MyWishlists)
    const [isWishlist, setIsWishlist] = useState(false);
    // const [removeWishlist, setRemoveWishlist] = useState(false);

    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
            .then(() => setIsLoaded(false))
        // if (session.user) {
        dispatch(getAllUsersThunk())
        dispatch(loadUserOrderThunk())
        dispatch(getWishlistsThunk())
        setIsWishlist(false)
        // setRemoveWishlist(false)
        // }
    }, [dispatch, productId, sellers])

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

    useEffect(() => {
        if (wishlists && product) {
            setIsWishlist(wishlists.some(item => item.product_id === product.id))
        }
    }, [wishlists, product])

    // const allSellers = session.users
    // const seller = sellers?.find(user => user.id === product?.user_id)

    const handleAddToCart = (prodId) => {
        const orderIds = allCarts.map(ele => ele.product_id)
        //check if item was already added to cart
        if (orderIds.includes(prodId)) {
            alert("You've already added this product to your cart. Quantity can be changed on the orders page.")
        } else {
            const newOrder = {
                product_id: prodId
            }
            dispatch(createOrderThunk(newOrder))
            alert("You've placed the order successfully!")
        }
    }

    // const wishlistIds = wishlists ? wishlists?.map(ele => ele.product_id) : []

    const handleFav = (productId) => {
        if (isWishlist) {
            const favToRemove = wishlists.find(fav => fav.product_id === productId);
            dispatch(deleteWishlistThunk(favToRemove.id));
            alert(`Successfully removed ${product.name} from wishlist!`);
            setIsWishlist(false);
        } else {
            const newFav = { "product_id": productId };
            dispatch(addToWishlistsThunk(newFav));
            alert(`Successfully added ${product.name} to wishlist!`);
            setIsWishlist(true);
        }
    };

    if (isLoaded) {
        return <h1>✨ Loading ✨</h1>;
    }

    if (!product) {
        return <h1>Product not found</h1>;
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
                        {/* Seller: {seller ? `${seller?.first_name} ${seller?.last_name}` : "Unknown Seller"} */}
                        Seller:
                    </p>
                    <div className="actions">
                        {session.user && product.user_id !== session.user.id && (
                            <>
                                <button className="add-to-here" onClick={() =>
                                    handleFav(product?.id)}
                                >{isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                                </button>
                                <div className='cart'>
                                    <button className="add-to-here" onClick={() =>
                                        handleAddToCart(product?.id)}
                                    >Add to Cart
                                    </button>
                                </div>
                            </>
                        )}
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
