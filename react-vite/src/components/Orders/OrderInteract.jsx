import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderThunk } from "../../redux/cart";
import RemoveItem from "./RemoveItem";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useNavigate } from "react-router-dom";

const OrderInteract = ({ order, renderDelete }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session);

    const [quantity, setQuantity] = useState(order?.quantity);

    const handleAdd = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        const newOrder = { quantity: newQuantity };
        dispatch(updateOrderThunk(order.id, newOrder))
            .then(() => {
                window.location.reload(true);
            });
    }

    const handleDel = () => {
        if (quantity === 1) {
            return (
                <RemoveItem orderId={order.id} />
            )
        } else {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            const newOrder = { quantity: newQuantity };
            dispatch(updateOrderThunk(order.id, newOrder))
                .then(() => {
                    window.location.reload(true);
                });
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [dispatch, navigate, user])

    return (
        <div className="cart-buttons-contain">
            <div className="quantity-contain">
                {quantity === 1 ? (
                    <button className="quantity-btn" onClick={handleDel}>
                        <OpenModalMenuItem
                            itemText='-'
                            modalComponent={<RemoveItem orderId={order?.id} renderDelete={renderDelete} />}
                        />
                    </button>
                ) : (
                    <button className="quantity-btn" onClick={handleDel}>-</button>
                )}
                <p className="button-text">Quantity: {quantity}</p>
                <button className="quantity-btn" onClick={handleAdd}>+</button>
            </div>
            <div className="delete-contain">
                <button className="delete-btn">
                    <OpenModalMenuItem
                        itemText='Remove from cart'
                        modalComponent={<RemoveItem orderId={order?.id} renderDelete={renderDelete} />}
                    />
                </button>
            </div>
        </div>
    )
}

export default OrderInteract;
