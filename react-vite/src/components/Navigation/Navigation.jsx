import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "../Searchbar/Searchbar";
import "./Navigation.css";
import logo from "../../../images/Poppins's Shoppins.png"
import { FaShoppingCart } from "react-icons/fa";

function Navigation() {
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
        <SearchBar className='search-contain' />
        <div className="nav-cart">
          <NavLink to='/orders'>
            <FaShoppingCart className="cart-icon" />
          </NavLink>
        </div>
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
