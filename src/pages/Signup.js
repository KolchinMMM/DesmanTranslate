import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

import React, { setState, useEffect, useState, formData } from "react"


export default function Signup(){

    const [inputMail, setInputMail] = useState("");
    const [inputLogin, setInputLogin] = useState("");
    const [inputPass, setInputPass] = useState("");
    const [inputRepeatPass, setInputRepeatPass] = useState("");

    const [users, setUsers] = useState([])

	// const fetchUserData = () => {
    //     const vals = {
    //         "username": "jopaaa",
    //         "email": "maaaail@gmail.com",
    //         "password": "oooooblyaaa"
    //     }


    //     fetch("http://127.0.0.1:3000/api/projects",
    //         {
    //             method: "get",
    //             data: vals
    //         })
    //     // axios.post("http://127.0.0.1:3000/api/register", vals)
    //     //     .then(response => {
    //     //     return response.json()
    //     //     })
    //     //     .then(data => {
    //     //     setUsers(data)
    //     //     })
	// }

    async function Submit(event) {
        console.log(inputMail+inputLogin+inputPass+inputRepeatPass)
        event.preventDefault()
        const jopa = await fetch("/api/register",
        {
            method:"POST",
            body: JSON.stringify({
                "username": inputLogin,
                "email": inputMail,
                "password": inputPass
             }),
             headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            
        }).then(function(response)
        {
         if(response.status!==200)
          {
             throw new Error(response.status)
          }
        }).catch(
            function(error){
                console.log("Во мудак")
            }
        )
        //console.log(await jopa.json())
    }
    

    const mailChange = event => setInputMail(event.target.value);
    const loginChange = event => setInputLogin(event.target.value);
    const passChange = event => setInputPass(event.target.value);
    const repeatPassChange = event => setInputRepeatPass(event.target.value);

	console.log(users)

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
                <h1 style={{ marginBottom: 20 }}>Регистрация</h1>
                <form>
                    <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                        Электронная почта
                    </label>
                    <input type="email" value={inputMail} className="form-control" id="inputEmail" onChange={mailChange} />
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
                        aria-describedby="loginDesc"
                    />
                    <div id="loginDesc" className="form-text">
                        Ваш хэндл длжен быть уникальным.
                    </div>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">
                        Пароль
                    </label>
                    <input type="password" value={inputPass} onChange={passChange} className="form-control" id="inputPassword" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="repeatPassword" className="form-label">
                        Повторите пароль
                    </label>
                    <input type="password" value={inputRepeatPass} onChange={repeatPassChange} className="form-control" id="repeatPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={Submit}>
                    Зарегистрироваться
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    );
}