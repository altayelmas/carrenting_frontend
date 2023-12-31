import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ConfirmationBox} from "./components/ConfirmationBox";

export const SignUp = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [postCode, setPostCode] = useState("")
    const [email, setEmail] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [countryError, setCountryError] = useState("")
    const [cityError, setCityError] = useState("")
    const [streetError, setStreetError] = useState("")
    const [postCodeError, setPostCodeError] = useState("")
    const [emailError, setEmailError] = useState("")
    /*const [showConfirmationBox, setShowConfirmationBox] = useState(false);*/

    const signUp = async () => {
        const url = "http://localhost:8080/user/signup";
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                "username": `${username}`,
                "country": `${country}`,
                "city": `${city}`,
                "street": `${street}`,
                "postCode": `${postCode}`,
                "email": `${email}`,
                "password": `${password}`,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        };
        const signUpResponse = await fetch(url, requestOptions);
        if (!signUpResponse.ok) {
            console.log('An error has occured');
        } else {
            setUsername("");
            setPassword("");
            setCity("");
            setCountry("");
            setStreet("");
            setPostCode("");
            setEmail("");
            /*setShowConfirmationBox(true);*/
        }

    }
    const onButtonClick = () => {
        setUsernameError("")
        setPasswordError("")
        setCityError("")
        setCountryError("")
        setStreetError("")
        setPostCodeError("")
        setEmailError("")

        // Check if the user has entered both fields correctly
        if ("" === username) {
            setUsernameError("Please enter your username")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length > 32) {
            setPasswordError("Password can not be longer than 32 characters")
            return
        }

        if ("" === country) {
            setCountryError("Please enter a country")
            return
        }

        if ("" === city) {
            setCityError("Please enter a city")
            return
        }

        if ("" === street) {
            setStreetError("Please enter a street")
            return
        }

        if ("" === postCode) {
            setPostCodeError("Please enter a post code")
            return
        }

        if ("" === email) {
            setEmailError("Please enter an email")
            return
        }

        signUp().then(() => {
            console.log("deneme");
        })
    }

    return (
        <div className='container-fluid py-5 d-flex justify-content-center align-items-center'>
            <form>
                <table className={'justify-content-center align-items-center'}>
                    <tr>
                        <td>Username</td>
                        <td>
                            <input
                                value={username}
                                placeholder="Enter your username"
                                onChange={ev => setUsername(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{usernameError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input
                                value={password}
                                type={"password"}
                                placeholder="Enter your password"
                                onChange={ev => setPassword(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{passwordError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input
                                value={email}
                                type={"email"}
                                placeholder="Enter your email"
                                onChange={ev => setEmail(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{emailError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>
                            <input
                                value={country}
                                type={"country"}
                                placeholder="Enter your country"
                                onChange={ev => setCountry(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{countryError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>
                            <input
                                value={city}
                                type={"city"}
                                placeholder="Enter your city"
                                onChange={ev => setCity(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{cityError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>
                            <input
                                value={street}
                                type={"street"}
                                placeholder="Enter your street"
                                onChange={ev => setStreet(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{streetError}</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Post Code</td>
                        <td>
                            <input
                                value={postCode}
                                type={"postCode"}
                                placeholder="Enter your post code"
                                onChange={ev => setPostCode(ev.target.value)}
                                className={"form-control me-2"}/>
                            <label className="justify-content-right">{postCodeError}</label>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr className={'container-fluid text-white d-flex justify-content-center align-items-center'}>
                        <td>
                            <input
                                className={"btn main-color btn-sml text-white"}
                                type="button"
                                onClick={onButtonClick}
                                value={"Sign up"}/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}
export default SignUp;