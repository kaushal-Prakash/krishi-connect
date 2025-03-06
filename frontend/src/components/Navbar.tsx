import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <input type="checkbox" className='navbar__checkbox' id='nav-toggle'/>
        <label htmlFor="nav-toggle" className='navbar__button'>MENU</label>

        <div className="navbar__bg"></div>

        <nav className="navbar__nav">
            <ul className="navbar__list">
                <Link href="/about-us" className="navbar__link">About Us</Link>
                <Link href="/home" className="navbar__link">Home</Link>
                <Link href="/profile" className="navbar__link">Profile</Link>
                <Link href="/login" className="navbar__link">Login</Link>
                <Link href="/signup" className="navbar__link">Signup</Link>
                <Link href="/market" className="navbar__link">Market</Link>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar