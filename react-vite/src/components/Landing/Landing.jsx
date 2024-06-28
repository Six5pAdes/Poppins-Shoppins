import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadProductsThunk } from '../../redux/product';
import { useNavigate } from 'react-router-dom';
import './Landing.css'

const Landing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(loadProductsThunk())
    }, [dispatch])

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`)
    }

    return (
        <div className='all-products-contain'>
            {Object.values(products).map((product) => (
                <div
                    key={`${product.id}`}
                    className='one-product-contain'
                    title={product.name}
                    onClick={() => handleProductClick(product.id)}
                >
                    <img
                        className='image'
                        src={product.image}
                        alt={product.name}
                    />
                    <p className='name'
                    >{product.name}</p>
                    <div className='info'>
                        <p className='price'>{`$${parseFloat(product?.price).toFixed(2)}`}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Landing;
