import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import placeholder from "../images/placeholder.png"

import React, { useEffect, useState } from "react"

var user = ""
if (localStorage.getItem("user") != null){
  user = JSON.parse(localStorage.getItem("user"))
}

function Projects(){

    const [projects, setProjects] = useState([]);

    const [projects2, setProjects2] = useState([]);

    async function Get_projects(){
		let arr_jsx1 = []
        let arr_jsx2 = []
		let aboba = await fetch("/api/users/"+user["id"])
		.then(response => response.json())
		.then(data => data.projects)

		var count = aboba.length
		var project_elems = []
		aboba.forEach(async elem=>{
			await fetch("/api/projects/"+elem)
				.then(response => response.json())
				.then(data_project => {
					project_elems.push(data_project)
					var c = 0
					if (project_elems.length == count){
						project_elems.forEach(elem => {
						fetch("/api/projects/"+elem.id+"/members/"+user["id"])
							.then(response => response.json())
							.then(data_role => {
								var item = 
                                    <div
                                    className="row border rounded py-3 align-items-center"
                                    style={{ marginTop: 5 }}>
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
                                            <b>
                                                <a className="text-primary" href={"projects/"+elem.handle}>
                                                    {elem.name}
                                                </a>
                                            </b>
                                            <br /> {data_role.role_name}
                                        </div>
                                    </div>
								
                                if (c % 2 == 0)
                                {
                                    arr_jsx1.push(item)
                                }
                                else{
                                    arr_jsx2.push(item)
                                }
								c++
								if (c==count)
								setProjects(arr_jsx1)
                                setProjects2(arr_jsx2)
							})
						})
					}
				})
		})
	}

    function Get_invites(){

    }

    useEffect(() => {
        Get_projects();
    }, []);

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
                            
                            {projects}
                            
                        </div>
                        </div>
                        <div className="col-6">
                        <div className="container text-left" style={{ paddingBottom: 10 }}>
                            {projects2}
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