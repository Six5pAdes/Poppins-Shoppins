import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { clearCartThunk } from '../../redux/cart';

const EmptyCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [dispatch, user, navigate])

    const handleOrderCancel = async (e) => {
        e.preventDefault()
        await dispatch(clearCartThunk())
        closeModal()
        alert('Your cart has been cleared!')
        navigate('/')
    }

    return (
        <div className='delete-product-modal'>
            <div className='delete-form-contain'>
                <span className='confirmation'>Are you sure you want to empty your cart?</span>
                <button className='success' onClick={handleOrderCancel}>Empty Cart</button>
                <button className='success' onClick={closeModal}>Keep Cart</button>
            </div>
        </div>
    )
}

export default EmptyCart;
