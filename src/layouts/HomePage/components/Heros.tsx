import {Link} from "react-router-dom";

export const Heros = () => {

    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Sign in to start planning your trip!</h1>
                            <p className='lead'>
                                Start browsing our fleet to find your dream car for your vacation!
                            </p>
                            {/*{authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                to='search'>Explore top cars </Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }*/}
                            {localStorage.getItem("authState") === "0" &&
                                <Link className='btn main-color btn-lg text-white' to='/login'>Login</Link>
                            }
                            {localStorage.getItem("authState") !== "0" &&
                                <Link className='btn main-color btn-lg text-white' to='/search'>Search Cars</Link>
                            }
                        </div>
                    </div>
                    <div className='row g-0'>
                        <div className='col-4 col-md-4 container d-flex
                        justify-content-center align-items-center'>
                            <div className='ml-2'>
                                <h1>Our fleet is always changing!</h1>
                                <p className='lead'>
                                    Try to check in daily as our fleet is always growing!
                                </p>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6'>
                            <div className='col-image-right'></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>Sign in to start planning your trip!</h1>
                            <p className='lead'>
                                Start browsing our fleet to find your dream car for your vacation!
                            </p>
                            {/*{authState?.isAuthenticated ?
                                <Link type='button' className='btn main-color btn-lg text-white'
                                to='search'>Explore top cars </Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }*/}
                            {localStorage.getItem("authState") === "0" &&
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }
                            {localStorage.getItem("authState") !== "0" &&
                                <Link className='btn main-color btn-lg text-white' to='/search'>Search Cars</Link>
                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our fleet is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our fleet is always growing!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}