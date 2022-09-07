import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    const logo = require('../assets/logo.png');
    const logoText = require('../assets/logo-text.png');

    return (
        <div className='container-fluid header'>
            <div className='row d-flex justify-content-center'>
            <div className='col-md-10 d-flex justify-content-between'>
                <Link to={"/" } className="m-2">
                    <img src={logo} className='img-fluid' alt="rick-and-morty-logo"/>
                </Link>
                <Link to={"/" }>
                    <img src={logoText} className='img-fluid' alt="rick-and-morty-logo-text"/>
                </Link>
            </div>  
            </div>
        </div>
       
    )
  }
export default Header;
