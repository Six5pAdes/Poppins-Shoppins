import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import { loadUserProductsThunk, deleteProductThunk } from '../../redux/product'
import './ManageProduct.css'

const ManageProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const userId = useSelector(state => state.session.user ? state.session.user.id : null)
    const products = useSelector(state => Object.values(state.products).filter(product => product.user_id === userId))

    useEffect(() => {
        dispatch(loadUserProductsThunk())
    }, [dispatch])

    if (!userId) navigate('/')

    const handleUpdate = productId => {
        navigate(`/products/${productId}/edit`)
    }
    const handleDelete = productId => {
        dispatch(deleteProductThunk(productId))
        closeModal()
    }

    return (
        <div id='this-product'>
            <h1 id='curr-title'>Your Products</h1>
            <button type='button' id='new-product' onClick={() => navigate('/new-product')}>Create a New Product</button>
            <br />
            <ul id='products'>
                {products.map((product) => (
                    <div key={product.id} className='product-card'>
                        <div
                            title={product.name}
                            key={product.id}
                            onClick={() => navigate(`/products/${product.id}`)}
                        >
                            <img src={product.image} className='spot-img' />
                            <p className='name'>{product.name}</p>
                            <p className='spot-price'>${parseFloat(product.price).toFixed(2)}</p>
                        </div>
                        <div className='edit-or-delete'>
                            <button id='update-btn' type='button' onClick={() => handleUpdate(product.id)}>Update</button>
                            <OpenModalMenuItem
                                itemText='Delete'
                                className='delete-button'
                                modalComponent={(
                                    <div id='confirm-delete'>
                                        <h2>Confirm Delete</h2>
                                        <span>Are you sure you want to remove this product?</span>
                                        <button id='delete-complete' type='button' onClick={() => handleDelete(product.id)}>Yes (Delete Product)</button>
                                        <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep Product)</button>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default ManageProduct
