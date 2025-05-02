import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        await axios.get("http://localhost:4000/api/v1/user/patient/logout", { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(false);
            })
            .catch(err => {
                toast.error(err.response.data.message);
            });
    };

    const gotoLogin = async () => {
        navigateTo("/login");
    };

    return (
        <nav className="container">
            <div className="logo">
                <img src='/mylogo.jpeg' alt='logo' className='logo-img' />
            </div>
            <div className={show ? "navLinks showmenu" : "navLinks"}>
                <div className="links nav-left">
                    <Link to={"/"}>HOME</Link>
                    <Link to={"/appointment"}>APPOINTMENT</Link>
                    <Link to={"/about"}>ABOUT US</Link>
                    <Link to={"/BMICalculator"}>BMI</Link>
                    <Link to={"/medicines"}>MEDICINE</Link>
                </div>
                <div className="quick-aid-container">
                    <a href="https://rapid-relief.vercel.app/" target="_blank" rel="noopener noreferrer" className="quick-aid-link">
                        EMERGENCY
                    </a>
                    {isAuthenticated ? (
                        <button className="logoutBtn btn" onClick={handleLogout}>
                            LOGOUT
                        </button>
                    ) : (
                        <button className="logoutBtn btn" onClick={gotoLogin}>
                            LOGIN
                        </button>
                    )}
                </div>
            </div>
            <div className="hamburger" onClick={() => setShow(!show)}>
                <GiHamburgerMenu />
            </div>
        </nav>
    );
};

export default Navbar;

