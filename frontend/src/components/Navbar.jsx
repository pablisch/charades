// import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import { IoCaretBackCircle } from "react-icons/io5";
import './Navbar.css';
// import NavLink from './NavLink';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className='nav-link-box'>
      {pathname === '/' && <Link id='add-charade-navlink' to='/add-charade'>
        <FaPlusCircle id='add-charade-icon' className='icon-link' />
      </Link>}
      {pathname === '/add-charade' && <Link id='add-charade-navlink' to='/'>
      <IoCaretBackCircle id='back-to-charades-icon' className='icon-link' />
      </Link>}
    </div>
  );
};

export default Navbar;
