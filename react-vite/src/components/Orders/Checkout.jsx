import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { clearCartThunk, loadUserOrderThunk } from '../../redux/cart';
import { addToHistoryThunk } from '../../redux/history'

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session)
    const products = useSelector(state => state.products)
    const orders = useSelector(state => state.orders?.CurrOrders)
    const productArr = Object.values(products)?.slice(0, orders?.length)

    const total = productArr?.reduce((acc, product) => {
        const orderEqual = orders?.find(order => order.product_id === product.id)
        if (orderEqual) {
            return acc + (product.price * orderEqual.quantity)
        }
        return acc
    }, 0).toFixed(2)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        dispatch(loadUserOrderThunk())
    }, [dispatch, user])

    const handleCheckout = async (e) => {
        e.preventDefault()
        orders.forEach(async (order) => {
            await dispatch(addToHistoryThunk({ product_id: order.product_id, quantity: order.quantity }))
        })
        await dispatch(clearCartThunk())
        closeModal()
        alert('Thank you for your purchase!')
        navigate('/')
    }

    return (
        <div className='delete-product-modal'>
            <div className='delete-form-contain'>
                <h1 className='confirmation'>Is this your final purchase?</h1>
                <h4>${total}</h4>
                <button className='success' onClick={handleCheckout}>Checkout</button>
                <button className='success' onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}

export default Checkout;
