import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErr = {}

    if (!email) newErr.email = "Email must be provided"
    if (!password) newErr.password = "Password must be provided"

    setErrors(newErr);
    if (Object.keys(newErr).length > 0) return;

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
    return (!email || !password)
  }

  const demoUser = async (e) => {
    e.preventDefault()
    await dispatch(
      thunkLogin({ email: "test@aa.io", password: "password" })
    )
    await navigate('/')
    closeModal()
  }

  return (
    <div className='login-modal'>
      <h1 className='login-header'>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-labels'>
          <input
            className='login-inputs'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="floating-placeholders" style={email ? { top: "-10.5px" } : null}>
            <label>Enter Email</label>
          </div>
          {errors.email && <p className="err-msg">{errors.email}</p>}
        </label>
        <label className='login-labels'>
          <input
            className='login-inputs'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="floating-placeholders" style={password ? { top: "-10.5px" } : null}>
            <label>Enter Password</label>
          </div>
          {errors.password && <p className="err-msg">{errors.password}</p>}
        </label>
        {disabledButton() ?
          <button className='disabled' type="submit">Log In</button>
          :
          <button className='success' type="submit">Log In</button>
        }
        <button href="/" onClick={demoUser} className="demo-user">Log In as Demo User</button>
        {/* <a href={`${window.origin}/api/auth/oauth_login`}><button>OAUTH</button></a> */}
      </form>
    </div>
  );
}

export default LoginFormModal;
