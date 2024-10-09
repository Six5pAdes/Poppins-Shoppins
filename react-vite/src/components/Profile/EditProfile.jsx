import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { editUserThunk, getUserThunk } from "../../redux/profile"
import { useModal } from "../../context/Modal"
import './EditProfile.css'

const ProfileUpdate = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const currUser = useSelector(state => state.session.user)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmit(true)

        if (Object.values(errors).length === 0) {
            let userData = {
                first_name: firstName,
                last_name: lastName,
                email,
                username,
            }

            const updateUser = await dispatch(editUserThunk(userId, userData))
            if (updateUser && !updateUser.errors) {
                // Update Redux store with new user data
                dispatch({ type: 'UPDATE_USER', payload: updateUser }) // Assuming 'UPDATE_USER' is your action type
                closeModal()
            } else {
                setErrors({ ...updateUser.errors, ...errors })
            }
        }
    }

    useEffect(() => {
        if (userId) dispatch(getUserThunk(userId))
    }, [dispatch, userId])

    useEffect(() => {
        const validErrs = {}
        if (submit && !firstName) validErrs.firstName = "First name is required"
        if (submit && !lastName) validErrs.lastName = "Last name is required"
        if (submit && !email) validErrs.email = "Email is required"
        if (submit && !username) validErrs.username = "Username is required"
        setErrors(validErrs)
    }, [firstName, lastName, email, username, submit])

    useEffect(() => {
        if (currUser) {
            setFirstName(currUser.first_name)
            setLastName(currUser.last_name)
            setEmail(currUser.email)
            setUsername(currUser.username)
        }
    }, [currUser])

    const disabledButton = () => {
        return (!firstName || !lastName || !email || !username)
    }

    return (
        <div id="form-modal-contain">
            <form onSubmit={handleSubmit} id="form">
                <h1>Update Profile Info</h1>
                <div>
                    <label className="user-label">
                        First Name
                        <input
                            className="user-inputs"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    {errors.firstName && <p className="err-msg">{errors.firstName}</p>}
                    <label className="user-label">
                        Last Name
                        <input
                            className="user-inputs"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    {errors.lastName && <p className="err-msg">{errors.lastName}</p>}
                    <label className="user-label">
                        Email
                        <input
                            className="user-inputs"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    {errors.email && <p className="err-msg">{errors.email}</p>}
                    <label className="user-label">
                        Username
                        <input
                            className="user-inputs"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    {errors.username && <p className="err-msg">{errors.username}</p>}
                </div>
                {disabledButton() ?
                    <button className="disabled" type="submit">Update User</button>
                    :
                    <button className="success" type="submit">Update User</button>
                }
                <button id="cancel" type="button" onClick={closeModal}>Cancel Update</button>
            </form>
        </div >
    )
}

export default ProfileUpdate
