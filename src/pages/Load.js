import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Load(){
    // const navigate = useNavigate();

    // const [inputMail, setInputMail] = useState("");
    // const [inputPass, setInputPass] = useState("");

    // const mailChange = event => setInputMail(event.target.value);

    // const passChange = event => setInputPass(event.target.value);

    // const [errorVisibility, setErrorVisibility] = useState(false);

    // function toggle() {
    //     setErrorVisibility((errorVisibility) => "true");
    //   }

    // async function Submit(event){
    //     event.preventDefault()
    //     console.log(JSON.stringify({
    //         "username": inputMail,
    //         "password": inputPass
    //      }))
    //     let jopa = await fetch("/api/login",
    //     {
    //         method:"POST",
    //         body: JSON.stringify({
    //             "username": inputMail,
    //             "password": inputPass
    //          }),
    //          headers: {
    //             'Content-Type': 'application/json; charset=UTF-8',
    //         },
    //         credentials:"include",
            
    //     }).then( response => {
    //         if (!response.ok) { 
    //             toggle()
    //         }
    //         else return response.json()
    //     }).then( data=>{
    //         if (typeof(data)!="undefined"){
    //             console.log(typeof(data))
    //             localStorage.setItem("user", JSON.stringify(data))
    //             console.log(data)
    //             navigate("../")
    //             window.location.reload(false);
    //         }
    //     })
    // }

    


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
                <h1 style={{ marginBottom: 20 }}>Загрузить раздел</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="inputChapterName" className="form-label">
                            Название раздела
                        </Form.Label>
                        <Form.Control id="inputChapterName"/> {/*onChange={mailChange}*/}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="inputChapterFile" className="form-label">
                            Загрузить файл
                        </Form.Label>
                        <Form.Control
                            type="password"
                            id="inputChapterFile"
                            aria-describedby="forgotPassword"
                        />
                        {/*onChange={passChange}*/}
                    </Form.Group>
                    {/* {errorVisibility && <div id="error" style={{margin: "5px 0px"}}>Неверный логин или пароль.</div>} */}
                    <Button type="submit" variant="primary"> {/*onClick={Submit}*/}
                    Загрузить
                    </Button>
                </Form>
                </div>
            <Footer/>
        </>
    );
}