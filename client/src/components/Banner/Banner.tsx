import React from 'react'
import './Banner.css'
import { Button } from "@material-ui/core";
// import Search from './Search';
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Banner() {

    let navigate = useNavigate();

    return (
        <div className='banner'>
            <div className='banner__search'>
            </div>
            <div className='banner__info'>
                <h1>Book an office or become a host</h1>
                <h5>
                    Plan a different kind of getaway to uncover the hidden gems near you.
                </h5>
                
                {/* <Button size='large' onClick={() => { navigate("/search") }} variant='outlined'>Explore Offices</Button> */}
                <Button size='large' onClick={() => { navigate("/new") }} className='banner__searchButton' variant='outlined'>Become a Host</Button>
            </div>
        </div>
    )
}

export default Banner;