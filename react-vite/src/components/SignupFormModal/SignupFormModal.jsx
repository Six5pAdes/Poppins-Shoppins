import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErr = {}

    const validEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!firstName) newErr.firstName = "First name must be provided"
    if (!lastName) newErr.lastName = "Last name must be provided"
    if (!validEmail(email)) newErr.email = "Email must be formatted correctly"
    if (username <= 3) newErr.username = "Username must be at least 3 characters long"
    if (password < 6) newErr.password = "Password must be at least 6 characters long"
    if (password !== confirmPassword) newErr.confirmPassword = "Confirm Password field must be the same as the Password field"
    if (Object.keys(newErr).length > 0) {
      setErrors(newErr)
      return
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const disabledButton = () => {
    return (email === '' || username === '' || firstName === '' || lastName === '' || password !== confirmPassword || username.length <= 2 || password.length < 6)
  }

  return (
    <div className="signup-modal">
      <h1 className="signup-header">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className='signup-labels'>
          First Name
          <input
            className='signup-inputs'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="err-msg">{errors.firstName}</p>}
        </label>
        <label className='signup-labels'>
          Last Name
          <input
            className='signup-inputs'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="err-msg">{errors.lastName}</p>}
        </label>
        <label className='signup-labels'>
          Email
          <input
            className='signup-inputs'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="err-msg">{errors.email}</p>}
        </label>
        <label className='signup-labels'>
          Username
          <input
            className='signup-inputs'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="err-msg">{errors.username}</p>}
        </label>
        <label className='signup-labels'>
          Password
          <input
            className='signup-inputs'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="err-msg">{errors.password}</p>}
        </label>
        <label className='signup-labels'>
          Confirm Password
          <input
            className='signup-inputs'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="err-msg">{errors.confirmPassword}</p>}
        </label>
        {disabledButton() ?
          <button className="signup-disabled" type="submit">Sign Up</button>
          :
          <button className="signup-success" type="submit">Sign Up</button>
        }
      </form>
    </div>
  );
}

export default SignupFormModal;
