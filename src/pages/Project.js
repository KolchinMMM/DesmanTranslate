import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import placeholder from "../images/placeholder.png";

import React, { useEffect, useState } from "react"

var user = ""
if (localStorage.getItem("user") != null){
  user = JSON.parse(localStorage.getItem("user"))
}

function Project(props){

    const [name, setName] = useState([]);

    const [sourceLang, setSourceLang] = useState([]);

    const [targetLang, setTargetLang] = useState([]);

    const [visibility, setVisibility] = useState([]);

    const [status, setStatus] = useState([]);

    const [description, setDescription] = useState([]);

    const [ownerId, setOwnerId] = useState([]);

    const [creaetedAt, setCreatedAt] = useState([]);

    const [category, setCategory] = useState([]);

    const [members, setMembers] = useState([]);

    const [sections, setSections] = useState([]);

    const [role, setRole] = useState([]);

    const link = useParams()

    // console.log(link["id"])


    async function Get_project(){
        await fetch("/api/projects/"+link["id"])
        .then(response => response.json())
        .then(data => {
            setCategory(data.category)
            setDescription(data.description)
            setName(data.name)
            setSourceLang(data.source_lang)
            setTargetLang(data.target_lang)
            setVisibility(data.visibility)
            setOwnerId(data.owner_id)
            setCreatedAt(data.created_at)
        }).catch(error => console.log(error))
        
    }


    async function Get_members(){
        var jsx_list = []
        let jopa
        await fetch("/api/projects/"+link["id"]+"/members")
            .then(response => response.json())
            .then(data => {jopa = data})

        jopa.forEach(async elem => {
            await fetch("/api/users/"+ elem.member_id)
                .then(response => response.json())
                .then(d => {
                    jsx_list.push(
                        <tr className="table-light">
                            <th scope="row">{d.username}</th>
                            <td>{elem.role_name}</td>
                        </tr>
                    )
                    setMembers(jsx_list)
                })
        })
    }

    async function Get_sections(){
        let sections_jsx = []
        console.log("suka rabotai")
        await fetch("/api/projects/"+link["id"]+"/sections")
            .then(response => {console.log("Che za huita")
            console.log(response)
            return response.json()})
            .then(data => {
                console.log("ebat' zarabotalo")
                console.log(data)
                let count = 1
                data.forEach(async elem =>
                    {
                        console.log("ahui")
                        console.log(elem)
                        sections_jsx.push(
                            <tr>
                                <th scope="row">{count}</th>
                                <td>
                                    <Link to="/editor" className="link-primary">
                                        {elem.name}
                                    </Link>
                                </td>
                                <td>50 / 100 (50%)</td>
                                <td>Оригинал / Переведено</td>
                            </tr>
                        )
                        count++
                    })
                setSections(sections_jsx)
            })
    }
    async function Get_user_role(){
        console.log(user.id)
        await fetch("api/projects/"+ link["id"] + "/members/"+ user.id, {
            method: "GET",
            credentials:"include"
        })
        .then(response => response.body)
        .then(data => {
            console.log("big kucha")
            console.log(data)
        })
    }

    useEffect(() => {
        Get_project();
    }, []);

    useEffect(() => {
        Get_members();
    }, []);

    useEffect(() => {
        Get_sections();
    }, []);

    useEffect(() => {
        Get_user_role();
    }, []);

    return (
    <>
        <Navbar/>
        <div className="container" style={{ marginTop: 50 }}>
        <h1 style={{marginTop: '20px', marginBottom: '20px'}}>{name}</h1>
            <Tabs
            defaultActiveKey="project"
            id="project-id-tabs"
            className="mb-3"
            >
                <Tab eventKey="project" title="Проект">
                    <div className="row">
                        <div className="col-7">
                            <img src={placeholder} height={250} alt="project cover" style={{float: 'left', padding: '10px', margin: '10px 10px 0px 0px'}} className="border rounded" />
                            <h3>Описание проекта</h3>
                            <p>{description}</p>
                        </div>
                        <div className="col border-top border-start rounded py-3" style={{marginTop: '5px', marginLeft: '0px', marginRight: '20px', paddingLeft: '20px'}}>
                            <h3 className="py-2 border-bottom" style={{marginTop: '-10px'}}>Информация</h3>
                            <div className="py-2 border-bottom" style={{marginTop: '-8px'}}><a><b>Оригинал перевода:</b> {sourceLang}</a></div> 
                            <div className="py-2 border-bottom" style={{marginTop: '-8px'}}><a><b>Перевод на:</b> {targetLang}</a></div>
                            <div className="py-2 border-bottom"><a><b>Дата создания:</b> {creaetedAt}</a></div>
                            <div className="py-2 border-bottom"><a><b>Статус:</b> {status}</a></div>
                            <div className="py-2 border-bottom"><a><b>Прогресс:</b>
                                <div className="progress-stacked" style={{margin: '10px 0px 5px 0px'}}>
                                <div className="progress" role="progressbar" aria-label="Переведено" style={{width: '15%'}} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="progress-bar">15%</div>
                                </div>
                                <div className="progress" role="progressbar" aria-label="Переводится" style={{width: '40%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success">40%</div>
                                </div>
                                </div>
                            </a></div><a>
                            </a><div className="py-2 border-bottom"><a /><a><b>Ваша роль:</b> владелец</a></div>
                            <h3 className="py-2 border-bottom" style={{marginTop: '5px'}}>Модераторы</h3>
                            <table className="table table-hover">
                            <thead>
                            
                                <tr>
                                <th scope="col">Ник</th>
                                <th scope="col">Роль</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <h2>Разделы</h2>
                    <button type="button" className="btn btn-primary" style={{marginTop: '0px', marginBottom: '5px'}} onclick="location.href = 'addchapters.html';">Добавить раздел</button>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">№</th>
                        <th scope="col">Название</th>
                        <th scope="col">Прогресс</th>
                        <th scope="col">Скачать</th>
                        </tr>
                    </thead>
                        <tbody>
                            {sections}
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey="members" title="Участники">
                    <div className="row">
                        <div className="col-8">
                            <h2>Участники перевода</h2>
                            <table className="table table-striped align-items-center">
                            <thead>
                                <tr>
                                <th scope="col">№</th>
                                <th scope="col">Ник</th>
                                <th scope="col">Роль</th>
                                <th scope="col">Рейтинг</th>
                                <th scope="col" style={{display: 'inline-flexbox'}}>Модерация</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>LazyDesman</td>
                                <td>Владелец</td>
                                <td>30</td>
                                <td style={{display: 'inline-flexbox'}}><button type="button" className="btn btn-outline-danger" style={{padding: '0px 5px'}}>Исключить</button></td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>Ipaingo</td>
                                <td><select className="form-select" id="members-role-2" style={{padding: '0px 5px', width: '80%'}} disabled>
                                    <option value="member">Переводчик</option>
                                    <option value="redactor">Редактор</option>
                                    <option value="moderator" selected>Модератор</option>
                                    </select></td>
                                <td>0</td>
                                <td style={{display: 'inline-flexbox'}}><button type="button" className="btn btn-outline-danger" style={{padding: '0px 5px'}}>Исключить</button></td>
                                </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>Neprim</td>
                                <td><select className="form-select" id="members-role-3" style={{padding: '0px 5px', width: '80%'}}>
                                    <option value="member" selected>Переводчик</option>
                                    <option value="redactor">Редактор</option>
                                    <option value="moderator">Модератор</option>
                                    </select></td>
                                <td>21</td>
                                <td style={{display: 'inline-flexbox'}}><button type="button" className="btn btn-outline-danger" style={{padding: '0px 5px'}}>Исключить</button></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div className="col border-top border-start rounded py-3" style={{marginTop: '5px', marginLeft: '0px', marginRight: '20px', paddingLeft: '20px'}}>
                            <h3 className="py-2 border-bottom" style={{marginTop: '-5px'}}>Пригласить участника</h3>
                            <form role="invite" style={{marginTop: '10px'}}>
                            <input className="form-control" placeholder="Введите ник пользователя" aria-label="Invite" />
                            </form>
                            <button type="button" className="btn btn-primary" style={{marginTop: '10px', marginBottom: '5px'}}>Пригласить</button>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="settings" title="Настройки">
                    <h2 style={{marginTop: '20px', marginBottom: '20px'}}>Настройки проекта</h2>
                    <div className="row">
                    <div className="border rounded py-3" style={{padding: '0px 20px', margin: '0px 20px'}}>
                        <form className="row">
                        <label htmlFor="settings-id" className="form-label">Уникальная ссылка</label>
                        <div className="col-3">
                            <input type="text" className="form-control is-valid" id="settings-id" minLength={4} maxLength={100} />
                            {/*div class="valid-feedback">Можно использовать!</div>
                                        <div class="invalid-feedback">Такая ссылка уже занята!</div*/}
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" type="submit">Применить</button>
                        </div>
                        </form>
                        <form>
                        <label htmlFor="settings-name" className="form-label" style={{marginTop: '10px'}}>Название проекта</label>
                        <input type="text" className="form-control" id="settings-name" defaultValue="Нынешнее название" minLength={4} maxLength={100} />
                        <label htmlFor="settings-description" className="form-label" style={{marginTop: '10px'}}>Описание проекта</label>
                        <textarea className="form-control" aria-label="With textarea" id="settings-description" maxLength={1000} defaultValue={"Нынешнее описание"} />
                        <label htmlFor="settings-logo" className="form-label" style={{marginTop: '10px'}}>Сменить обложку</label>
                        <input type="file" className="form-control" id="settings-logo" accept="image/png, image/jpeg" aria-describedby="logo-desc" />
                        <div id="logo-desc" className="form-text">Принимаются картинки в формате png и jpeg.</div>
                        <label htmlFor="settings-author" className="form-label" style={{marginTop: '10px'}}>Владелец проекта</label>
                        <input type="text" className="form-control" id="settings-author" defaultValue="Нынешний владелец" />
                        <label htmlFor="settings-src-lang" className="form-label" style={{marginTop: '10px'}}>Язык оригинала</label>
                        <select className="form-select" id="settings-src-lang">
                            <option value="ru" selected>русский</option>
                            <option value="en">английский</option>
                            <option value="de">немецкий</option>
                            <option value="fr">французский</option>
                        </select>
                        <label htmlFor="settings-category" className="form-label" style={{marginTop: '10px'}}>Язык перевода</label>
                        <select className="form-select" id="settings-category">
                            <option value="ru">русский</option>
                            <option value="en" selected>английский</option>
                            <option value="de">немецкий</option>
                            <option value="fr">французский</option>
                        </select>
                        <label htmlFor="settings-access" className="form-label" style={{marginTop: '10px'}}>Язык перевода</label>
                        <div className="form-check">
                            <input type="radio" name="radios" className="form-check-input" id="settings-access-private" defaultValue="private" defaultChecked />
                            <label className="form-check-label" htmlFor="settings-access-private">Приватный проект</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="radios" className="form-check-input" id="settings-access-public" defaultValue="public" />
                            <label className="form-check-label" htmlFor="settings-access-public">Публичный проект</label>
                        </div>
                        <label htmlFor="settings-category" className="form-label" style={{marginTop: '10px'}}>Категория</label>
                        <select className="form-select" id="settings-category" aria-describedby="category-desc">
                            <option value="none" selected>Не выбрано</option>
                            <option value="movie">Фильмы</option>
                            <option value="text">Тексты</option>
                            <option value="program">Программы</option>
                        </select>
                        <div id="category-desc" className="form-text">* Если вы выбрали категорию, и ваш проект публичный,
                            он будет отображаться в соответствующей категории во вкладке "Публичные переводы".
                            Приватные проекты не будут отображаться в этой вкладке вне зависимости от категории.
                        </div>
                        <label htmlFor="settings-status" className="form-label" style={{marginTop: '10px'}}>Статус</label>
                        <div className="form-check">
                            <input type="radio" name="radios" className="form-check-input" id="settings-status-opened" defaultValue="opened" defaultChecked />
                            <label className="form-check-label" htmlFor="settings-status-opened">Проект открыт</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="radios" className="form-check-input" id="settings-status-frozen" defaultValue="frozen" />
                            <label className="form-check-label" htmlFor="settings-status-frozen">Проект заморожен</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="radios" className="form-check-input" id="settings-status-closed" defaultValue="closed" />
                            <label className="form-check-label" htmlFor="settings-status-closed">Проект закрыт</label>
                        </div>
                        <div id="status-desc" className="form-text">* Статус проекта отображается на странице проекта. Вы можете пометить проект как замороженный, чтобы обозначить,
                            что временно не будете над ним работать, или как закрытый, если работа завершена и не будет продолжаться.
                        </div>
                        <button className="btn btn-primary" type="submit" style={{marginTop: '20px'}}>Применить</button>
                        </form>    
                    </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
        <Footer/>
    </>
);
}

export default Project;
