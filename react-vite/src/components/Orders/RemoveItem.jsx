import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { deleteOrderThunk, loadIdOrderThunk } from "../../redux/cart";

const RemoveItem = ({ orderId, renderDelete }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
        dispatch(loadIdOrderThunk(orderId));
    }, [dispatch, user, navigate, orderId])

    const handleOrderCancel = async (e) => {
        e.preventDefault();
        await dispatch(deleteOrderThunk(orderId));
        closeModal();
        renderDelete();
        navigate("/");
    }

    return (
        <div className="delete-product-modal">
            <div className="delete-form-contain">
                <span className="confirmation">Are you sure you want to remove this item from your cart?</span>
                <button className="success" onClick={handleOrderCancel}>Remove Item</button>
                <button className="success" onClick={closeModal}>Keep Item</button>
            </div>
        </div>
    )
}

export default RemoveItem;
