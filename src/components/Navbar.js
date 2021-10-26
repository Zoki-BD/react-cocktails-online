import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'

import 'bootstrap/dist/css/bootstrap.min.css';



function Navbar() {
   return (
      <nav className='navbar navbar-expand-lg  navbar-light bg-warning'>
         <div className='container'>
            <Link to='/' className='navbar-brand text-uppercase'>
               <img src={logo} alt='LOGO' className='logo' />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar">
               <ul className="navbar-nav mr-auto">
                  <li className='nav-item'>
                     <Link to='/' className="nav-link">
                        Name
                     </Link>
                  </li>


                  <li className='nav-item'>
                     <Link to='/category' className="nav-link">
                        Category
                     </Link>
                  </li>
                  <li className='nav-item'>
                     <Link to='/alcohol_filter' className="nav-link">
                        Alcohol / Non Alcohol
                     </Link>
                  </li>
               </ul>
            </div>
            <div className="dropdown">
               <Link to='/favorites' className='btn btn-danger'>
                  My Favorites
               </Link>
            </div>
         </div>
      </nav >

   )
}

export default Navbar
