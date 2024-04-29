import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../../images/Poppins's Shoppins.png"

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
        <div className="nav-profile">
          <ProfileButton />
        </div>
      </div>
      <div className="category-contain">
        <div className="cat-items">
          <NavLink className="cat-item" onClick={() => alert("Ability to categorize items coming soon.")}>Furniture</NavLink>
          <NavLink className="cat-item" onClick={() => alert("Ability to categorize items coming soon.")}>Creativity</NavLink>
          <NavLink className="cat-item" onClick={() => alert("Ability to categorize items coming soon.")}>Handmade</NavLink>
          <NavLink className="cat-item" onClick={() => alert("Ability to categorize items coming soon.")}>Clothing</NavLink>
          <NavLink className="cat-item" onClick={() => alert("Ability to categorize items coming soon.")}>Miscellaneous</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
