import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }
    return (
        <React.Fragment>
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
          </button>
                    <Link to="/">FlipgeniX</Link>
                </div>
                <div className="header-links">
                    <a href="cart.html">Cart<i className="fas fa-shopping-cart"></i></a>
                    <Link to="/signin">
                        <a href="">Sign In<i className="fas fa-sign-in-alt"></i></a>
                    </Link>
                </div>
            </header>

            <aside className="sidebar">
                <h3>Categories</h3>
                <button onClick={closeMenu} className="sidebar-close">
                    <i className="fas fa-times"></i>
                </button>
                <ul>
                    <li><a href="index.html">Electronics</a></li>
                    <li><a href="index.html">Clothes</a></li>
                </ul>
            </aside>
        </React.Fragment>
    )
}

export default Header
