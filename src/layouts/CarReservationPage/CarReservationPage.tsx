import {useEffect, useState} from "react";
import Car from "../../models/Car";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {ReservationBox} from "./ReservationBox";
import { Calendar } from 'primereact/calendar';
export const CarReservationPage = () => {

    const [car, setCar] = useState<Car>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    /*const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());*/
    const [dates, setDates] = useState<Date[]>([]);
    const [numberOfDays, setNumberOfDays] = useState<number>(0);

    const licencePlate = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchCar = async () => {
            const baseUrl: string = `http://localhost:8080/vehicle/get/${licencePlate}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson.vehicleDtoList[0];

            const loadedCar: Car = {
                licencePlate: responseData.licencePlate,
                carType: responseData.carType,
                carBrand: responseData.carBrand,
                carModel: responseData.carModel,
                gearType: responseData.gearType,
                price: responseData.price,
                seats: responseData.seats,
                img: responseData.img,
                isAvailable: responseData.available,
            };

            setCar(loadedCar);
            setIsLoading(false);
        }
        fetchCar().catch((error: any) => {
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

    const onDatesChange = (e: any) => {
        console.log(e);
        dates[0] = e.value[0]
        dates[1] = e.value[1]
        //dates.push();//dates.push(e.value);
        //let newDates = [...dates]
        setDates(e.value);
        //setDates(newDates);
        console.log(dates);
        /*setDates(dates => [...dates, e.value]);
        console.log(dates);*/
        calculateNumberOfDays();

    }

    const calculateNumberOfDays = () => {
        if (dates.length === 2 && dates[0] && dates[1] && dates[0].getTime() !== dates[1].getTime()) {
            setNumberOfDays((dates[1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24));
        } else {
            setNumberOfDays(0);
        }
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-3 col-md-3'>
                        {car?.img ?
                            <img src={car?.img} width='300' height='155' alt='Car'/>
                            :
                            <img src={require('./../../Images/CarImages/mercedesg.png')} width='300'
                                 height='155' alt='Car'/>
                        }
                        <div className='ml-2'>
                            <h2>{car?.carBrand} {car?.carModel}</h2>
                            <h5 className='text-primary'>{car?.carType}</h5>
                            <p className='lead'>{car?.gearType} - {car?.seats} Seats</p>
                        </div>
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <Calendar id="range"
                                  inline
                                  value={dates}
                                  onChange={(e) => onDatesChange(e)}
                            /*onChange={(e) => onDatesChange(e)}*/
                                  selectionMode="range"
                        />
                    </div>
                    <ReservationBox car={car} mobile={false} numberOfDays={numberOfDays} dates={dates}/>
                </div>
                <hr/>
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {car?.img ?
                        <img src={car?.img} width='300' height='155' alt='Car'/>
                        :
                        <img src={require('./../../Images/CarImages/mercedesg.png')} width='300'
                             height='155' alt='Car'/>
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{car?.carBrand} {car?.carModel}</h2>
                        <h5 className='text-primary'>{car?.carType}</h5>
                        <p className='lead'>{car?.gearType} - {car?.seats} Seats</p>
                    </div>
                </div>
                <ReservationBox car={car} mobile={true} numberOfDays={numberOfDays} dates={dates}/>
                <hr/>
            </div>
        </div>

    );
}