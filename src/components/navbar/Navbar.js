import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
function Navbar() {

    const shortListData = useSelector(state => state.shortListData)
    const{data}=shortListData;
    console.log(data.length);
    return (
        <div className="navbar">
            <div className="brand">Brand</div>
            <div className="screens">
                <NavLink to="/" exact activeClassName="active" className="link">All</NavLink>
    <NavLink to="/shortlists" exact activeClassName="active" className="link">shortlisted<sup className="super">{data.length}</sup> </NavLink>
            </div>
        </div>
    )
}

export default Navbar
