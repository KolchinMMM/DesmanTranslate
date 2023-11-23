import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Signup(){
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
                    <input type="email" className="form-control" id="inputEmail" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="inputLogin" className="form-label">
                        Логин
                    </label>
                    <input
                        type="text"
                        className="form-control"
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
                    <input type="password" className="form-control" id="inputPassword" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="repeatPassword" className="form-label">
                        Повторите пароль
                    </label>
                    <input type="password" className="form-control" id="repeatPassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                    Зарегистрироваться
                    </button>
                </form>
            </div>
            <Footer/>
        </>
    );
}

export default Signup;