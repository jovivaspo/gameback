import React,{useContext} from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NavBar.css'
import ModalSign from './ModalSign'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../actions/userActions'
import alertContext from '../contexts/alertContext'


const NavBar = () => {

  const user = useSelector(state => state.user.userInfo)
  const {setAlert, initialAlert} = useContext(alertContext)
  const dispatch = useDispatch()
  const handleLogOut = () =>{
    dispatch(logout())
    localStorage.removeItem('userInfo')
    setAlert(initialAlert)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link className='nav-link' to='/'><img src={process.env.PUBLIC_URL + 'gameback.png'} height={100} /></Link>
            </Nav>
            <Nav>
              {!user ?
                <ModalSign /> :
                <Button variant='outline-light' onClick={handleLogOut}>
                  Log Out
                </Button>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>


  )
}

export default NavBar
