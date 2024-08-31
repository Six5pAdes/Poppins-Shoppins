import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserOrderThunk } from "../../redux/cart";
import { loadIdProductsThunk } from "../../redux/product";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EmptyCart from "./EmptyCart";
import Checkout from "./Checkout";
import OrderInteract from "./OrderInteract";
import './Orders.css'

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const orders = useSelector(state => state.orders?.CurrOrders);
    const products = useSelector(state => state.products);

    const prodArr = Object.values(products)?.slice(0, orders?.length);
    const prodIds = orders?.map(ele => ele.product_id);

    const [isDeleted, setIsDeleted] = useState(false)
    const renderOnDelete = () => setIsDeleted(!isDeleted)

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        dispatch(loadUserOrderThunk());
    }, [dispatch, user, navigate, isDeleted]);

    useEffect(() => {
        console.log('orders:', orders);
        console.log('prodIds:', prodIds);
        if (orders?.length) {
            if (prodIds?.length) {
                dispatch(loadIdProductsThunk(prodIds));
            }
        }
    }, [dispatch, orders, prodIds, isDeleted]);

    if (!orders || !products) return <h1>✨ Loading ✨</h1>;

    if (!Object.values(products).length) {
        return <h2>Your Cart is Empty.</h2>;
    }

    const orderedProducts = orders.map(order => {
        const product = products[order.product_id];
        return {
            ...product,
            quantity: order.quantity
        };
    });

    const total = orderedProducts.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0).toFixed(2);

    return (
        <div className="cart-contain">
            <div className="cart-item-contain">
                {prodArr?.length > 0 ? (
                    prodArr?.map((eachProd) => (
                        <div className="cart-product-contain" key={eachProd?.id}>
                            <div className="product-image">
                                <NavLink to={`/products/${eachProd?.id}`}>
                                    <img src={eachProd?.image} alt={eachProd?.name} className='product-img' />
                                </NavLink>
                            </div>
                            <div className="product-info">
                                <h3>{eachProd?.name}</h3>
                                <h4>Price: ${eachProd?.price}</h4>
                                <h4>Quantity: {eachProd?.quantity}</h4>
                            </div>
                            <OrderInteract
                                order={orders.find(ele => ele.product_id === eachProd.id)}
                                renderDelete={renderOnDelete}
                            />
                        </div>
                    ))
                ) : <h2>Your Cart is Empty.</h2>}
            </div>
            <div className="checkout-contain">
                <h1>My Orders</h1>
                <h3>Total: ${total}</h3>
                <OpenModalMenuItem
                    itemText='Clear Cart'
                    modalComponent={<EmptyCart />}
                />
                <OpenModalMenuItem
                    itemText='Checkout'
                    modalComponent={<Checkout />}
                />
            </div>
        </div>
    );
}

export default MyOrders;
