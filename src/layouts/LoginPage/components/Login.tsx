import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const navigate = useNavigate();

    const handleAuthState = () => {
        if (localStorage.getItem("token") && localStorage.getItem("roles") !== null) {
            // @ts-ignore
            let roles_array = localStorage.getItem("roles").split(',');
            if (roles_array.length === 2 && (roles_array[0] === 'ADMIN' || roles_array[1] === 'ADMIN')) {
                localStorage.setItem("authState", "2");

            } else if (roles_array.length === 1 && (roles_array[0] === 'ADMIN')) {
                localStorage.setItem("authState", "2");

            } else if (roles_array.length === 1 && (roles_array[0] === 'USER')) {
                localStorage.setItem("authState", "1");
            }
        }
    }

    const login = async () => {
        const url = "http://localhost:8080/user/login";
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                "username": `${username}`,
                "password": `${password}`,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        };
        const loginResponse = await fetch(url, requestOptions);
        if (!loginResponse.ok) {
            console.log('Invalid credentials');
        }
        const responseData = await loginResponse.json();
        console.log(responseData.authToken);
        localStorage.setItem("token", responseData.authToken);
        localStorage.setItem("username", responseData.username);
        localStorage.setItem("roles",responseData.roles)
        handleAuthState();
        navigate('/home');
        // navıgate to /home page -> use same token for each request
    }

    const onButtonClick = () => {
        setUsernameError("")
        setPasswordError("")

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
        login().then(() => {
            console.log("deneme");
        })
    }

    return (
        <div className='container-fluid py-5 d-flex justify-content-center align-items-center'>
           {/* <div className='align-items-center'>
                <div className={"titleContainer"}>
                    <div>Login</div>
                </div>
                <br/>
                <div className={"inputContainer"}>
                    <input
                        value={username}
                        placeholder="Enter your username here"
                        onChange={ev => setUsername(ev.target.value)}
                        className={"inputBox"}/>
                    <label className="errorLabel">{usernameError}</label>
                </div>
                <br/>
                <div className={"inputContainer"}>
                    <input
                        value={password}
                        type={"password"}
                        placeholder="Enter your password here"
                        onChange={ev => setPassword(ev.target.value)}
                        className={"inputBox"}/>
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br/>
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        value={"Log in"}/>
                </div>
            </div>*/}

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
                        <br/>
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
                        <td>
                            <br/>
                        </td>
                    </tr>
                    <tr className={'container-fluid text-white d-flex justify-content-center align-items-center'}>
                        <td>
                            <input
                                className={"btn main-color btn-sml text-white"}
                                type="button"
                                onClick={onButtonClick}
                                value={"Log in"}/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default Login;