import { deleteUserThunk } from '../../redux/profile'
import * as sessionActions from '../../redux/session'
import { useNavigate, useParams } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import ProfileUpdate from './EditProfile'
import './ProfileInfo.css'

const UserPage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const toInt = parseInt(userId)
    const navigate = useNavigate()
    const { closeModal } = useModal()

    let user = useSelector(state => state.session.user ? state.session.user : null)

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.thunkLogout());
        navigate('/')
    }

    const handleDeleteProfile = toInt => {
        const deletedUser = dispatch(deleteUserThunk(toInt));
        if (deletedUser) {
            navigate('/')
            closeModal()
        }
    }

    return (
        <>
            <section className='profile-contain'>
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
            <section className='button-contain'>
                <div>
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
                                    <button id='delete-complete' type='button' onClick={() => handleDeleteProfile(user.id)}>Yes (Delete User)</button>
                                    <button id='delete-cancel' type='button' onClick={closeModal}>No (Keep User)</button>
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
