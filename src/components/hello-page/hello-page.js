import React from 'react';
import { Link } from 'react-router-dom';

import './hello-page.css';

const HelloPage = () => {
    return (
        <div className='page'>
            <div className='hello-page'>
                <div className='text-block'>
                    <h1>Welcome to my Weather App</h1>
                    <h2>Have a nice day! :)</h2>
                </div>
                <div className='links'>
                    <Link to='/time' >
                    <i className="far fa-clock fa-7x btn-intro"></i>
                    </Link>
                    <Link to='/city' >
                    <i className="fas fa-city fa-7x btn-intro"></i>
                    </Link>
                    <Link to='/weather' >
                    <i className="fas fa-cloud fa-7x btn-intro"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HelloPage;
