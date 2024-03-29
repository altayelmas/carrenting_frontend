import Car from "../../models/Car";
import {Link, useNavigate} from "react-router-dom";
import React, {FC, useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";

export const ReservationBox: React.FC<{
    car: Car | undefined,
    mobile: boolean,
    numberOfDays: number,
    dates: Date[]
}> = (props) => {
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [daysError, setDaysError] = useState("");
    const toastMiddle = useRef(null);
    const toastTopRight = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        let roles = localStorage.getItem("roles");
        let token = localStorage.getItem("token");
        if (roles && token) {
            setSignedIn(true);
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        setTotalPrice(props.car?.price * props.numberOfDays);
    }, [props.numberOfDays]);

    const onButtonClick = () => {
        if (props.numberOfDays === 0) {
            setDaysError("Please select a valid time interval for the reservation");
        } else {
            setDaysError("");
            reserve();
        }
    }

    const showError = (message: string) => {
        // @ts-ignore
        toastTopRight.current.show({severity: 'error', summary: 'Operation Failed', detail: message, life: 3000});
    }

    const showSuccess = (message: string) => {
        // @ts-ignore
        toastMiddle.current.show({severity: 'success', summary: 'Operation Successful', detail: message, life: 3000});
    }

    const reserve = async () => {
        const url = "http://localhost:8080/reservation/createReservation";
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                "beginDate": props.dates[0],
                "endDate": props.dates[1],
                "licencePlate": `${props.car?.licencePlate}`,
                "username": `${localStorage.getItem("username")}`,
                "price": totalPrice
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
        const response = await fetch(url, requestOptions);
        const responseData = await response.json();
        if (!response.ok) {
            showError(responseData.message)
            console.log('An error has occured');
        } else {
            showSuccess("")
            console.log(responseData);
        }
    }
    const onRemove = () => {
        navigate("/myReservations");
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <Toast ref={toastMiddle} position="center" onRemove={onRemove}/>
            <Toast ref={toastTopRight} position="top-right"/>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>Reservation Summary </b>
                    </p>
                    <hr/>
                    {props.car && props.car.isAvailable ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        :
                        <h4 className='text-danger'>
                            Unavailable
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.car?.isAvailable}</b>
                            {props.numberOfDays} Days x {props.car?.price} €
                        </p>
                        <p className='col-6 lead'>
                            <b>{totalPrice} €</b>
                        </p>
                    </div>
                </div>
                {!signedIn && props.car?.isAvailable &&
                    <Link to='/login' className='btn btn-success btn-lg'>Sign In</Link>}
                {signedIn && props.car?.isAvailable && localStorage.getItem("authState") !== "2" &&
                    <button className='btn btn-success btn-lg' onClick={onButtonClick}>Reservation</button>}
                <hr/>
                {props.car?.isAvailable &&
                    <p className='mt-3'>
                        This number can change until reservation has been complete.
                    </p>}

                {!props.car?.isAvailable &&
                    <p className='mt-3'>
                        This car is currently not available for renting.
                    </p>
                }

                {!signedIn && props.car?.isAvailable &&
                    <p>
                        Sign in to be able to rent the car.
                    </p>
                }
                {signedIn &&
                    <p className='text-danger'>
                        {daysError}
                    </p>}
            </div>
        </div>
    );
}