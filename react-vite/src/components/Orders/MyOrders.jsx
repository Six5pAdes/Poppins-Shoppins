import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserOrderThunk } from "../../redux/cart";
import { loadIdProductsThunk } from "../../redux/product";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EmptyCart from "./EmptyCart";
import OrderHistory from "./OrderHistory";
import Checkout from "./Checkout";
// import OrderOperation
// import './Orders.css'

const MyOrders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.orders?.CurrOrders)
    const products = useSelector(state => state.products)
    const productArr = Object.values(products)?.slice(0, orders?.length)
    const prodId = products?.map(ele => ele.product_id)

    const [isDeleted, setIsDeleted] = useState(false)
    const renderOnDelete = () => setIsDeleted(!isDeleted)

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
    }, dispatch, user, isDeleted, total)

    useEffect(() => {
        if (prodId?.length > 0 && orders) {
            dispatch(loadIdProductsThunk(prodId))
        }
    }, [dispatch, orders, isDeleted])

    if (!orders || !products) return <h1>✨ Loading ✨</h1>

    return (
        <div className="cart-contain">
            <div className="cart-item-contain">
                {productArr?.length > 0(productArr?.map(eachProd => (
                    <div className="product-contain" key={eachProd?.id}>
                        <img src={eachProd?.image} alt={eachProd?.name} />
                        <div className="product-info">
                            <h3>{eachProd?.name}</h3>
                            <h4>Price: ${eachProd?.price}</h4>
                            <h4>Quantity: {orders?.find(order => order.product_id === eachProd?.id)?.quantity}</h4>
                        </div>
                        <OpenModalMenuItem
                            modalTitle='Edit Order'
                            modalContent={<Checkout />}
                            modalButton='Edit Order'
                        />
                    </div>
                )))}
            </div>
        </div>
    )
}

export default MyOrders;
