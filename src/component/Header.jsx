import React from "react";
import Search from "./Search";
import { ShoppingCart, Heart, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {

    const cartItems = useSelector((state)=> state.cart.cartItems);

    const cartquantity = cartItems.reduce((total, item)=> total + item.quantity, 0)

    return (
        <>
            <header className="header-container">
                <div className="header-div">
                    <h1 className="logo">
                        ShoppyGlobe
                    </h1>
                    <Search/>
                    <div className="header-list">
                        <ul>
                            <Heart/><li style={{marginLeft:"-12px", marginTop : "4px"}}>
                            Wishlist
                            </li>
                            <Link to="/ShoppingCart">
                            <ShoppingCart style={{color: "black"}}/>
                            <div style={{position: "absolute", top: "15px", marginLeft: "10px", fontSize: "20px"}}>
                            {
                                cartquantity > 0 && (
                                    <div className="cart-quantity">
                                        <span>{cartquantity}</span>
                                    </div>
                                )         
                            }
                            </div>
                            </Link >
                            <li style={{marginLeft:"-12px", marginTop : "4px"}}>Cart</li>
                            <User/>
                            <li style={{marginLeft:"-12px", marginTop : "4px"}}>Account</li>
                        </ul>
                    </div>
               </div>
            </header>
        </>
    )
}

export default Header;
