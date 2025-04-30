import React, { useContext, useState } from 'react'
import { Context } from '../main';
import {TiHome} from "react-icons/ti"; 
import {RiLogoutBoxFill} from "react-icons/ri"; 
import {AiFillMessage} from "react-icons/ai"; 
import {GiHamburgerMenu} from "react-icons/gi"; 
import {FaUserDoctor,FaBed} from "react-icons/fa6"; 
import {MdAddModerator} from "react-icons/md"; 
import {IoPersonAddSharp, IoDocumentText} from "react-icons/io5"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserInjured } from 'react-icons/fa';
import { FaPills } from "react-icons/fa";



const Sidebar = () => {
    const [show, setShow] = useState(false);

    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    const navigateTo = useNavigate();

    const gotoHome = () => {
        navigateTo("/");
        setShow(!show);
    }
    const gotoDoctorsPage = () => {
        navigateTo("/doctors");
        setShow(!show);
    }
    const gotoMessagePage = () => {
        navigateTo("/messages");
        setShow(!show);
    }
    const gotoAddNewDoctor = () => {
        navigateTo("/doctor/addnew");
        setShow(!show);
    }
    const gotoAddNewMedicine = () => {
      navigateTo("/medicine/addnew");
      setShow(!show);
  }
    const gotoAddNewAdmin = () => {
        navigateTo("/admin/addnew");
        setShow(!show);
    }
    const gotoPatientDetails = () => {
        navigateTo("/PatientDetails");
        setShow(!show);
    }
    const gotoPrescriptionPage = () => {
      navigateTo("/prescriptions");
      setShow(!show);
  }
  const gotoBedPage = () => {
    navigateTo("/beds");
    setShow(!show);
}
    

    const handleLogout = async()=>{
        await axios.get("http://localhost:4000/api/v1/user/admin/logout", {withCredentials: true,}).then((res)=>{
            toast.success(res.data.message);
            setIsAuthenticated(false);
        }).catch(err=>{
            toast.error(err.response.data.message);
        });
    };


  return (
    <>
      <nav style={!isAuthenticated ? {display: "none"} : {display: "flex"}} className={show ? "show sidebar" : "sidebar"}>
      <div className='links'>
        <TiHome onClick={gotoHome} />
        <FaUserDoctor onClick={gotoDoctorsPage} />
        <MdAddModerator onClick={gotoAddNewAdmin} />
        <IoPersonAddSharp onClick={gotoAddNewDoctor} />
        <FaPills onClick={gotoAddNewMedicine} />
        <AiFillMessage onClick={gotoMessagePage} />
        <FaUserInjured onClick={gotoPatientDetails} />
        <FaBed onClick={gotoBedPage} /> 
        <IoDocumentText onClick={gotoPrescriptionPage} />
        <RiLogoutBoxFill  onClick={handleLogout}/>
      </div>
      </nav>
      <div style={!isAuthenticated ? {display: "none"} : {display: "flex"}} className='wrapper'>
        <GiHamburgerMenu className='hamburger' onClick={()=> setShow(!show)} />
      </div>
    </>
  )
}

export default Sidebar
