import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { editUserThunk, getUserThunk } from "../../redux/profile";
import { useModal } from "../../context/Modal";
import './EditProfile.css';

const ChangePassword = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currUser = useSelector(state => state.session.user);

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmit(true);

        if (Object.values(errors).length === 0) {
            let userData = {
                password,
                new_password: newPassword,
                confirm_password: confirmPassword,
                username: currUser?.username, // Add this line
                email: currUser?.email,       // Add this line
                first_name: currUser?.first_name, // Add this line
                last_name: currUser?.last_name,   // Add this line
            };

            const updateUser = await dispatch(editUserThunk(userId, userData));
            if (updateUser && !updateUser.errors) {
                // Update Redux store with new user data
                dispatch({ type: 'UPDATE_USER', payload: updateUser }); // Assuming 'UPDATE_USER' is your action type
                closeModal();
            } else {
                setErrors({ ...updateUser.errors, ...errors });
            }
        }
    }

    useEffect(() => {
        if (userId) dispatch(getUserThunk(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        const validErrs = {};
        if (submit && !password) validErrs.password = "Password is required";
        if (submit && !newPassword) validErrs.newPassword = "New password is required";
        if (submit && !confirmPassword) validErrs.confirmPassword = "You need to confirm your new password";
        setErrors(validErrs);
        if (newPassword !== confirmPassword) validErrs.confirmPassword = "Passwords do not match";
    }, [password, newPassword, confirmPassword, submit]);

    useEffect(() => {
        if (currUser) {
            setPassword(currUser.password);
            setNewPassword(currUser.new_password);
            setConfirmPassword(currUser.confirm_password);
        }
    }, [currUser]);

    const disabledButton = () => {
        return !password || !newPassword || !confirmPassword || newPassword !== confirmPassword;
    }

    return (
        <div id="form-modal-contain">
            <form id="form" onSubmit={handleSubmit}>
                <h2>Change Password</h2>
                <div>
                    <label className="user-label" htmlFor="password">Current Password
                        <input
                            type="password"
                            className="user-inputs"
                            placeholder="Current Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </label>
                    {errors.password && <p className="err-msg">{errors.password}</p>}
                    <label htmlFor="newPassword">New Password
                        <input
                            type="password"
                            className="user-inputs"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </label>
                    {errors.newPassword && <p className="err-msg">{errors.newPassword}</p>}
                    <label className="user-label" htmlFor="confirmPassword">Confirm Password
                        <input
                            type="password"
                            className="user-inputs"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    {errors.confirmPassword && <p className="err-msg">{errors.confirmPassword}</p>}
                </div>
                {disabledButton() ?
                    <button className="disabled" type="submit">Update User</button>
                    :
                    <button className="success" type="submit">Update User</button>
                }
                <button id="cancel" type="button" onClick={closeModal}>Cancel Update</button>
            </form>
        </div>
    );
};

export default ChangePassword;
