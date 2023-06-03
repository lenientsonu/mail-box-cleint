import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import Logout from "../Login/Logout";

import "./Header.css";

const Header = () => {
    const email = useSelector((state) => state.auth.email);

    return (
        <Container className='navbar'>
            <Navbar.Brand className='navbar-brand'>
                <h2>Strike Mail</h2>
            </Navbar.Brand>
            <Nav className='me-auto navbar-nav'>
                <h3 className="navbar__user">Signed in as: {email}</h3>
                <NavLink to='/home'>
                    <Button>Home</Button>
                </NavLink>
                <NavLink to='/compose'>
                    <Button>Compose</Button>
                </NavLink>
                <NavLink to='/mailbox'>
                    <Button>MailBox</Button>
                </NavLink>
                <Logout />
            </Nav>
        </Container>
    );
};

export default Header;
