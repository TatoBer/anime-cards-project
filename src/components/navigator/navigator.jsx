import React from 'react'
import "./navigator.css"
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdLogout } from 'react-icons/md';
import { Link } from "react-router-dom";
import LogOut from '../log-out/log-out';
import { navOpen } from './functions';

export default function Navigator() {

  const handleLogOut = ()=>{
    document.querySelector(".logout-div").classList.remove("off")
}


  return (
    <>
    
    <LogOut />
    <nav className='nav-lateral'>
      <div>
        <Link to="/">
        <FaHome />
        </Link>
        <FaInfoCircle />
      </div>
        <MdLogout onClick={handleLogOut} />
    </nav>
    <button className='nav-burger' onClick={navOpen}><GiHamburgerMenu /></button>
    </>
  )
}