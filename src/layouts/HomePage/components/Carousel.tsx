import {ReturnCar} from "./ReturnCar";
import {useEffect, useState} from "react";
import Car from "../../../models/Car";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Link} from "react-router-dom";

export const Carousel = () => {

    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [amountOfCars, setAmountOfCars] = useState(0);

    useEffect(() => {
        const fetchCars = async () => {
            const baseUrl: string = "http://localhost:8080/vehicle/getAllAvailableCars";

            const url: string = `${baseUrl}?page=0&size=9&carBrand=&carModel=`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson.vehicleDtoList;
            setAmountOfCars(responseJson.vehicleAmount);

            const loadedCars: Car[] = [];

            for (const key in responseData) {
                loadedCars.push({
                    licencePlate: responseData[key].licencePlate,
                    carType: responseData[key].carType,
                    carBrand: responseData[key].carBrand,
                    carModel: responseData[key].carModel,
                    gearType: responseData[key].gearType,
                    price: responseData[key].price,
                    seats: responseData[key].seats,
                    img: responseData[key].img,
                    isAvailable: responseData[key].available,
                })
            }

            setCars(loadedCars);
            setIsLoading(false);
        }
        fetchCars().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='container mt-5' style={{height: 550}}>
            <div className='homepage-carousel-title'>
                <h3>Find your next car for your vacation!</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5
            d-none d-lg-block' data-bs-interval='false'>

                {amountOfCars > 0 &&
                    <div>
                        {/* Desktop */}
                        <div className='carousel-inner'>
                            <div className='carousel-item active'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {cars.slice(0, 3).map(car => (
                                        <ReturnCar car={car} key={car.licencePlate}/>
                                    ))}

                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {cars.slice(3, 6).map(car => (
                                        <ReturnCar car={car} key={car.licencePlate}/>
                                    ))}

                                </div>
                            </div>
                            <div className='carousel-item'>
                                <div className='row d-flex justify-content-center align-items-center'>
                                    {cars.slice(6, 9).map(car => (
                                        <ReturnCar car={car} key={car.licencePlate}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                    <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                    <span className='carousel-control-next-icon' aria-hidden='true'></span>
                    <span className='visually-hidden'>Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                {amountOfCars > 0 &&
                    <div>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <ReturnCar car={cars[0]} key={cars[0].licencePlate}/>
                        </div>
                    </div>
                }
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
}