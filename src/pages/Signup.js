import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

import React, { setState, useEffect, useState, formData } from "react"

const errors_to_message = {
    email: {
        "not email": "Введённое значение не является адресом электронной почты",
        "required": "Поле электронной почты должно быть заполнено",
        "not unique": "Поле электронной почты должно быть уникально",
    },
    username: {
        "required": "Поле имени пользователя должно быть заполнено",
        "not unique": "Поле имени пользователя должно быть уникально",
        "minlength": "Имя пользователя слишком короткое",
        "maxlength": "Имя пользователя слишком длинное",
        "illegal symbols": "Имя пользователя должно состоять только из строчных букв латинского алфавита, цифр и знака подчёркивания, а также не начинаться с цифры",
    },
    password: {
        "required": "Поле пароля должно быть заполнено",
        "minlength": "Пароль слишком короткий",
        "illegal symbols": "Пароль содержит недопустимые символы",
    }
}

export default function Signup() {

    const [inputMail, setInputMail] = useState("");
    const [inputLogin, setInputLogin] = useState("");
    const [inputPass, setInputPass] = useState("");
    const [inputRepeatPass, setInputRepeatPass] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [users, setUsers] = useState([])

    async function Submit(event) {
        console.log(inputMail + inputLogin + inputPass + inputRepeatPass)
        event.preventDefault()

        event.target.disabled = true

        const response = await fetch("/api/register",
            {
                method: "POST",
                body: JSON.stringify({
                    "username": inputLogin,
                    "email": inputMail,
                    "password": inputPass
                }),
                headers: {
                    'Content-Type': 'application/json',
                }

            })

        setUsernameError("")
        setEmailError("")
        setPasswordError("")

        const resp_json = await response.json()
        if (!response.ok) {
            event.target.disabled = false
            const errors = resp_json.errors
            for (const error of errors) {
                switch (error.key) {
                    case "email":
                        setEmailError(errors_to_message.email[error.kind] || "Какая-то ошибка")
                        break;
                    case "username":
                        setUsernameError(errors_to_message.username[error.kind] || "Какая-то ошибка")
                        break;
                    case "password":
                        setPasswordError(errors_to_message.password[error.kind] || "Какая-то ошибка")
                        break;
                }
            }
            console.log(errors)
        } else {
            window.location.replace("/login")
        }

        //console.log(await jopa.json())
    }


    const mailChange = event => setInputMail(event.target.value);
    const loginChange = event => setInputLogin(event.target.value);
    const passChange = event => setInputPass(event.target.value);
    const repeatPassChange = event => setInputRepeatPass(event.target.value);

    console.log(users)

    return (
        <>
            <Navbar />
            <div
                className="container text-left"
                style={{
                    marginTop: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "20%",
                    minWidth: 300
                }}
            >
                <h1 style={{ marginBottom: 20 }}>Регистрация</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">
                            Электронная почта
                        </label>
                        <input type="email" value={inputMail} className="form-control" id="inputEmail" onChange={mailChange} aria-describedby="emailError" />
                        {emailError != "" && <div id="emailError" className="form-text">
                            {emailError}
                        </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputLogin" className="form-label">
                            Логин
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={inputLogin}
                            onChange={loginChange}
                            id="inputLogin"
                            aria-describedby="usernameError"
                        />
                        {usernameError != "" && <div id="usernameError" className="form-text">
                            {usernameError}
                        </div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">
                            Пароль
                        </label>
                        <input type="password" value={inputPass} onChange={passChange} className="form-control" id="inputPassword" aria-describedby="passwordError" />
                        {passwordError != "" && <div id="passwordError" className="form-text">
                            {passwordError}
                        </div>}
                    </div>
                    {/* <div className="mb-3">
                    <label htmlFor="repeatPassword" className="form-label">
                        Повторите пароль
                    </label>
                    <input type="password" value={inputRepeatPass} onChange={repeatPassChange} className="form-control" id="repeatPassword" />
                    </div> */}
                    <button type="submit" id="submit-button" className="btn btn-primary" onClick={Submit}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}