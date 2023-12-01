import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();

    const [inputMail, setInputMail] = useState("");
    const [inputPass, setInputPass] = useState("");

    const mailChange = event => setInputMail(event.target.value);

    const passChange = event => setInputPass(event.target.value);

    const [errorVisibility, setErrorVisibility] = useState(false);

    function toggle() {
        setErrorVisibility((errorVisibility) => "true");
      }

    async function Submit(event){
        event.preventDefault()
        console.log(JSON.stringify({
            "username": inputMail,
            "password": inputPass
         }))
        let jopa = await fetch("/api/login",
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
            
        }).then( response => {
            if (!response.ok) { 
                console.log("Huevo poluchilos'")
                toggle()
            }
            else return response.json()
        }).then( data=>{
            if (typeof(data)!="undefined"){
                console.log(typeof(data))
                localStorage.setItem("user", JSON.stringify(data))
                console.log(data)
                navigate("../")
            }
        })




        
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
                    {errorVisibility && <div id="error">Насрал говном!!!</div>}
                    <button type="submit" className="btn btn-primary" onClick={Submit}>
                    Войти
                    </button>
                </form>
                </div>
            <Footer/>
        </>
    );
}