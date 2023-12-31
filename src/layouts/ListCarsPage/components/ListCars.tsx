import Car from "../../../models/Car";

export const ListCars: React.FC<{ car: Car }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.car.img ?
                            <img src={props.car.img}
                                 width='196'
                                 height='123'
                                 alt='Car'
                            />
                            :
                            <img src={require('../../../Images/CarImages/mercedesg.png')}
                                 width='196'
                                 height='123'
                                 alt='Car'
                            />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center
                        align-items-center'>
                        {props.car.img ?
                            <img src={props.car.img}
                                 width='196'
                                 height='123'
                                 alt='Car'
                            />
                            :
                            <img src={require('../../../Images/CarImages/mercedesg.png')}
                                 width='196'
                                 height='123'
                                 alt='Car'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.car.carBrand} {props.car.carModel} - {props.car.licencePlate}
                        </h5>
                        <h4>
                            {props.car.carType}
                        </h4>
                        <p className='card-text'>
                            {props.car.gearType} - {props.car.seats} Seats
                        </p>
                        {props.car && props.car.isAvailable ?
                            <h4 className='text-success'>
                                Available
                            </h4>
                            :
                            <h4 className='text-danger'>
                                Unavailable
                            </h4>
                        }
                    </div>
                </div>
                {/*<div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <Link className='btn btn-md main-color text-white' to={`/reservation/${props.car.licencePlate}`}>
                        View Details
                    </Link>
                </div>*/}
            </div>
        </div>
    );
}