import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className="profile-button">
      <div className="profile-container">
        <div className="profile-info" onClick={toggleMenu}>
          {user ? (
            <>
              <FaUserCircle className="dropdown-icon" />
            </>
          ) : (
            <p className="greeting">Please sign in here.</p>
          )}
        </div>
      </div>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <div className="menu-item"
                onClick={() => {
                  alert("New feature coming soon")
                  // navigate(`/users`)
                  // closeMenu();
                }}
              >
                Manage {user.email}
              </div>
              <hr className="profile-divider" />
              <div
                className="menu-item"
                onClick={() => {
                  navigate(`/products/current`);
                  closeMenu();
                }}
              >
                Manage Products
              </div>
              <hr className="profile-divider" />
              <div
                className="menu-item"
                onClick={() => {
                  navigate(`/new-product`);
                  closeMenu();
                }}
              >
                Create Product Listing
              </div>
              <hr className="profile-divider" />
              <div
                className="menu-item"
                onClick={() => {
                  alert("New feature coming soon")
                  // navigate(`/cart`);
                  // closeMenu();
                }}
              >
                Manage Cart
              </div>
              <hr className="profile-divider" />
              <div
                className="menu-item"
                onClick={() => {
                  alert("New feature coming soon")
                  // navigate(`/orders`);
                  // closeMenu();
                }}
              >
                My Order History
              </div>
              <hr className="profile-divider" />
              <div className="menu-item">
                <button onClick={logout}>Log Out</button>
              </div>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                className="menu-item"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <hr className="profile-divider" />
              <OpenModalMenuItem
                itemText="Sign Up"
                className="menu-item"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
