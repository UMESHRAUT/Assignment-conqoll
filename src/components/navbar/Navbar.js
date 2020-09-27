import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
    return (
        <div className="navbar">
            <div className="brand">Brand</div>
            <div className="screens">
                <NavLink to='/' className="link">All</NavLink>
                <NavLink to="/shortlists" className="link">shortlisted</NavLink>
            </div>
        </div>
    )
}

export default Navbar
