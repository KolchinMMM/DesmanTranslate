import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import placeholder from "../images/placeholder.png"
import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

import api_link from "../App"
const user = JSON.parse(localStorage.getItem("user"))

function Home() {
  const [projects, setProjects] = useState([]);

  function Fill_projects(){
    fetch("/api/projects")
    .then((response) => response.json())
    .then((responseData) => {

        var answer = []
        var user_projects = new Array()
        responseData.forEach(elem =>{
          if (elem.owner_id === user.id)
            user_projects.push(elem)
        })
  
        user_projects.sort(function(a, b) {
          return a.created_at < b.created_at;
        });
  
        let count = 0
  
        user_projects.forEach(elem => {
          if (count != 2){
            console.log("dfghjkljhgf")
            console.log(elem)


                let item = 
                <div className="col text-left">
                
                  <Link to={"/project/"+elem.handle} className="link-primary">
                  {elem.name}
                  </Link>
                <br /> Полезная информация
              </div>

              answer.push(item)
             // console.log(item)
          }
        })
        setProjects(answer)
      

    })
    .catch(error => console.warn(error));
  
  }

  useEffect(() => {
    Fill_projects();
  }, []);


  let navigate = useNavigate(); 
  const routeChange = () =>{ 
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
            {projects}
            {/* <div
              className="container text-left border-bottom"
              style={{ paddingBottom: 25 }}
            >
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
                  <a>
                    <b />
                  </a>
                  <b>
                    <Link to="/project" className="link-primary">
                        Название проекта
                    </Link>
                  </b>{" "}
                  <br /> Полезная информация
                </div>
              </div>
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
                  <a>
                    <b />
                  </a>
                  <b>
                    <Link to="/project" className="link-primary">
                        Название проекта
                    </Link>
                  </b>{" "}
                  <br /> Полезная информация
                </div>
              </div>
            </div> */}
            <h2 style={{ marginTop: 20 }}>Популярные проекты:</h2>
            <div className="container text-left" style={{ paddingBottom: 10 }}>
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
                  <a>
                    <b />
                  </a>
                  <b>
                    <Link to="/project" className="link-primary">
                        Название проекта
                    </Link>
                  </b>{" "}
                  <br /> Владелец проекта
                </div>
              </div>
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
                  <a>
                    <b />
                  </a>
                  <b>
                    <Link to="/project" className="link-primary">
                        Название проекта
                    </Link>
                  </b>{" "}
                  <br /> Владелец проекта
                </div>
              </div>
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
                  <a>
                    <b />
                  </a>
                  <b>
                    <Link to="/project" className="link-primary">
                        Название проекта
                    </Link>
                  </b>{" "}
                  <br /> Владелец проекта
                </div>
              </div>
            </div>
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
      <Footer/>
    </>
  );
}

export default Home;