import React from 'react'
import logo from "../images/Netflix_Logo_PMS.png"
import { Link } from 'react-router-dom'
import {ImSearch} from "react-icons/im"
const Header = () => {
  return (
    <nav className='header'>
     <img src={logo} alt="" />
<div>
     <Link to ="/tvshows">Tv show</Link>
     <Link to ="/tvshows">Movies</Link>
     <Link to ="/tvshows">Recently Added</Link>
     <Link to ="/tvshows">My list</Link>
</div>
     <ImSearch/>
    </nav>
    
  )
}

export default Header