import React, { useEffect, useState } from "react";
import Search from "./Search";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/api/Login"); // Redirect to login page on logout
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="header-container">
        <div className="header-div">
          <h1 className="logo">ShoppyGlobe</h1>
          <Search />
          <div className="header-list">
            <ul>
              <Heart />
              <li style={{ marginLeft: "-12px", marginTop: "4px" }}>Wishlist</li>
              <Link to="/ShoppingCart">
                <ShoppingCart style={{ color: "black" }} />
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    marginLeft: "10px",
                    fontSize: "20px",
                  }}
                >
                  {cartQuantity > 0 && (
                    <div className="cart-quantity">
                      <span>{cartQuantity}</span>
                    </div>
                  )}
                </div>
              </Link>
              <li style={{ marginLeft: "-12px", marginTop: "4px" }}>Cart</li>
              <User />
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/api/register"
                    style={{
                      marginLeft: "-12px",
                      marginTop: "4px",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Register
                  </Link>
                  <Link
                    to="/api/Login"
                    style={{
                      marginLeft: "-5px",
                      marginTop: "4px",
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <li
                  onClick={handleLogout}
                  style={{
                    marginLeft: "-12px",
                    marginTop: "4px",
                    cursor: "pointer",
                    color: "black",
                  }}
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
