import { Link } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

import React, { setState, useEffect, useState, formData } from "react"


export default function Create() {

	var id = 0 // ВРЕМЕННАЯ ФИГНЯ, ПОТОМ ПЕРЕДЕЛАТЬ
	let navigate = useNavigate();
	const routeChange = () => {
		let path = '/project/:id';
		navigate(path);
	}

	const [name, setName] = useState("")
	const [handle, setHandle] = useState("")

	const [langSource, setLangSource] = useState("ru")
	const [langTarget, setLangTarget] = useState("en")

	const [visibility, setVisibility] = useState("private")

	const [error, setError] = useState("")

	const [handleError, setHandleError] = useState("")
	const [nameError, setNameError] = useState("")

	const nameChange = event => setName(event.target.value);
	const handleChange = event => setHandle(event.target.value);

	function Create_project() {
		console.log(langSource, langTarget, visibility, name, handle)
		fetch("/api/projects", {
			method: "POST",
			body: JSON.stringify({
				"name": name,
				"handle": handle,
				"target_lang": langTarget,
				"source_lang": langSource,
				"visibility": visibility
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			credentials: "include"

		})
		.then(async data =>{
			const json_data = await data.json()
			if (!data.ok){
				for (const error of json_data.errors){
					setError(error["message"] + ", you idiot")
					console.log(error)
					switch (error.key) {
						case "handle":
							if (error.kind == "user defined")
								setHandleError("Данный хэндл уже занят")
							else
								if (error.kind == "required")
									setNameError("Поле обязательно для заполнения")
								else
									setHandleError("Неверная длина хэндла (от 4 до 20 символов)")
							break;
						case "name":
							if (error.kind == "user defined")
								setNameError("Данное имя уже заняо")
							else
								if (error.kind == "required")
									setNameError("Поле обязательно для заполнения")
								else
								setNameError("Неверная длина имени (от 4 до 20 символов)")
							break;
					}
				}
				console.log(data)
			}
			else{
				setError("Создалось")
			}
		})
	}

	return (
		<>
			<Navbar />

			<div className="container text-left" style={{ marginTop: '50px', marginLeft: 'auto', marginRight: 'auto', width: '40%', minWidth: '300px' }}>
				<h1 style={{ marginBottom: '20px' }}>Создать новый проект</h1>
				<form>
					<div>{nameError}</div>
					<div className="mb-3">
						
						<label htmlFor="inputName" className="form-label">Название проекта</label>
						<input type="text" className="form-control" id="inputName" onChange={nameChange} />
					</div>
					<div>{handleError}</div>
					<div className="mb-3">
						
						<label htmlFor="inputUnique" className="form-label">Уникальная ссылка</label>
						<input type="text" className="form-control" id="inputUnique" aria-describedby="linkDesc" onChange={handleChange} />
						<div id="linkDesc" className="form-text">Можно придумать позже</div>
					</div>
					<label htmlFor="inputSrcLang" className="form-label">Язык оригинала</label>
					<select className="form-select" id="inputSrcLang" onChange={(e) => setLangSource(e.target.value)}>
						<option value="ru" selected>русский</option>
						<option value="en">английский</option>
						<option value="de">немецкий</option>
						<option value="fr">французский</option>
					</select>
					<label htmlFor="inputTargLang" className="form-label" style={{ marginTop: '10px' }}>Язык перевода</label>
					<select className="form-select" id="inputTargLang" onChange={(e) => setLangTarget(e.target.value)}>
						<option value="ru">русский</option>
						<option value="en" selected>английский</option>
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
					
					<div>{error}</div>
					<Button variant="primary"
						style={{ marginTop: "20px" }}
						onClick={function (e) { Create_project() }}
					>
						Создать проект
					</Button>
					
				</form>
			</div>

			<Footer />
		</>
	);
}