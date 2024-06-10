import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadOneProductThunk } from '../../redux/product';
import { useParams } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import CreateReview from '../ReviewPages/ReviewForm';
import ProductReviews from '../ReviewPages/ReviewList';
import { addProductToCartThunk, updateItemQuantityThunk } from '../../redux/cartItem';
import { createCartThunk } from '../../redux/cart';
import Cart from '../Carts/Cart';
import './SingleProduct.css'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.products[productId])
    const users = useSelector(state => state.user.users) || []
    const userId = useSelector(state => state.session.user?.id)

    const reviews = useSelector((state) => state.reviews);
    const [avgRating, setAvgRating] = useState(null);
    const [numReviews, setNumReviews] = useState(0);

    const allCarts = useSelector(state => state.cart.Cart);
    const [quantity, setQuantity] = useState('1')

    useEffect(() => {
        dispatch(loadOneProductThunk(productId))
    }, [dispatch, productId])

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
            quantity: quantity
        }
        if (activeCartObj && findInCart) {
            let updateQty = {
                product_id: productId,
                quantity: (parseInt(findInCart?.quantity) + parseInt(quantity))
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

    let seller
    for (let user of users) {
        if (user?.id == product[productId]?.user_id) {
            seller = user
        }
    }

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
                        <button className="add-to-here" onClick={() => alert("Wishlist unavailable, check again later.")}>Add to Wishlist</button>
                        <div className='cart'>
                            <form className='options-container'>
                                <select onChange={(e) => setQuantity(e.target.value)} className="select-qty-dropdown">
                                    <option value='1'>Qty: 1</option>
                                    <option value='2'>Qty: 2</option>
                                    <option value='3'>Qty: 3</option>
                                    <option value='4'>Qty: 4</option>
                                    <option value='5'>Qty: 5</option>
                                    <option value='6'>Qty: 6</option>
                                    <option value='7'>Qty: 7</option>
                                    <option value='8'>Qty: 8</option>
                                    <option value='9'>Qty: 9</option>
                                    <option value='10'>Qty: 10</option>
                                </select>
                            </form>
                            <button className="add-to-here" onClick={() => addToCart(product[productId]?.id)}>
                                <OpenModalButton
                                    className='add-cart-modal'
                                    itemText='Add to Cart'
                                    modalComponent={<Cart />}
                                />
                            </button>
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
        </div>
    );
}

export default ProductDetails
