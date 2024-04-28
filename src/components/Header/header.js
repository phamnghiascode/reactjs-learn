import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
const Header = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    const handleLogin = ()=> {

       navigate("/login")
    }
    const handleRegister = ()=> {
        navigate("/register")
    }

    const handleLogout = async () => {
        // console.log("accout: ", account)
        let res = await logout(account.email, account.refresh_token)

        if(res && res.EC === 0){
            dispatch(doLogout())
            navigate("/login")
        }
        else {
            toast.error(res.EM)
        }
    }
    // console.log("authen: ", isAuthenticated)

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
                        {isAuthenticated === false ?
                        <>
                            <button className='btn-login px-3 me-3' onClick={() => {handleLogin()}}>Log In</button>
                            <button className='btn-signup px-3' onClick={()=> handleRegister()}>Sign Up</button>
                        </>
                        :
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item>My Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>handleLogout()}>Log Out</NavDropdown.Item>
                        </NavDropdown>
                        }   
                        <Language/>
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;