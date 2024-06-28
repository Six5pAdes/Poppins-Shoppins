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

// const MyOrders = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const user = useSelector(state => state.session.user)
//     const orders = useSelector(state => state.orders?.CurrOrders)
//     const products = useSelector(state => state.products)
//     const productArr = Object.values(products)?.slice(0, orders?.length)
//     // const prodId = orders?.map(ele => ele.product_id)

//     const [isDeleted, setIsDeleted] = useState(false)
//     const renderOnDelete = () => setIsDeleted(!isDeleted)

//     useEffect(() => {
//         if (!user) {
//             navigate('/')
//         }
//         dispatch(loadUserOrderThunk())
//     }, [dispatch, user, navigate])

//     useEffect(() => {
//         if (orders) {
//             const prodId = orders.map(ele => ele.product_id);
//             if (prodId.length > 0) {
//                 dispatch(loadIdProductsThunk(prodId));
//             }
//         }
//     }, [dispatch, orders]);

//     if (!orders || !products) return <h1>✨ Loading ✨</h1>

//     // const prodId = orders?.map(ele => ele.product_id) || [];
//     // const productArr = Object.values(products)?.filter(product => prodId.includes(product.id)) || [];
//     // const productArr = Object.values(products)?.filter(product => orders.some(order => order.product_id === product.id));

//     const total = productArr?.reduce((acc, product) => {
//         const orderEqual = orders?.find(order => order.product_id === product.id)
//         if (orderEqual) {
//             return acc + (product.price * orderEqual.quantity)
//         }
//         return acc
//     }, 0).toFixed(2)

//     // useEffect(() => {
//     //     if (prodId?.length > 0) {
//     //         dispatch(loadIdProductsThunk(prodId))
//     //     }
//     // }, [dispatch, prodId])

//     return (
//         <div className="cart-contain">
//             <div className="cart-item-contain">
//                 {productArr?.length > 0 ? (productArr?.map(eachProd => (
//                     <div className="cart-product-contain" key={eachProd?.id}>
//                         <div className="product-image">
//                             <NavLink to={`/products/${eachProd?.id}`}>
//                                 <img src={eachProd?.image} alt={eachProd?.name} className='product-img' />
//                             </NavLink>
//                         </div>
//                         <div className="product-info">
//                             <h3>{eachProd?.name}</h3>
//                             <h4>Price: ${eachProd?.price}</h4>
//                             {/* <h4>Quantity: {orders?.find(order => order.product_id === eachProd?.id)?.quantity}</h4> */}
//                         </div>
//                         <OrderInteract
//                             order={orders.find(ele => ele.product_id === eachProd?.id)}
//                             renderDelete={renderOnDelete}
//                         />
//                     </div>
//                 ))) : <h2>Your Cart is Empty.</h2>}
//             </div>
//             <div className="checkout-contain">
//                 <h1>My Orders</h1>
//                 <h3>Total: ${total}</h3>
//                 <button className="checkout-btn">
//                     <OpenModalMenuItem
//                         itemText='Clear Cart'
//                         modalComponent={<EmptyCart />}
//                     />
//                 </button>
//                 <button className="checkout-btn">
//                     <OpenModalMenuItem
//                         itemText='Checkout'
//                         modalComponent={<Checkout />}
//                     />
//                 </button>
//             </div>
//         </div>
//     );
// }

const MyOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const orders = useSelector(state => state.orders?.CurrOrders);
    const products = useSelector(state => state.products);

    const [isDeleted, setIsDeleted] = useState(false)
    const renderOnDelete = () => setIsDeleted(!isDeleted)

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        dispatch(loadUserOrderThunk());
    }, [dispatch, user, navigate, isDeleted]);

    useEffect(() => {
        if (orders) {
            const prodId = orders.map(ele => ele.product_id);
            if (prodId.length > 0) {
                dispatch(loadIdProductsThunk(prodId));
            }
        }
    }, [dispatch, orders]);

    if (!orders || !products) return <h1>✨ Loading ✨</h1>;

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
                {orderedProducts.length > 0 ? (
                    orderedProducts.map(eachProd => (
                        <div className="cart-product-contain" key={eachProd.id}>
                            <div className="product-image">
                                <NavLink to={`/products/${eachProd.id}`}>
                                    <img src={eachProd.image} alt={eachProd.name} className='product-img' />
                                </NavLink>
                            </div>
                            <div className="product-info">
                                <h3>{eachProd.name}</h3>
                                <h4>Price: ${eachProd.price}</h4>
                                <h4>Quantity: {eachProd.quantity}</h4>
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
