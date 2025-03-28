import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
        <div className='banner'>
            <img src={imageUrl} alt='aboutImp' />
        </div>
        <div className='banner'>
            <p>Biography</p>
            <h3>Who We Are</h3>
            <p>A Hospital Management System (HMS) is a comprehensive software solution designed to manage and streamline the various functions and operations within a hospital or healthcare facility. It integrates and automates core hospital processes, such as patient management</p>
            <p>A Hospital Management System (HMS) is a comprehensive software solution designed to manage and streamline</p>
            <p>A Hospital Management System (HMS) is a comprehensive software.</p>
            <p>A Hospital Management System (HMS) is a comprehensive software solution designed to manage and streamline the various functions and operations within a hospital or healthcare facility. </p>
            <p>A Hospital Management System (HMS)</p>
        </div>
    </div>
  )
}

export default Biography
