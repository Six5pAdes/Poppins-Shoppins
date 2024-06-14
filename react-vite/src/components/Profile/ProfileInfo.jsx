import { deleteUserThunk } from '../../redux/profile'
import * as sessionActions from '../../redux/session'
import { useNavigate, useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import ProfileUpdate from './EditProfile'
import { loadUserProductsThunk, deleteProductThunk } from '../../redux/product'
import Wishlist from '../Wishlists/Wishlist'
// import { getWishlistsThunk } from '../../redux/wishlist'
import './ProfileInfo.css'

const UserPage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const toInt = parseInt(userId)
    const navigate = useNavigate()
    const { closeModal } = useModal()

    let user = useSelector(state => state.session.user ? state.session.user : null)
    const products = useSelector(state => state.products)
    // const userId = useSelector(state => state.session.user ? state.session.user.id : null)
    const userProducts = Object.values(products).filter(product => product.user_id === parseInt(userId))
    // const wishlist = useSelector(state => state.wishlists?.WishProd)

    useEffect(() => {
        dispatch(loadUserProductsThunk())
        // dispatch(getWishlistsThunk())
    }, [dispatch])

    if (!userId) navigate('/')

    const handleUpdate = productId => {
        navigate(`/products/${productId}/edit`)
    }
    const handleDelete = productId => {
        dispatch(deleteProductThunk(productId))
        closeModal()
    }

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.thunkLogout());
        navigate('/')
    }

    const handleDeleteProfile = toInt => {
        const deletedUser = dispatch(deleteUserThunk(toInt));
        if (deletedUser) {
            dispatch(sessionActions.thunkLogout());
            navigate('/')
            closeModal()
        }
    }

    return (
        <>
            <section className='profile-contain'>
                <h1 id='curr-title'>About Me</h1>
                <div id='prof-info'>
                    <div id='prof-stuff'>
                        <div className='prof-piece'>First Name:
                            <p className='info'>{user.first_name}</p>
                        </div>
                        <div className='prof-piece'>Last Name:
                            <p className='info'>{user.last_name}</p>
                        </div>
                        <div className='prof-piece'>Email:
                            <p className='info'>{user.email}</p>
                        </div>
                        <div className='prof-piece'>Username:
                            <p className='info'>{user.username}</p>
                        </div>
                    </div>
                </div>
                <OpenModalMenuItem
                    itemText='Edit Profile'
                    className='edit-button'
                    modalComponent={(
                        <ProfileUpdate toInt={toInt} />
                    )} />
            </section>
            <section id='this-product'>
                <h1 id='curr-title'>My Products</h1>
                <button type='button' id='new-product' onClick={() => navigate('/new-product')}>Create a New Product</button>
                <br />
                <ul id='products'>
                    {userProducts.map((product) => (
                        <div key={product.id} className='product-card'>
                            <div
                                title={product.name}
                                key={product.id}
                            >
                                <img src={product.image} className='product-img'
                                    onClick={() => navigate(`/products/${product.id}`)}
                                />
                                <p className='name'>{product.name}</p>
                                <p className='product-price'>${parseFloat(product.price).toFixed(2)}</p>
                            </div>
                            <div className='edit-or-delete'>
                                <button id='update-btn' type='button' onClick={() => handleUpdate(product.id)}>Edit Product</button>
                                <OpenModalMenuItem
                                    itemText='Delete Product'
                                    className='delete-button'
                                    modalComponent={(
                                        <div id='confirm-delete'>
                                            <h2>Confirm Delete</h2>
                                            <span>Are you sure you want to remove this product?</span>
                                            <button className='success' type='button' onClick={() => handleDelete(product.id)}>Delete Product</button>
                                            <button className='success' type='button' onClick={closeModal}>Keep Product</button>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            </section>
            <section id='wish-contain'>
                {/* <h1 id='wish-title'>My Wishlist</h1>
                <div className='wishlist-contain'>
                    {wishlist?.map((wishlist) => (
                        <div key={wishlist.id} className='wishlist-item'>
                            <p>{wishlist.product.name}</p>
                            <button onClick={() => navigate(`/products/${wishlist.product.id}`)}>View Product</button>
                        </div>
                    ))}
                </div> */}
                <Wishlist />
            </section>
            <section className='button-contain'>
                <div className='button-group'>
                    <div id='logout-but'>
                        <button onClick={logout}>Log Out</button>
                    </div>
                    <div id='delete-user-but'>
                        <OpenModalMenuItem
                            itemText='Delete User'
                            className='delete-button'
                            modalComponent={(
                                <div id='confirm-delete'>
                                    <h2>Confirm Delete</h2>
                                    <span>Are you sure you want to remove this user?</span>
                                    <button className='success' type='button' onClick={() => handleDeleteProfile(user.id)}>Delete User</button>
                                    <button className='success' type='button' onClick={closeModal}>Keep User</button>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserPage
