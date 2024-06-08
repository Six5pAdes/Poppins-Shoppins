import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal"
import { loadProductsThunk } from "../../redux/product";
import { loadCartsThunk } from "../../redux/cart";
import { updateItemQuantityThunk, deleteCartItemThunk } from "../../redux/cartItem";
// import "./Carts.css";

const Cart = () => {
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const allCarts = useSelector(state => state.cart.Cart);
    const products = useSelector(state => state.products);

    const [quantity, setQuantity] = useState();
    const [updateQuantity, setUpdateQuantity] = useState(false);
    const [removeItem, setRemoveItem] = useState(false);
    const [checkout, setCheckout] = useState(false);
    const { closeModal } = useModal();

    let activeCartObj
    let productArr = Object.values(products)

    useEffect(() => {
        dispatch(loadCartsThunk())
        dispatch(loadProductsThunk())
    }, [dispatch, updateQuantity, removeItem, quantity, activeCartObj?.length, allCarts?.length, productArr?.length])

    if (!currUser || !productArr?.length || !productArr[0]?.id) {
        return <div>✨ Loading ✨</div>
    }

    if (allCarts?.length > 0) {
        for (let cart of allCarts) {
            if (cart?.is_ordered === false) {
                activeCartObj = cart
            }
        }
        // activeCartObj = allCarts.find(cart => cart.user_id === currUser.id)
    }

    if (!allCarts?.length) {
        return (
            <div className='no-cart-modal'>
                <h1 className='no-cart-name'>Shopping Cart</h1>
                <hr></hr>
                <div className='no-cart-msg'>Your cart is empty</div>
            </div>
        )
    }

    const cartItemsArr = activeCartObj?.cart_items
    const handleUpdate = async (e, cartItemId, productId) => {
        e.preventDefault()
        const updateItem = {
            product_id: productId,
            quantity: parseInt(quantity)
        }
        await dispatch(updateItemQuantityThunk(cartItemId, updateItem))
        setUpdateQuantity(!updateQuantity)
    }
    const handleDelete = async (cartItemId) => {
        await dispatch(deleteCartItemThunk(cartItemId))
        setRemoveItem(!removeItem)
    }

    let total = 0
    let totalItems = 0

    const handleCheckout = async () => {
        for (let item of cartItemsArr) {
            await dispatch(deleteCartItemThunk(item?.id))
            setCheckout(true)
        }
        setRemoveItem(!removeItem)
        setTimeout(() => {
            closeModal()
        }, 2000)
    }

    return (
        <div className='carts-modal'>
            <h1 className='cart-component-name'>Shopping Cart</h1>
            {checkout && <p>Thank you for popping in and shopping at Poppins&apos;s Shoppings</p>}
            {/* {modalMsg && checkout && <p>Closing in 2 seconds...</p>} */}
            <hr className="line"></hr>
            {!cartItemsArr?.length && (<p>Your cart is empty</p>)}
            {cartItemsArr?.map(item => (
                <div className='cart-items-container' key={item?.id}>
                    {!products[(item?.product_id)]?.image_url ? (<div className="loading-txt">✨ Loading ✨</div>) : (
                        <>
                            <NavLink to={`/products/${item?.product_id}`} className='cart-img-nav'>
                                <img src={products[(item?.product_id)]?.image_url} alt={item?.name} className="cart-prod-img" />
                            </NavLink>
                            <div className='cart-product-info'>
                                <NavLink className='item-name-price-container' to={`/products/${item?.product_id}`}>
                                    <div className='cart-prod-name'>{products[(item?.product_id)]?.name}</div>
                                    <div className='cart-prod-price'>${(products[(item?.product_id)]?.price * item?.quantity).toFixed(2)}</div>
                                    <div hidden='hidden'>{total += (products[(item?.product_id)]?.price * item?.quantity)}</div>
                                    <div hidden='hidden'>{totalItems += item?.quantity}</div>
                                </NavLink>
                                <div className='qty-container'>
                                    Quantity: {item?.quantity}
                                    <form
                                        onSubmit={(e) => handleUpdate(e, item?.id, item?.product_id)}
                                        className='update-quantity-form'
                                    >
                                        <select onChange={(e) => setQuantity(e.target.value)} className='select-qty-dropdown'>
                                            <option value='' disabled selected hidden>Qty:{item?.quantity}</option>
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
                                        <button type='submit' className='cart-btns updat-btn'>Update</button>
                                    </form>
                                    <button onClick={() => handleDelete(item?.id)} className='cart-btns delete-cart-btn'>Delete</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
            <hr></hr>
            {totalItems == 1 && <h3 className='sub-total-txt'>
                Subtotal (<span>{totalItems} item</span>) : {total.toFixed(2)}
            </h3>}
            {totalItems > 1 && <h3 className='sub-total-txt'>
                Subtotal (<span>{totalItems} items</span>) : ${total.toFixed(2)}
            </h3>}
            {cartItemsArr?.length > 0 && <button onClick={handleCheckout} className='checkout-btn'>Proceed to checkout</button>}
        </div>
    )
}

export default Cart;
