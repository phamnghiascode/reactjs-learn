import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"

const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)

    const navigate = useNavigate();
    const handleLogin = ()=> {
       navigate("/login")
    }
    const handleRegister = ()=> {
        navigate("/register")
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary fw-bold">
            <Container>
                <NavLink to="/" className='navbar-brand'>QuyZzz</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>Users</NavLink>
                        <NavLink to="/admins" className='nav-link'>Admins</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated=== false?
                        <>
                            <button className='btn-login px-3 me-3' onClick={() => {handleLogin()}}>Log In</button>
                            <button className='btn-signup px-3' onClick={()=> handleRegister()}>Sign Up</button>
                        </>
                        :
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item>Log Out</NavDropdown.Item>
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                        </NavDropdown>
                        }   
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;