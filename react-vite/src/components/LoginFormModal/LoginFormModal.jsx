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
        <label className='login-labels'>Email
          <input
            className='login-inputs'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p className="err-msg">{errors.email}</p>}
        <label className='login-labels'>Password
          <input
            className='login-inputs'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="err-msg">{errors.password}</p>}
        </label>
        {disabledButton() ?
          <button className='login-disabled' type="submit">Log In</button>
          :
          <button className='login-success' type="submit">Log In</button>
        }
        <button href="/" onClick={demoUser} className="demo-user">Log In as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
