import React from 'react'
import "../../app/globals.css";
import Navbar from '../../components/Navbar';
import Boxes from './Learning_Boxes';
import 'animate.css';

function index() {
  return (
    <div className='bg-second pb-20'>
        <Navbar />

        <Boxes />

    </div>
  )
}

export default index