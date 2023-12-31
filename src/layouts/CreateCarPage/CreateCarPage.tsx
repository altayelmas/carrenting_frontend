import React, {useState} from "react";
import {FileUpload} from 'primereact/fileupload';

export const CreateCarPage = () => {

    const [licencePlate, setLicencePlate] = useState("");
    const [licencePlateError, setLicencePlateError] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carModelError, setCarModelError] = useState("");
    const [seats, setSeats] = useState("");
    const [seatsError, setSeatsError] = useState("");
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState("");

    const [brandSelection, setBrandSelection] = useState("");
    const [typeSelection, setTypeSelection] = useState("");
    const [gearSelection, setGearSelection] = useState("");
    const [engineSelection, setEngineSelection] = useState("");
    const [image, setImage] = useState<string | ArrayBuffer | null>();
    const customBase64Uploader = async (event: any) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then(r => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            //console.log(base64data);
            setImage(base64data && base64data.toString());
            console.log(base64data && base64data.toString());
        }
    }

    const onButtonClick = () => {
        createCar();
    }

    const createCar = async () => {
        const url = "http://localhost:8080/vehicle/create";
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                "licencePlate": `${licencePlate}`,
                "carType": `${typeSelection}`,
                "gearType": `${gearSelection}`,
                "carBrand": `${brandSelection}`,
                "carModel": `${carModel}`,
                "engine": `${engineSelection}`,
                "price": `${price}`,
                "seats": seats,
                "img": `${image}`
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        };
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            console.log('An error has occured');
        }
        const responseData = await response.json();
        console.log(responseData);
    }

    const brandField = (value: string) => {
        if (value === 'Audi' ||
            value === 'Mercedes' ||
            value === 'Peugeot' ||
            value === 'Renault' ||
            value === 'Volkswagen') {
            setBrandSelection(value);
        } else {
            setBrandSelection('');
        }
    }

    const typeField = (value: string) => {
        if (value === 'Sedan' ||
            value === 'Hatchback' ||
            value === 'SUV' ||
            value === 'Truck') {
            setTypeSelection(value);
        } else {
            setTypeSelection('');
        }
    }

    const gearField = (value: string) => {
        if (value === 'Automatic' ||
            value === 'Manual') {
            setGearSelection(value);
        } else {
            setGearSelection('');
        }
    }

    const engineField = (value: string) => {
        if (value === 'Placeholder1' ||
            value === 'Placeholder2' ||
            value === 'Placeholder3') {
            setEngineSelection(value);
        } else {
            setEngineSelection('');
        }
    }

    return (
        <div className='container-fluid py-5 d-flex justify-content-center align-items-center'>
            <form>
                <table className={'justify-content-center align-items-center'}>
                    <tbody>
                    <tr>
                        <td>Licence Plate</td>
                        <td>
                            <input
                                value={licencePlate}
                                placeholder="Enter Licence Plate"
                                onChange={ev => setLicencePlate(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{licencePlateError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Car Brand</td>
                        <td>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                        aria-expanded='false'>
                                    {brandSelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => brandField('Audi')}>
                                        <a className='dropdown-item' href='#'>
                                            Audi
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Mercedes')}>
                                        <a className='dropdown-item' href='#'>
                                            Mercedes
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Peugeot')}>
                                        <a className='dropdown-item' href='#'>
                                            Peugeot
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Renault')}>
                                        <a className='dropdown-item' href='#'>
                                            Renault
                                        </a>
                                    </li>
                                    <li onClick={() => brandField('Volkswagen')}>
                                        <a className='dropdown-item' href='#'>
                                            Volkswagen
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Car Type</td>
                        <td>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                        aria-expanded='false'>
                                    {typeSelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => typeField('Sedan')}>
                                        <a className='dropdown-item' href='#'>
                                            Sedan
                                        </a>
                                    </li>
                                    <li onClick={() => typeField('Hatchback')}>
                                        <a className='dropdown-item' href='#'>
                                            Hatchback
                                        </a>
                                    </li>
                                    <li onClick={() => typeField('SUV')}>
                                        <a className='dropdown-item' href='#'>
                                            SUV
                                        </a>
                                    </li>
                                    <li onClick={() => typeField('Truck')}>
                                        <a className='dropdown-item' href='#'>
                                            Truck
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Car Model</td>
                        <td>
                            <input
                                value={carModel}
                                placeholder="Enter Car Model"
                                onChange={ev => setCarModel(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{carModelError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Gear Type</td>
                        <td>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                        aria-expanded='false'>
                                    {gearSelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => gearField('Manual')}>
                                        <a className='dropdown-item' href='#'>
                                            Manual
                                        </a>
                                    </li>
                                    <li onClick={() => gearField('Automatic')}>
                                        <a className='dropdown-item' href='#'>
                                            Automatic
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Engine Type</td>
                        <td>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                        id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                        aria-expanded='false'>
                                    {engineSelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => engineField('Placeholder1')}>
                                        <a className='dropdown-item' href='#'>
                                            Placeholder1
                                        </a>
                                    </li>
                                    <li onClick={() => engineField('Placeholder2')}>
                                        <a className='dropdown-item' href='#'>
                                            Placeholder2
                                        </a>
                                    </li>
                                    <li onClick={() => engineField('Placeholder3')}>
                                        <a className='dropdown-item' href='#'>
                                            Placeholder3
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>
                            <input
                                value={price}
                                placeholder="Enter Daily Price"
                                onChange={ev => setPrice(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{priceError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Seats</td>
                        <td>
                            <input
                                value={seats}
                                placeholder="Enter Number Of Seats"
                                onChange={ev => setSeats(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{seatsError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <FileUpload maxFileSize={1000000}
                                        mode="basic"
                                        name="demo[]"
                                        accept="image/*"
                                        customUpload onSelect={customBase64Uploader}/>
                        </td>
                    </tr>
                    <tr className={'container-fluid text-white d-flex justify-content-center align-items-center'}>
                        <td>
                            <input
                                className={"btn main-color btn-sml text-white"}
                                type="button"
                                onClick={onButtonClick}
                                value={"Create Car"}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>

        </div>


    );
}