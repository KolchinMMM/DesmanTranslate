import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../AuthContext";

const errors_to_message = {
    name: {
        "required": "Поле названия проекта должно быть заполнено",
        "not unique": "Название проекта должно быть уникально",
		"minlength": "Название проекта слишком короткое (не меньше 4 символов)",
        "maxlength": "название проекта слишком длинное (не больше 100 символов)",
    },
    handle: {
		"required": "Поле хэндла проекта должно быть заполнено",
		"not unique": "Хэндл проекта должен быть уникальным",
		"minlength": "Хэндл проекта слишком короткий (не меньше 4 символов)",
        "maxlength": "Хэндл проекта слишком длинное (не больше 100 символов)",
        "illegal symbols": "Хэндл проекта должен состоять только из строчных букв латинского алфавита, цифр и знака подчёркивания, а также не начинаться с цифры",
    },
	description: {
		"maxlength": "Описание проекта не должно превышать 1000 символов",
	}
}


export default function Create() {

	const { user } = useContext(AuthContext);

	var id = 0 // ВРЕМЕННАЯ ФИГНЯ, ПОТОМ ПЕРЕДЕЛАТЬ
	let navigate = useNavigate();
	const routeChange = () => {
		let path = '/project/:id';
		navigate(path);
	}

	const [name, setName] = useState("")
	const [handle, setHandle] = useState("")
	const [description, setDescription] = useState("")

	const [langSource, setLangSource] = useState("ru")
	const [langTarget, setLangTarget] = useState("en")

	const [visibility, setVisibility] = useState("private")

	const [error, setError] = useState("")

	const [handleError, setHandleError] = useState("")
	const [nameError, setNameError] = useState("")
	const [descriptionError, setDescriptionError] = useState("")

	const nameChange = event => setName(event.target.value);
	const handleChange = event => setHandle(event.target.value);
	const desciptionChange = event => setDescription(event.target.value);

	async function Create_project(event) {
		event.preventDefault()
        event.target.disabled = true

		const response = await fetch("/api/projects", {
			method: "POST",
			body: JSON.stringify({
				"name": name,
				"handle": handle,
				"target_lang": langTarget,
				"source_lang": langSource,
				"visibility": visibility,
				"description": description,
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			credentials: "include"

		})

		setHandleError("")
        setNameError("")
        setDescriptionError("")

        const resp_json = await response.json()
        if (!response.ok) {
            event.target.disabled = false
            const errors = resp_json.errors
            for (const error of errors) {
                switch (error.key) {
					case "name":
						setNameError(errors_to_message.name[error.kind] || "Какая-то ошибка")
						break;
					case "handle":
						setHandleError(errors_to_message.handle[error.kind] || "Какая-то ошибка")
						break;
					case "description":
						setDescriptionError(errors_to_message.description[error.kind] || "Какая-то ошибка")
						break;
				}
            }
            console.log(errors)
        } else {
            window.location.replace(`/projects/${resp_json.id}`)
        }
	}

	return (
		<>
			<Navbar />

			<div className="container text-left" style={{ marginTop: '50px', marginLeft: 'auto', marginRight: 'auto', width: '40%', minWidth: '300px' }}>
				<h1 style={{ marginBottom: '20px' }}>Создать новый проект</h1>
				<form>
					<div className="mb-3">
						
						<label htmlFor="inputName" className="form-label">Название проекта</label>
						<input type="text" className="form-control" id="inputName" onChange={nameChange} aria-describedby="nameError"/>
						{nameError != "" && <div id="nameError" className="form-text">
                            {nameError}
                        </div>}
					</div>
					<div className="mb-3">
						
						<label htmlFor="inputUnique" className="form-label">Уникальная ссылка</label>
						<input type="text" className="form-control" id="inputUnique" aria-describedby="linkDesc handleError" onChange={handleChange} />
						{/* <div id="linkDesc" className="form-text">Можно придумать позже</div> */}
						{handleError != "" && <div id="handleError" className="form-text">
                            {handleError}
                        </div>}
					</div>
					<div className="mb-3">
						
						<label htmlFor="inputDesc" className="form-label">Описание проекта</label>
						<textarea type="text" className="form-control" id="inputDesc" aria-describedby="descriptionError" onChange={desciptionChange} />
						{descriptionError != "" && <div id="descriptionError" className="form-text">
                            {descriptionError}
                        </div>}
					</div>
					<label htmlFor="inputSrcLang" className="form-label">Язык оригинала</label>
					<select className="form-select" id="inputSrcLang" defaultValue="en" onChange={(e) => setLangSource(e.target.value)}>
						<option value="ru">русский</option>
						<option value="en">английский</option>
						<option value="de">немецкий</option>
						<option value="fr">французский</option>
					</select>
					<label htmlFor="inputTargLang" className="form-label" style={{ marginTop: '10px' }}>Язык перевода</label>
					<select className="form-select" id="inputTargLang" defaultValue="ru" onChange={(e) => setLangTarget(e.target.value)}>
						<option value="ru">русский</option>
						<option value="en">английский</option>
						<option value="de">немецкий</option>
						<option value="fr">французский</option>
					</select>
					<label htmlFor="inputLogo" className="form-label" style={{ marginTop: '10px' }}>Загрузить обложку</label>
					<input type="file" className="form-control" id="inputLogo" accept="image/png, image/jpeg" aria-describedby="logo-desc" />
					<div id="logo-desc" className="form-text">Принимаются картинки в формате png и jpeg</div>
					<label className="form-label" style={{ marginTop: '10px' }}>Доступ к проекту</label>
					<div className="form-check">
						<input type="radio" name="radios" className="form-check-input" id="settings-access-private" defaultValue="private" defaultChecked onClick={(e) => setVisibility("private")}/>
						<label className="form-check-label" htmlFor="settings-access-private">Приватный проект</label>
					</div>
					<div className="form-check">
						<input type="radio" name="radios" className="form-check-input" id="settings-access-public" defaultValue="public" onClick={(e) => setVisibility("public")}/>
						<label className="form-check-label" htmlFor="settings-access-public">Публичный проект</label>
					</div>
					
					<Button variant="primary"
						style={{ marginTop: "20px" }}
						onClick={Create_project}
					>
						Создать проект
					</Button>
					
				</form>
			</div>

			<Footer />
		</>
	);
}