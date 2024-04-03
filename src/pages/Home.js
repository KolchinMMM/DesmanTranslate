import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import placeholder from "../images/placeholder.png"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../AuthContext";
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

import api_link from "../App"
import { fetchProjects, fetchUser } from "../APIController"

function Home() {

    const { user } = useContext(AuthContext);

    const [recentProjects, setRecentProjects] = useState([]);

    const [popularProjects, setPopularProjects] = useState([]);

    async function GetRecentProjects() {
        if (!user)
            return

        try {
            let projects = (await fetchUser(user.id, true)).projects
            projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            setRecentProjects(projects)
        } catch (err) {
            console.log(err)
        }
    }


    async function GetPopularProjects() {
        try {
            let projects = await fetchProjects(4)
            projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            setPopularProjects(projects)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        GetRecentProjects();
    }, [user]);

    useEffect(() => {
        GetPopularProjects();
    }, []);


    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/create';
        navigate(path);
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: 50 }}>
                <div className="row">
                    <div className="col-6 text-left" style={{ paddingRight: "5%" }}>
                        <h2>Недавние проекты:</h2>
                        {recentProjects.map((project, i) =>
                            <div className="container text-left" style={{ paddingBottom: 10 }} key={project.id}>
                                <div
                                    className="row border rounded py-3 align-items-center"
                                    style={{ marginTop: 5 }}
                                >
                                    <div className="col-2">
                                        <img
                                            width={60}
                                            height={60}
                                            src={placeholder}
                                            alt="thumbnail"
                                            style={{ marginRight: 10 }}
                                        />
                                    </div>
                                    <div className="col text-left">

                                        <Link to={"/projects/" + project.handle} className="link-primary">
                                            {project.name}
                                        </Link>
                                        <br /> Полезная информация
                                    </div>
                                </div>
                            </div>
                        )}

                        <h2 style={{ marginTop: 20 }}>Популярные проекты:</h2>
                        {popularProjects.map((project, i) =>
                            <div className="container text-left" style={{ paddingBottom: 10 }} key={project.id}>
                                <div
                                    className="row border rounded py-3 align-items-center"
                                    style={{ marginTop: 5 }}
                                >
                                    <div className="col-2">
                                        <img
                                            width={60}
                                            height={60}
                                            src={placeholder}
                                            alt="thumbnail"
                                            style={{ marginRight: 10 }}
                                        />
                                    </div>
                                    <div className="col text-left">

                                        <Link to={"/projects/" + project.handle} className="link-primary">
                                            {project.name}
                                        </Link>
                                        <br /> Полезная информация
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                    <div
                        className="col border-top border-start rounded py-3"
                        style={{ marginTop: 5, paddingLeft: 20 }}
                    >
                        <h5 className="py-2 border-bottom" style={{ marginTop: "-10px" }}>
                            Что такое Desman Translate?
                        </h5>
                        <p>
                            Добро пожаловать в веб-сервис для коллективных переводов! Desman
                            Translate предназначен для совместных переводов книг, программ,
                            субтитров и всего на свете, что имеет форму текста.
                        </p>
                        <h5 className="py-2 border-bottom" style={{ marginTop: "-10px" }}>
                            Как это работает?
                        </h5>
                        <p>
                            Когда вы загружаете текст для работы, он разбивается на небольшие
                            отрывки: строки, абзацы, отдельные субтитры — вы можете выбрать способ
                            самостоятельно. Каждый пользователь может предложить свой вариант
                            перевода для отрывка, а лучший вариант определяется голосованием.
                        </p>
                        <p>
                            Присоединяйтесь к командам переводчиков, создавайте собственные проекты,
                            приглашайте других пользователей присоединиться, переводите книги,
                            программы и субтитры, оттачивайте свои навыки и создавайте лучший
                            перевод любого текста.
                        </p>
                        <p>Have a lot of fun...</p>
                        <Button variant="primary"
                            style={{ marginTop: "-10px" }}
                            onClick={routeChange}
                        >
                            Создать проект
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;