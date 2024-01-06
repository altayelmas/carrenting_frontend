import React, {useEffect, useRef, useState} from "react";
import {FileUpload} from 'primereact/fileupload';
import {Toast} from "primereact/toast";
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("authState") !== "2") {
            navigate('/home');
        }
    }, []);

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
        setLicencePlateError("")
        setBrandError("")
        setCarModelError("")
        setTypeError("")
        setEngineError("")
        setGearError("")
        setSeatsError("")
        setPriceError("")
        
        if (licencePlate === "") {
            setLicencePlateError("Please enter Licence Plate");
            return
        }
        if (brandSelection === "") {
            setBrandError("Please select a Car Brand");
            return
        }
        if (typeSelection === "") {
            setTypeError("Please select a Car Type");
            return
        }
        if (carModel === "") {
            setCarModelError("Please enter a Car Model");
            return
        }
        if (gearSelection === "") {
            setGearError("Please select a Gear Type");
            return
        }
        if (engineSelection === "") {
            setEngineError("Please select an Engine Type");
            return
        }
        if (price === "" || +price <= 0) {
            setPriceError("Please enter a valid Price");
            return
        }
        if (seats === "" || +seats <= 1) {
            setSeatsError("Please enter a valid Number of Seats");
            return
        }
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
                "price": +price,
                "seats": +seats,
                "img": `${image}`
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        };
        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        if (!response.ok) {
            console.log('An error has occurred');
            showError(responseJson.message);
        } else {
            showSuccess("Operation successful")
            setLicencePlate("")
            setBrandSelection("")
            setCarModel("")
            setTypeSelection("")
            setEngineSelection("")
            setGearSelection("")
            setSeats("")
            setPrice("")
        }
    }

    const showError = (message: string) => {
        // @ts-ignore
        toastTopRight.current.show({severity: 'error', summary: 'Operation Failed', detail: message, life: 3000});
    }

    const showSuccess = (message: string) => {
        // @ts-ignore
        toastTopRight.current.show({severity: 'success', summary: 'Operation Successful', detail: message, life: 3000});
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
                                <option value="Placeholder1">Placeholder 1</option>
                                <option value="Placeholder2">Placeholder 2</option>
                                <option value="Placeholder3">Placeholder 3</option>
                            </select>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{engineError}</label>
                        <div className="loginBox">
                            <label className="text-black" htmlFor="price">Price</label>
                            <input type="number" name="price"
                                   min="1"
                                   id="price"
                                   value={price}
                                   style={{width: "300px"}}
                                   onChange={ev => setPrice(ev.target.value)}
                                   placeholder="Enter Daily Price" required pattern="^[0-9]+$"/>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{priceError}</label>
                        <div className="loginBox">
                            <label className="text-black" htmlFor="seats">Number of seats</label>
                            <input type="number"
                                   min="1"
                                   name="seats"
                                   id="seats"
                                   value={seats}
                                   style={{width: "300px"}}
                                   onChange={ev => setSeats(ev.target.value)}
                                   placeholder="Enter Number of Seats" required pattern="^[0-9]+$"/>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{seatsError}</label>
                        <div className="loginBox">
                            <label className="text-black" htmlFor="image">Image</label>
                            <FileUpload maxFileSize={1000000}
                                        mode="basic"
                                        name="demo[]"
                                        accept="image/*"
                                        customUpload onSelect={customBase64Uploader}/>
                        </div>
                    </div>
                </form>
                <div className="loginBox">
                    <div className="d-flex justify-content-center">
                        <button className="btn main-color text-white submit-button"
                                onClick={onButtonClick}
                                style={{ width:"100px" }}
                                type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}