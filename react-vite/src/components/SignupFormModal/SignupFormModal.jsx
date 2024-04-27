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

    if (username <= 3) {
      newErr.username = "Username must be at least 3 characters long"
    }
    if (password < 6) {
      newErr.password = "Password must be at least 6 characters long"
    }
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
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

  const invalidInfo = () => {
    return (
      !email.length ||
      username.length <= 2 ||
      !firstName ||
      !lastName ||
      password.length < 6 ||
      password !== confirmPassword
    );
  };

  return (
    <div className="signupModalWrapper">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="signupForm" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          // required
          />
        </label>
        {errors.firstName && <p className="err-msg">{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          // required
          />
        </label>
        {errors.lastName && <p className="err-msg">{errors.lastName}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          // required
          />
        </label>
        {errors.email && <p className="err-msg">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          // required
          />
        </label>
        {errors.username && <p className="err-msg">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          // required
          />
        </label>
        {errors.password && <p className="err-msg">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          // required
          />
        </label>
        {errors.confirmPassword && <p className="err-msg">{errors.confirmPassword}</p>}
        {disabledButton() ?
          <button className="disabledSignupButton" disabled={true} type="submit">Sign Up</button>
          :
          <button className="signupModalButton" disabled={invalidInfo()} type="submit">Sign Up</button>
        }      </form>
    </div>
  );
}

export default SignupFormModal;
