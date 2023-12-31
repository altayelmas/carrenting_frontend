import React from 'react'
import { Link } from 'react-router-dom';
import car from "../../../models/Car";
import Car from "../../../models/Car";

export const ReturnCar: React.FC<{car: Car}> = (props) => {
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                {props.car.img ?
                    <img
                        src={props.car.img}
                        width='300'
                        height='155'
                        alt="car"
                    />
                    :
                    <img
                        src={require('./../../../Images/CarImages/mercedesg.png')}
                        width='300'
                        height='155'
                        alt="car"
                    />
                }
                <h6 className='mt-2'>{props.car.carBrand}</h6>
                <p>{props.car.carModel}</p>
                <Link className='btn main-color text-white' to={`/reservation/${props.car.licencePlate}`}>
                    Reserve
                </Link>
            </div>

        </div>
    );
}