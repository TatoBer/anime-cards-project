import React from 'react'
import "./navigator.css"
import { FaHome, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import { CgCardHearts } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { Link } from "react-router-dom";
import LogOut from '../log-out/log-out';

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

    </>
  )
}
