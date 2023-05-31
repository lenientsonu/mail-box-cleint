import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Logout from "../Login/Logout";

import "./Header.css";

const Header = () => {
    const email = useSelector((state) => state.auth.email);

    return (
        <div className='navbar'>
            <h3>{email}</h3>
            <NavLink to='/home'>Expense Tracker</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <Logout />
        </div>
    );
};

export default Header;
