import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import placeholder from "../images/placeholder.png";

function Projects(){
    return (
        <>
            <Navbar/>
            <div className="container" style={{ marginTop: 50 }}>
                {/* вкладочки */}
                <Tabs
                defaultActiveKey="my-projects"
                id="projects-tabs"
                className="mb-3"
                >
                <Tab eventKey="my-projects" title="Мои проекты">
                    <div className="row">
                        <div className="col-6">
                        <h2 style={{ marginBottom: 20 }}>Мои проекты</h2>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginTop: 0, marginBottom: 5 }}
                            onclick="location.href = 'newproject.html';"
                        >
                            Создать проект
                        </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        <div className="container text-left" style={{ paddingBottom: 10 }}>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="project_id.html">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Ваша роль в проекте
                            </div>
                            </div>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="#">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Ваша роль в проекте
                            </div>
                            </div>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="#">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Ваша роль в проекте
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="container text-left" style={{ paddingBottom: 10 }}>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="project_id.html">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Ваша роль в проекте
                            </div>
                            </div>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="#">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Ваша роль в проекте
                            </div>
                            </div>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="#">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Ваша роль в проекте
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey="invitations" title="Приглашения">
                    <h2 style={{ marginBottom: 20 }}>Приглашения</h2>
                    <div className="row">
                        <div className="col-6">
                        <div className="container text-left" style={{ paddingBottom: 10 }}>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="#">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Вы были приглашены пользователем{" "}
                                <a className="text-primary" href="#">
                                Ipaingo
                                </a>
                                .
                            </div>
                            <div className="col-auto">
                                <button
                                type="button"
                                className="btn btn-success"
                                style={{
                                    padding: 5,
                                    margin: 2,
                                    marginLeft: 0,
                                    width: "100%"
                                }}
                                >
                                Принять
                                </button>
                                <br />
                                <button
                                type="button"
                                className="btn btn-danger"
                                style={{
                                    padding: 5,
                                    margin: 2,
                                    marginLeft: 0,
                                    width: "100%"
                                }}
                                >
                                Отклонить
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="container text-left" style={{ paddingBottom: 10 }}>
                            <div
                            className="row border rounded py-3 align-items-center"
                            style={{ marginTop: 5 }}
                            >
                            <div className="col-auto">
                                <img
                                width={60}
                                height={60}
                                src={placeholder}
                                alt="thumbnail"
                                style={{ marginRight: 10 }}
                                />
                            </div>
                            <div className="col text-left">
                                <a>
                                <b />
                                </a>
                                <b>
                                <a className="text-primary" href="#">
                                    Название проекта
                                </a>
                                </b>{" "}
                                <br /> Вы были приглашены пользователем{" "}
                                <a className="text-primary" href="#">
                                Neprim
                                </a>
                                .
                            </div>
                            <div className="col-auto">
                                <button
                                type="button"
                                className="btn btn-success"
                                style={{
                                    padding: 5,
                                    margin: 2,
                                    marginLeft: 0,
                                    width: "100%"
                                }}
                                >
                                Принять
                                </button>
                                <br />
                                <button
                                type="button"
                                className="btn btn-danger"
                                style={{
                                    padding: 5,
                                    margin: 2,
                                    marginLeft: 0,
                                    width: "100%"
                                }}
                                >
                                Отклонить
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </Tab>
                </Tabs>
                </div>
                <Footer/>
        </>
    );
}

export default Projects;