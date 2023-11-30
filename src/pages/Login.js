import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useState } from "react"
export default function Login(){

    const [inputMail, setInputMail] = useState("");
    const [inputPass, setInputPass] = useState("");

    const mailChange = event => setInputMail(event.target.value);

    const passChange = event => setInputPass(event.target.value);

    async function Submit(event){
        event.preventDefault()
        console.log(JSON.stringify({
            "username": inputMail,
            "password": inputPass
         }))
        const jopa = await fetch("http://127.0.0.1:3000/api/login",
        {
            method:"POST",
            body: JSON.stringify({
                "username": inputMail,
                "password": inputPass
             }),
             headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            credentials:"include",
            
        })
        console.log(await jopa.json())
    }

    


    return (
        <>
            <Navbar/>
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
                <h1 style={{ marginBottom: 20 }}>Вход</h1>
                <form>
                    <div className="mb-3">
                    <label htmlFor="inputEmailLogin" className="form-label">
                        Электронная почта
                    </label>
                    <input className="form-control" id="inputEmailLogin" onChange={mailChange}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="inputPasswordLogin" className="form-label">
                        Пароль
                    </label>
                    <input
                        onChange={passChange}
                        type="password"
                        className="form-control"
                        id="inputPasswordLogin"
                        aria-describedby="forgotPassword"
                    />
                    <div id="forgotPassword" className="form-text">
                        Забыли пароль?
                    </div>
                    </div>
                    <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberCheck" />
                    <label className="form-check-label" htmlFor="rememberCheck">
                        Запомнить аккаунт
                    </label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={Submit}>
                    Войти
                    </button>
                </form>
                </div>
            <Footer/>
        </>
    );
}