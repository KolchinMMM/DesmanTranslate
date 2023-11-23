import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Login(){
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
                    <input type="email" className="form-control" id="inputEmailLogin" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="inputPasswordLogin" className="form-label">
                        Пароль
                    </label>
                    <input
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
                    <button type="submit" className="btn btn-primary">
                    Войти
                    </button>
                </form>
                </div>
            <Footer/>
        </>
    );
}

export default Login;