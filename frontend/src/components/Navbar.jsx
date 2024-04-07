// import { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { FaPlus } from 'react-icons/fa';
import './Navbar.css';
// import NavLink from './NavLink';


const Navbar = () => {

  // const handleMouseEnter = () => {
  //   setIsLogoRotated(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsLogoRotated(false);
  // };

  // const navigate = useNavigate();

  // const logout = () => {
  //   window.localStorage.clear();
  //   setUserToken(null);
  //   setUser(null);
  // };

  // const handleLogOut = () => {
  //   logout();
  //   navigate('/');
  // };

  // const handleAddImage = () => {
  //   navigate('/upload');
  // };

  // const randomNumber = () => {
  //   let num = Math.floor((Math.random() * 6) + 1);
  //   while (num === prevNumber) {
  //     num = Math.floor((Math.random() * 6) + 1);
  //   }
  //   prevNumber = num;
  //   return num;
  // }

  return (
    <>
    {/* <nav className='navbar' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleMouseEnter} onTouchEnd={handleMouseLeave} >
      <div className='navbar-container'>
      </div>
      <div className='divider-line'></div>
      </nav> */}
      <Link
                id='settings-navlink'
                >
                </Link>
  </>
  );
};

export default Navbar;
