import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
        <div className='banner'>
            <h1>{title}</h1>
            <p>
            A Hospital Management System (HMS) is a comprehensive software solution designed to manage and streamline the various functions and operations within a hospital or healthcare facility. It integrates and automates core hospital processes, such as patient management, medical records, billing, inventory, staff management, and more, to improve efficiency and provide better care.
            </p>
        </div>
    <div className='banner'>
        <img src={imageUrl} alt='Hero' className='animated-image' />
        <span>
            <img src='/Vector.png' alt='vector' />
        </span>
    </div>
    </div>
  )
}

export default Hero
