import React, {useRef, useState} from "react";
import {FileUpload} from 'primereact/fileupload';
import {Toast} from "primereact/toast";

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
    const [brandError, setBrandError] = useState("");
    const [typeSelection, setTypeSelection] = useState("");
    const [typeError, setTypeError] = useState("");
    const [gearSelection, setGearSelection] = useState("");
    const [gearError, setGearError] = useState("");
    const [engineSelection, setEngineSelection] = useState("");
    const [engineError, setEngineError] = useState("");
    const [image, setImage] = useState<string | ArrayBuffer | null>();

    const toastTopRight = useRef(null);
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

    const showError = (message: string) => {
        // @ts-ignore
        toastTopRight.current.show({severity: 'error', summary: 'Signup Failed', detail: message, life: 3000});
    }

    const showSuccess = (message: string) => {
        // @ts-ignore
        toastTopRight.current.show({severity: 'success', summary: 'Signup Successful', detail: message, life: 3000});
    }

    return (
        <div className='signupPage-main'>
            <Toast ref={toastTopRight} position="top-right"/>
            <div className='loginContainer'>
                <form action="">
                    <h1>Create Car</h1>
                    <div className="input-boxes">
                        <div className="loginBox">
                            <label className="text-black" htmlFor="licence-plate">Licence Plate</label>
                            <input type="text" name="licenceplate"
                                   id="licence-plate"
                                   value={licencePlate}
                                   style={{width: "300px"}}
                                   onChange={ev => setLicencePlate(ev.target.value)}
                                   className={"form-control me-2"}
                                   placeholder="Enter Licence Plate" required/>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{licencePlateError}</label>
                        <div className="select-container">
                            <label className="text-black" htmlFor="brand">Car Brand</label>
                            <select className="select-box btn main-color btn-secondary dropdown-toggle" name="car-brand"
                                    id="brand"
                                    style={{width: "300px"}}
                                    onChange={ev => setBrandSelection(ev.target.value)}
                                    value={brandSelection} required>
                                <option value="" defaultValue={""}>Select Car Brand</option>
                                <option value="Mercedes">Mercedes-Benz</option>
                                <option value="Volkswagen">Volkswagen</option>
                                <option value="Peugeot">Peugeot</option>
                                <option value="Audi">Audi</option>
                                <option value="Renault">Renault</option>
                            </select>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{brandError}</label>
                        <div className="select-container">
                            <label className="text-black" htmlFor="car-type">Car Type</label>
                            <select className="select-box  btn main-color btn-secondary dropdown-toggle" name="car-type" id="car-type"
                                    style={{width: "300px"}}
                                    onChange={ev => setTypeSelection(ev.target.value)}
                                    value={typeSelection} required>
                                <option value="" defaultValue={""}>Select Car Type</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="SUV">SUV</option>
                                <option value="Truck">Truck</option>
                            </select>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{typeError}</label>
                        <div className="loginBox">
                            <label className="text-black" htmlFor="model">Car Model</label>
                            <input type="text" name="car-model" id="model" value={carModel}
                                   style={{width: "300px"}}
                                   onChange={ev => setCarModel(ev.target.value)}
                                   placeholder="Enter Car Model" required/>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{carModelError}</label>
                        <div className="select-container">
                            <label className="text-black" htmlFor="gear-type">Gear Type</label>
                            <select className="select-box  btn main-color btn-secondary dropdown-toggle" name="gear-type" id="gear-type"
                                    style={{width: "300px"}}
                                    onChange={ev => setGearSelection(ev.target.value)}
                                    value={gearSelection} required>
                                <option value="" defaultValue={""}>Select Gear Type</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{gearError}</label>
                        <div className="select-container">
                            <label className="text-black" htmlFor="engine-type">Engine Type</label>
                            <select className="select-box  btn main-color btn-secondary dropdown-toggle" name="gear-type" id="gear-type"
                                    style={{width: "300px"}}
                                    onChange={ev => setEngineSelection(ev.target.value)}
                                    value={engineSelection} required>
                                <option value="" defaultValue={""}>Select Engine Type</option>
                                <option value="Placeholder 1">Placeholder 1</option>
                                <option value="Placeholder 2">Placeholder 2</option>
                                <option value="Placeholder 3">Placeholder 3</option>
                            </select>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{engineError}</label>
                    </div>
                </form>
            </div>
        </div>
    );
    // className='container-fluid py-5 d-flex justify-content-center align-items-center'

    {/*<form>
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
            </form>*/
    }

}