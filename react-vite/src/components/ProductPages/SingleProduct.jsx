import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateReview from '../ReviewPages/ReviewForm';
import ProductReviews from '../ReviewPages/ReviewList';
import { addProductToCartThunk, updateItemQuantityThunk } from '../../redux/cartItem';
import { createCartThunk } from '../../redux/cart';
import { getWishlistsThunk, addToWishlistsThunk, deleteWishlistThunk } from '../../redux/wishlist';
// import Cart from '../Carts/Cart';
import './SingleProduct.css'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const session = useSelector(state => state.session)
    const product = useSelector(state => state.products[productId])
    // const users = useSelector(state => state.user.users) || []
    const userId = useSelector(state => state.session.user)
    const wishlists = useSelector(state => state.wishlists)

    const reviews = useSelector((state) => state.reviews);
    const [avgRating, setAvgRating] = useState(null);
    const [numReviews, setNumReviews] = useState(0);

    const allCarts = useSelector(state => state.cart.Cart);

    const [isWishlist, setIsWishlist] = useState(false);
    const [removeWishlist, setRemoveWishlist] = useState(false);

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
    }, [dispatch, productId])

    const allUsers = session.users
    const seller = allUsers?.find(ele => ele.id == product.user_id)

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

    let activeCartObj
    if (allCarts?.length) {
        for (let cart of allCarts) {
            if (cart?.is_ordered == false) {
                activeCartObj = cart
            }
        }
    }

    let findInCart = activeCartObj?.cart_items?.find(item => item?.product_id == productId)

    const addToCart = async (productId) => {
        let addItem = {
            cart_id: activeCartObj?.id,
            product_id: productId,
        }
        if (activeCartObj && findInCart) {
            let updateQty = {
                product_id: productId,
            }
            return await dispatch(updateItemQuantityThunk(updateQty, findInCart?.id))
        }
        if (activeCartObj) {
            await dispatch(addProductToCartThunk(addItem, activeCartObj?.id))
        }
        else {
            const createCart = await dispatch(createCartThunk())
            const newCartId = createCart?.id;
            await dispatch(addProductToCartThunk(addItem, newCartId))
        }
    }

    useEffect(() => {
        dispatch(getWishlistsThunk())
        setIsWishlist(false)
        setRemoveWishlist(false)
    }, [dispatch, isWishlist, removeWishlist])

    const wishlistIds = wishlists?.map(ele => ele.instrument_id)

    const handleFav = (productId) => {
        if (wishlistIds.includes(productId)) {
            const favToRemove = wishlists.filter(fav => fav.product_id == productId)[0]
            dispatch(deleteWishlistThunk(favToRemove.id))
            alert(`Successfully removed ${product.name} from wishlists!`)
            setIsWishlist(true)
        } else {
            const newFav = { "product_id": productId }
            dispatch(addToWishlistsThunk(newFav))
            alert(`Successfully added ${product.name} to wishlists!`)
            setRemoveWishlist(true)
        }
    }

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
                    <p className="product-seller">
                        Uploaded by: {seller && seller?.first_name} {seller && seller?.last_name}
                    </p>
                    <div className="actions">
                        <button className="add-to-here" onClick={() =>
                            handleFav(product?.id)}
                        // alert("Wishlist unavailable, check again later.")}
                        >Add to Wishlist
                        </button>
                        <div className='cart'>
                            <button className="add-to-here" onClick={() => addToCart(product[productId]?.id)}>
                                {/* <OpenModalButton
                                    className='add-cart-modal'
                                    itemText='Add to Cart'
                                modalComponent={<Cart />}
                                /> */}
                                Add to Cart</button>
                        </div>
                    </div>
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
        </div >
    );
}

export default ProductDetails
