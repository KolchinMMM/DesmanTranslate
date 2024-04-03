import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import placeholder from "../images/placeholder.png";

import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../AuthContext";
import { fetchProject, fetchSections, fetchSomeAPI, fetchUser, fetchMembers } from "../APIController";
import { ProgressBar } from "react-bootstrap";

function Project(props) {

    const { user } = useContext(AuthContext);

    const [project, setProject] = useState({});
    const [members, setMembers] = useState([]);
    const [sections, setSections] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userRole, setUserRole] = useState(null);

    const [progressCount, setProgressCount] = useState(0);

    const [fieldInviteUser, setFieldInviteUser] = useState([]);

    const fieldInviteUserChange = event => setFieldInviteUser(event.target.value);

    const link = useParams()

    async function GetProject() {
        try {
            let project = await fetchProject(link["project_id"], true, true)
            setProject(project)
            setMembers(project.members)
            setRoles(project.roles)
        } catch (err) {
            if (err.status == 404) {
                window.location.replace("/404")
            }
        }
    }

    async function GetSections() {
        try {
            let sections = await fetchSections(link["project_id"])
            setSections(sections)
        } catch (err) {

        }
    }

    async function GetUserRole() {
        if (!user)
            return
        if (!members)
            return

        const member = members.find(member => member.user.id == user.id)
        if (!member) {
            setUserRole(null)
            return
        }

        setUserRole(roles[member.role_id])
    }

    async function SendInvite() {
        if (fieldInviteUser == "")
            return
        
        try {
            const user = await fetchUser(fieldInviteUser)
            await fetchSomeAPI(`/api/projects/${project.id}/invites`, "POST", { user_id: user.id })
        } catch (err) {
            // TODO
            // В зависимости от типа ошибки выводить то-то то-то на экране
            console.log(err)
        }
    }

    async function KickMember(user_id) {
        try {
            await fetchSomeAPI(`/api/projects/${link["project_id"]}/members/${user_id}`, "DELETE")
            const members = await fetchMembers(link["project_id"])
            setMembers(members)
        } catch (err) {
            console.log(err)
            // По идее, тут ошибок со стороны сервера быть не должно.
        }
    }

    useEffect(() => {
        GetProject();
    }, []);

    useEffect(() => {
        GetUserRole();
    }, [project, user]);

    useEffect(() => {
        GetSections();
    }, []);
    
    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: 50 }}>
                <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>{project?.name}</h1>
                <Tabs
                    defaultActiveKey="project"
                    id="project-id-tabs"
                    className="mb-3"
                >
                    <Tab eventKey="project" title="Проект">
                        <div className="row">
                            <div className="col-7">
                                <img src={placeholder} height={250} alt="project cover" style={{ float: 'left', padding: '10px', margin: '10px 10px 0px 0px' }} className="border rounded" />
                                <h3>Описание проекта</h3>
                                <p>{project?.description}</p>
                            </div>
                            <div className="col border-top border-start rounded py-3" style={{ marginTop: '5px', marginLeft: '0px', marginRight: '20px', paddingLeft: '20px' }}>
                                <h3 className="py-2 border-bottom" style={{ marginTop: '-10px' }}>Информация</h3>
                                <div className="py-2 border-bottom" style={{ marginTop: '-8px' }}><b>Язык оригинала:</b> {project?.source_lang}</div>
                                <div className="py-2 border-bottom" style={{ marginTop: '-8px' }}><b>Язык перевода:</b> {project?.target_lang}</div>
                                <div className="py-2 border-bottom"><b>Дата создания:</b> {project?.created_at?.toLocaleString()}</div>
                                <div className="py-2 border-bottom"><b>Статус:</b> {project?.status}</div>
                                <div className="py-2 border-bottom"><b>Прогресс: {progressCount}%</b>
                                    <div className="progress-stacked" style={{ margin: '10px 0px 5px 0px' }}>
                                        {/* <ProgressBar className="progress" style={{ width: '100%' }} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success">40%</div>
                                        </ProgressBar> */}
                                        <ProgressBar className="progress" striped animated label={`${progressCount}%`} style={{ width: progressCount + '%' }} aria-valuenow={progressCount} aria-valuemin={0} aria-valuemax={100}/>
                                    </div>
                                </div>
                                { userRole &&
                                <div className="py-2 border-bottom"><b>Ваша роль:</b> {userRole?.name}</div>
                                }
                                {/* <h3 className="py-2 border-bottom" style={{ marginTop: '5px' }}>Участники</h3>
                                <table className="table table-hover">
                                    <thead>

                                        <tr>
                                            <th key="username" scope="col">Ник</th>
                                            <th key="roles" scope="col">Роль</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member) =>
                                            <tr key={member.member_id.id} className="table-light">
                                                <th scope="row">{member.member_id.username}</th>
                                                <td>{member.role_name}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table> */}
                            </div>
                        </div>
                        <h2>Разделы</h2>
                        {userRole && userRole.permissions.can_manage_sections && 
                        <Link to={`/projects/${link["project_id"]}/addchapters.html`} type="button" className="btn btn-primary" style={{ marginTop: '0px', marginBottom: '5px' }}>Добавить раздел</Link>
                        }
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
                                {sections.map((section, index) =>
                                    <tr key={section.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <Link to={"/projects/" + project?.id + "/sections/" + section.id} className="link-primary">
                                                {section.name}
                                            </Link>
                                        </td>
                                        <td>50 / 100 (50%)</td>
                                        <td>Оригинал / Переведено</td>
                                    </tr>
                                )}
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
                                            {/* <th scope="col" style={{ display: 'inline-flexbox' }}>Модерация</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member, index) =>
                                            <tr key={member.user.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{member.user.username}</td>
                                                <td>{roles[member.role_id].name}</td>
                                                <td>0</td>
                                                {!roles[member.role_id].permissions.can_manage_members && userRole && userRole.permissions.can_manage_members &&
                                                    <td style={{ display: 'inline-flexbox' }}><button type="button" className="btn btn-outline-danger" style={{ padding: '0px 5px' }} onClick={ function (e) { KickMember(member.user.id) } }>Исключить</button></td>
                                                }
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {userRole && userRole.permissions.can_manage_members &&
                            <div className="col border-top border-start rounded py-3" style={{ marginTop: '5px', marginLeft: '0px', marginRight: '20px', paddingLeft: '20px' }}>
                                <h3 className="py-2 border-bottom" style={{ marginTop: '-5px' }}>Пригласить участника</h3>
                                <form style={{ marginTop: '10px' }}>
                                    <input className="form-control" placeholder="Введите ник пользователя" aria-label="Invite" onChange={fieldInviteUserChange} />
                                </form>
                                <button type="button" className="btn btn-primary" style={{ marginTop: '10px', marginBottom: '5px' }} onClick={function (e) { SendInvite() }}>Пригласить</button>
                            </div>
                            }
                        </div>
                    </Tab>
                    {/* <Tab eventKey="settings" title="Настройки">
                        <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Настройки проекта</h2>
                        <div className="row">
                            <div className="border rounded py-3" style={{ padding: '0px 20px', margin: '0px 20px' }}>
                                <form className="row">
                                    <label htmlFor="settings-id" className="form-label">Уникальная ссылка</label>
                                    <div className="col-3">
                                        <input type="text" className="form-control is-valid" id="settings-id" minLength={4} maxLength={100} />
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary" type="submit">Применить</button>
                                    </div>
                                </form>
                                <form>
                                    <label htmlFor="settings-name" className="form-label" style={{ marginTop: '10px' }}>Название проекта</label>
                                    <input type="text" className="form-control" id="settings-name" defaultValue="Нынешнее название" minLength={4} maxLength={100} />
                                    <label htmlFor="settings-description" className="form-label" style={{ marginTop: '10px' }}>Описание проекта</label>
                                    <textarea className="form-control" aria-label="With textarea" id="settings-description" maxLength={1000} defaultValue={"Нынешнее описание"} />
                                    <label htmlFor="settings-logo" className="form-label" style={{ marginTop: '10px' }}>Сменить обложку</label>
                                    <input type="file" className="form-control" id="settings-logo" accept="image/png, image/jpeg" aria-describedby="logo-desc" />
                                    <div id="logo-desc" className="form-text">Принимаются картинки в формате png и jpeg.</div>
                                    <label htmlFor="settings-author" className="form-label" style={{ marginTop: '10px' }}>Владелец проекта</label>
                                    <input type="text" className="form-control" id="settings-author" defaultValue="Нынешний владелец" />
                                    <label htmlFor="settings-src-lang" className="form-label" style={{ marginTop: '10px' }}>Язык оригинала</label>
                                    <select className="form-select" defaultValue="en" id="settings-src-lang">
                                        <option value="ru">русский</option>
                                        <option value="en">английский</option>
                                        <option value="de">немецкий</option>
                                        <option value="fr">французский</option>
                                    </select>
                                    <label htmlFor="settings-category" className="form-label" style={{ marginTop: '10px' }}>Язык перевода</label>
                                    <select className="form-select" defaultValue="ru" id="settings-category">
                                        <option value="ru">русский</option>
                                        <option value="en">английский</option>
                                        <option value="de">немецкий</option>
                                        <option value="fr">французский</option>
                                    </select>
                                    <label htmlFor="settings-access" className="form-label" style={{ marginTop: '10px' }}>Язык перевода</label>
                                    <div className="form-check">
                                        <input type="radio" name="radios" className="form-check-input" id="settings-access-private" defaultValue="private" defaultChecked />
                                        <label className="form-check-label" htmlFor="settings-access-private">Приватный проект</label>
                                    </div>
                                    <div className="form-check">
                                        <input type="radio" name="radios" className="form-check-input" id="settings-access-public" defaultValue="public" />
                                        <label className="form-check-label" htmlFor="settings-access-public">Публичный проект</label>
                                    </div>
                                    <label htmlFor="settings-category" className="form-label" style={{ marginTop: '10px' }}>Категория</label>
                                    <select className="form-select" defaultValue="none" id="settings-category" aria-describedby="category-desc">
                                        <option value="none">Не выбрано</option>
                                        <option value="movie">Фильмы</option>
                                        <option value="text">Тексты</option>
                                        <option value="program">Программы</option>
                                    </select>
                                    <div id="category-desc" className="form-text">* Если вы выбрали категорию, и ваш проект публичный,
                                        он будет отображаться в соответствующей категории во вкладке "Публичные переводы".
                                        Приватные проекты не будут отображаться в этой вкладке вне зависимости от категории.
                                    </div>
                                    <label htmlFor="settings-status" className="form-label" style={{ marginTop: '10px' }}>Статус</label>
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
                                    <button className="btn btn-primary" type="submit" style={{ marginTop: '20px' }}>Применить</button>
                                </form>
                            </div>
                        </div>
                    </Tab> */}
                </Tabs>
            </div>
            <Footer />
        </>
    );
}

export default Project;
