import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SearchBar from "../Searchbar/Searchbar";
import logo from "../../../images/Poppins's Shoppins.png"
import { FaShoppingCart } from "react-icons/fa";
import "./Navigation.css";

function Navigation() {

  const user = useSelector((store) => store.session.user);

  return (
    <div className="full-navbar">
      <div className="nav-contain">
        <div className="nav-logo">
          <NavLink to='/'>
            <img
              className="logo"
              src={logo}
              alt="Poppins Shoppings"
            />
          </NavLink>
        </div>
        <SearchBar className='search-container' />
        {user ? (
          <div className="nav-cart">
            <NavLink to='/orders'>
              <FaShoppingCart className="cart-icon" />
            </NavLink>
          </div>) : (
          null
        )}
        <div className="nav-profile">
          <ProfileButton />
        </div>
      </div>
      <div className="category-contain">
        <div className="cat-items">
          <NavLink className="cat-item" to='/products/categories/clothing' >Clothing</NavLink>
          <NavLink className="cat-item" to='/products/categories/creativity'>Creativity</NavLink>
          <NavLink className="cat-item" to='/products/categories/furniture'>Furniture</NavLink>
          <NavLink className="cat-item" to='/products/categories/handmade' >Handmade</NavLink>
          <NavLink className="cat-item" to='/products/categories/miscellaneous'>Miscellaneous</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
