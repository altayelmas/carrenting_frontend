import React, {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {SpinnerLoading} from "../Utils/SpinnerLoading";

export const Navbar = () => {

    const [authState, setAuthState] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") && localStorage.getItem("roles") !== null) {
            // @ts-ignore
            let roles_array = localStorage.getItem("roles").split(',');
            if (roles_array.length === 2 && (roles_array[0] === 'ADMIN' || roles_array[1] === 'ADMIN')) {
                setAuthState(2);

            } else if (roles_array.length === 1 && (roles_array[0] === 'ADMIN')) {
                setAuthState(2);

            } else if (roles_array.length === 1 && (roles_array[0] === 'USER')) {
                setAuthState(1);
            }
        }
    }, []);




    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        localStorage.removeItem("username");
        localStorage.setItem("authState", "0");
        navigate('/home');
    }
    /*if (authState === 0) {
        return <SpinnerLoading/>
    }*/

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className='container-fluid'>
                <span className='navbar-brand'>Car Renting System</span>
                <button className='navbar-toggler' type='button'
                        data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
                        aria-controls='navbarNavDropdown' aria-expanded='false'
                        aria-label='Toggle Navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/home'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/search'>Search Cars</NavLink>
                        </li>
                        {localStorage.getItem("authState") === "1" &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/myReservations'>My Reservations</NavLink>
                            </li>
                        }
                        {localStorage.getItem("authState") === "2" &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/createCar'>Create Cars</NavLink>
                            </li>
                        }
                        {localStorage.getItem("authState") === "2" &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/listCars'>List Cars</NavLink>
                            </li>
                        }
                        {localStorage.getItem("authState") === "2" &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/listReservations'>List Reservations</NavLink>
                            </li>
                        }
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        {localStorage.getItem("authState") !== "0" &&
                            <li>
                                <button className='btn btn-outline-light' onClick={handleLogOut}>Logout</button>
                            </li>
                        }
                        {localStorage.getItem("authState") === "0" &&
                            <li className='nav-item m-1'>
                                <Link type='button' className='btn btn-outline-light' to='/login'>Sign in</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}