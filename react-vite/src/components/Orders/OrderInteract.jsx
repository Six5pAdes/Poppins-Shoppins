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
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        const newOrder = { quantity: newQuantity };
        dispatch(updateOrderThunk(order.id, newOrder))
            .then(() => {
                window.location.reload(true);
            });
    }

    const disabledButton = () => {
        return (quantity === 1)
    }

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [dispatch, navigate, user])

    return (
        <div className="cart-buttons-contain">
            <div className="quantity-contain">
                {disabledButton() ?
                    <button className="disabled">-</button> :
                    <button className="success" onClick={handleDel}>-</button>
                }
                <p className="button-text">Quantity: {quantity}</p>
                <button className="success" onClick={handleAdd}>+</button>
            </div>
            <div className="delete-contain">
                <OpenModalMenuItem
                    itemText='Remove from cart'
                    className='success'
                    modalComponent={<RemoveItem orderId={order?.id} renderDelete={renderDelete} />}
                />
            </div>
        </div>
    )
}

export default OrderInteract;
