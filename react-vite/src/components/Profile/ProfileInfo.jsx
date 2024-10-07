import * as sessionActions from '../../redux/session'
import { useNavigate, useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import ProfileUpdate from './EditProfile'
import UpdateReview from '../ReviewPages/EditReview'
import { deleteUserThunk } from '../../redux/profile'
import { loadUserProductsThunk, deleteProductThunk } from '../../redux/product'
import { loadUserReviewsThunk, deleteReviewThunk } from '../../redux/review'
import Wishlist from '../Wishlists/Wishlist'
// import { getWishlistsThunk } from '../../redux/wishlist'
import './ProfileInfo.css'

const formatDate = (date = new Date()) => {
    let month = date.getMonth()
    let year = date.getFullYear()

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return `${months[month]} ${year}`
}

const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<span key={i}>🪄</span>);
    }
    return stars;
};

const UserPage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const toInt = parseInt(userId)
    const navigate = useNavigate()
    const { closeModal } = useModal()

    let userStore = useSelector(state => state.session.user ? state.session.user : null)
    const products = useSelector(state => state.products)
    const userProducts = Object.values(products).filter(product => product.user_id === toInt)
    const reviews = useSelector(state => state.reviews)
    const userReviews = Object.values(reviews).filter(review => review.user_id === toInt)

    useEffect(() => {
        dispatch(loadUserProductsThunk())
        dispatch(loadUserReviewsThunk())
        // dispatch(getWishlistsThunk())
    }, [dispatch])

    if (!userId) navigate('/')

    const handleProductUpdate = productId => {
        navigate(`/products/${productId}/edit`)
    }
    const handleProductDelete = productId => {
        dispatch(deleteProductThunk(productId))
        closeModal()
    }

    // const handleReviewUpdate = reviewId => {
    //     dispatch(editReviewThunk(reviewId))
    //     closeModal()
    // }
    const handleReviewDelete = reviewId => {
        dispatch(deleteReviewThunk(reviewId))
        closeModal()
    }

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.thunkLogout());
        navigate('/')
        closeModal()
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
            <section id='this-profile'>
                <h1 id='curr-title'>About Me</h1>
                <div id='prof-info'>
                    <div id='prof-stuff'>
                        <div className='prof-piece'>First Name:
                            <p className='info'>{userStore?.first_name}</p>
                        </div>
                        <div className='prof-piece'>Last Name:
                            <p className='info'>{userStore?.last_name}</p>
                        </div>
                        <div className='prof-piece'>Email:
                            <p className='info'>{userStore?.email}</p>
                        </div>
                        <div className='prof-piece'>Username:
                            <p className='info'>{userStore?.username}</p>
                        </div>
                    </div>
                </div>
                <OpenModalMenuItem
                    itemText='Edit Profile'
                    className='edit-profile'
                    modalComponent={(
                        <ProfileUpdate toInt={toInt} />
                    )} />
            </section>
            <section id='this-product'>
                <h1 id='curr-title'>My Products</h1>
                <button type='button' id='new-product' onClick={() => navigate('/new-product')}>Create a New Product</button>
                <br />
                <ul id='products' className={userProducts.length === 0 ? 'empty' : ''}>
                    {userProducts.length > 0 ? (
                        userProducts.map((product) => (
                            <div key={product.id} className='product-card'>
                                <div
                                    title={product.name}
                                    key={product.id}
                                >
                                    <img src={product.image} className='product-img'
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    />
                                    <p className='name' onClick={() => navigate(`/products/${product.id}`)}>{product.name}</p>
                                    <p className='product-price'>${parseFloat(product.price).toFixed(2)}</p>
                                </div>
                                <div className='edit-or-delete'>
                                    <button id='update-btn' type='button' onClick={() => handleProductUpdate(product.id)}>Edit Product</button>
                                    <OpenModalMenuItem
                                        itemText='Delete Product'
                                        className='delete-button'
                                        modalComponent={(
                                            <div id='confirm-delete'>
                                                <h2>Confirm Delete</h2>
                                                <span>Are you sure you want to remove this product?</span>
                                                <button className='success' type='button' onClick={() => handleProductDelete(product.id)}>Delete Product</button>
                                                <button className='success' type='button' onClick={closeModal}>Keep Product</button>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='empty-products'>
                            <h3>🌟 Your products are empty 🌟</h3>
                        </div>
                    )}
                </ul>
            </section>
            <section id='this-review'>
                <h1 id='curr-title'>My Reviews</h1>
                <ul id='reviews' className={userReviews?.length === 0 ? 'empty' : ''}>
                    {userReviews.length > 0 ? (
                        userReviews.map((review) => (
                            <div key={review?.id} className='review-card'>
                                <h3
                                    className="product-name"
                                    onClick={() => navigate(`/products/${review?.product_id}`)}
                                >{products[review?.product_id]?.name}</h3>
                                <div className="product-date">{formatDate(new Date(review?.created_at))}</div>
                                <p className="review-comments">{review?.body}</p>
                                <p className="review-rating">Rating: {renderStars(review?.rating)}</p>
                                {userStore?.id === review?.user_id && (
                                    <div className='edit-or-delete'>
                                        <OpenModalMenuItem
                                            itemText='Update Review'
                                            className='edit-button'
                                            modalComponent={<UpdateReview
                                                reviewId={review.id}
                                                initialReview={review.body}
                                                initialRating={review.rating}
                                                productId={review.product_id}
                                            />}
                                        />
                                        <OpenModalMenuItem
                                            itemText='Delete Review'
                                            className='delete-button'
                                            modalComponent={(
                                                <div id='confirm-delete'>
                                                    <h2>Confirm Delete</h2>
                                                    <span>Are you sure you want to remove this review?</span>
                                                    <button className='success' type='button' onClick={() => handleReviewDelete(review.id)}>Delete Review</button>
                                                    <button className='success' type='button' onClick={closeModal}>Keep Review</button>
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className='empty-reviews'>
                            <h3>🌟 Your reviews are empty 🌟</h3>
                        </div>
                    )}
                </ul>
            </section>
            <section id='wish-contain'>
                <Wishlist />
            </section>
            <section className='button-contain'>
                <div className='button-group'>
                    <div id='logout-but'>
                        <OpenModalMenuItem
                            itemText='Log Out'
                            className='delete-button'
                            modalComponent={(
                                <div id='confirm-delete'>
                                    <h2>Confirm Log Out</h2>
                                    <span>Are you sure you want to log out?</span>
                                    <button className='success' type='button' onClick={logout}>Log Out</button>
                                    <button className='success' type='button' onClick={closeModal}>Cancel</button>
                                </div>
                            )}
                        />
                        {/* <button onClick={logout}>Log Out</button> */}
                    </div>
                    <div id='delete-user-but'>
                        <OpenModalMenuItem
                            itemText='Delete User'
                            className='delete-button'
                            modalComponent={(
                                <div id='confirm-delete'>
                                    <h2>Confirm Delete</h2>
                                    <span>Are you sure you want to remove this user?</span>
                                    <button className='success' type='button' onClick={() => handleDeleteProfile(userStore.id)}>Delete User</button>
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

// testuser.io, password
