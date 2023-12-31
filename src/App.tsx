import React from 'react';
import './App.css';
import {Navbar} from "./layouts/NavbarAndFooter/Navbar";
import {Footer} from "./layouts/NavbarAndFooter/Footer";
import {HomePage} from "./layouts/HomePage/HomePage";
import {SearchCarsPage} from "./layouts/SearchCarsPage/SearchCarsPage";
import {Route, Routes} from "react-router-dom";
import {CarReservationPage} from "./layouts/CarReservationPage/CarReservationPage";
import Login from "./layouts/LoginPage/components/Login";
import SignUp from "./layouts/SignUpPage/SignUp";
import {ListCarsPage} from "./layouts/ListCarsPage/ListCarsPage";
import {ListReservationsPage} from "./layouts/ListReservationsPage/ListReservationsPage";
import {CreateCarPage} from "./layouts/CreateCarPage/CreateCarPage";

export const App = () => {

    return (

        <div className='d-flex flex-column min-vh-100'>
            <Navbar/>
            <div className='flex-grow-1'>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/search' element={<SearchCarsPage/>}/>
                    <Route path='/reservation/:licencePlate' element={<CarReservationPage/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/createCar' element={<CreateCarPage/>}/>
                    <Route path='/listCars' element={<ListCarsPage/>}/>
                    <Route path='/listReservations' element={<ListReservationsPage/>}/>
                    <Route path='*' element={<HomePage/>} />
                </Routes>
                {/*<BrowserRouter>



                </BrowserRouter>*/}


                {/*<Router>
                    <Routes>
                        <Route path='/home'> element={<HomePage/>}/>
                        </Route>
                        <Route path='/search'>
                            <SearchCarsPage/>
                        </Route>
                        <Route path='/reservation/:licencePlate'>
                            <CarReservationPage/>
                        </Route>
                    </Routes>
                </Router>*/}
                {/*<Route path='/' exact>
                        <Redirect to='/home'/>
                    </Route>*/}
            </div>
            <Footer/>
        </div>
    );
}