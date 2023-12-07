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
console.log(user)

function Projects(){

    const [projects, setProjects] = useState([]);

    const [projects2, setProjects2] = useState([]);

    const [invites, setInvites] = useState([]);

    const [invites2, setInvites2] = useState([]);

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
								if (c==count){
                                    setProjects(arr_jsx1)
                                    setProjects2(arr_jsx2)
                                }
							})
						})
					}
				})
		})
	}

    async function Get_invites(){
        let arr_jsx1 = []
        let arr_jsx2 = []
        await fetch("/api/invites")
            .then(response => response.json())
            .then(async d =>{
                console.log(d.length)
                console.log(d)
                let count = d.length
                await d.forEach(async data=>{
                let c = 0
                await Get_user_by_id(data.inviter_id)
                    .then(
                        async inviter => {
                            Get_project_name_by_id(data.project_id)
                                .then(
                                    (project_name =>{
                                        console.log(project_name, inviter)

                                        var item =
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
                                                        {project_name}
                                                    </a>
                                                    </b>{" "}
                                                    <br /> Вы были приглашены пользователем{" "}
                                                    <a className="text-primary" href="#">
                                                    {inviter}
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
                                                    onClick={function(e){Process_invitation(data.id, true)}}
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
                                                    onClick = {function(e){Process_invitation(data.id, false)}}
                                                    >
                                                    Отклонить
                                                    </button>
                                                </div>
                                                </div>
                                            </div>
                                            console.log(arr_jsx1)
                                            console.log(arr_jsx2)
                                            if (c % 2 == 0)
                                            {
                                                arr_jsx1.push(item)
                                            }
                                            else{
                                                arr_jsx2.push(item)
                                            }
                                            c++
                                            if (c >= count){
                                                console.log("ahui")
                                                setInvites(arr_jsx1)
                                                setInvites2(arr_jsx2)
                                            }
                                            setInvites(arr_jsx1)
                                            setInvites2(arr_jsx2)
                                    })
                                )
                        }
                    ) 

                })
                    
                
            })
    }
    console.log(invites)
    console.log(invites2)

    async function Get_user_by_id(id){
        let username
        await fetch("/api/users/"+id)
            .then(response => response.json())
            .then(data => {
                username = data.username
                
            })
        return username
    }

    async function Get_project_name_by_id(id){
        let name
        await fetch("/api/projects/"+id)
            .then(response => response.json())
            .then(data => {
                name = data.name                
            })
        return name
    }

    function Process_invitation(invite_id, is_accepted){
        console.log("jopa", invite_id, is_accepted)
        fetch("/api/invites/"+invite_id,
        {
            method:"POST",
            body: JSON.stringify({
                "accept": is_accepted
             }),
             headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        }).then(response => {
            Get_invites()
        })

    }

    useEffect(() => {
        Get_projects()
    }, []);

    useEffect(() => {
        Get_invites()
    }, []);

    return (
        <>
            <Navbar/>
            
            <div className="container" style={{ marginTop: 50 }}>
                
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
                            {invites}
                        </div>
                        <div className="col-6">
                            {invites2}
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