import React from 'react'
import "../../app/globals.css";
import Navbar from '../../components/Navbar';
import Boxes from './Learning_Boxes';
import Footer from '@/components/Footer';

import 'animate.css';

function index() {
  return (
    <div className='bg-second '>
        <Navbar />

        <Boxes />
 
        <Footer />
    </div>
  )
}

export default index