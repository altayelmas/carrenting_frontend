import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Toast} from "primereact/toast";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const toastTopRight = useRef(null);

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
            showError();
            setUsername("");
            setPassword("");
        } else {
            const responseData = await loginResponse.json();
            console.log(responseData.authToken);
            localStorage.setItem("token", responseData.authToken);
            localStorage.setItem("username", responseData.username);
            localStorage.setItem("roles", responseData.roles)
            handleAuthState();
            navigate('/home');
        }
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

    const showError = () => {
        // @ts-ignore
        toastTopRight.current.show({severity:'error', summary: 'Login Failed', detail:'Invalid credentials', life: 3000});
    }

    return (
        // 'container-fluid py-5 d-flex justify-content-center align-items-center'
        <div className="loginPage-main">
            <Toast ref={toastTopRight} position="top-right" />
            <div className="loginContainer">
                <form action="">
                    <h1>Login</h1>
                    <div className="input-boxes">
                        <div className="loginBox">
                            <label className="text-black" htmlFor="username">Username</label>
                            <input type="text"
                                   value={username}
                                   id="username"
                                   placeholder="Enter your username"
                                   style={{ width:"250px" }}
                                   aria-required={true}
                                   className={"form-control me-2"}
                                   onChange={ev => setUsername(ev.target.value)} required/>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{usernameError}</label>
                        <div className="loginBox">
                            <label className="text-black align-items-center d-flex" htmlFor="password">Password</label>
                            <input
                                value={password}
                                type={"password"}
                                placeholder="Enter your password"
                                style={{ width:"250px" }}
                                onChange={ev => setPassword(ev.target.value)}
                                className={"form-control me-2"}/>
                        </div>
                        <label className="d-flex text-danger justify-content-center mb-3">{passwordError}</label>
                        <div className="d-flex justify-content-center">
                            <input
                                // "btn main-color btn-sml text-white"
                                className="btn text-white loginPage-submit-button"
                                type="button"
                                onClick={onButtonClick}
                                value={"Log in"}/>
                        </div>

                    </div>
                    <div className="sign-up-link">
                        <p>Don't have an account? <Link to="/signup">Sign up!</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;