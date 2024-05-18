import React from 'react'
import MotionWrap from '../../wrapper/MotionWrap';
import { Link } from 'react-router-dom'
import './Mid.scss'
import { motion } from 'framer-motion'
import Reservation from '../Reservation/Reservation';
// import { images } from '../../constants'

function Mid() {
   
  return (
        <div class="app__mid wrapper" id="udemy">
          <div class="app__mid__gold">
            <h1>" Let us take you on a culinary journey you won't forget. Book your table for an unforgettable dining experience. "</h1>
            <button><Link to="/Reservation"/> Reservation</button>
          </div>
      </div>
  )
}

export default Mid;