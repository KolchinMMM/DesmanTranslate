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

	const nameChange = event => setName(event.target.value);
	const handleChange = event => setHandle(event.target.value);

	function Create_project() {
		fetch("/api/register", {
			method: "POST",
			body: JSON.stringify({
				"name": name,
				"handle": handle
			}),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
			}
		})
	}

	return (
		<>
			<Navbar />

			<div className="container text-left" style={{ marginTop: '50px', marginLeft: 'auto', marginRight: 'auto', width: '40%', minWidth: '300px' }}>
				<h1 style={{ marginBottom: '20px' }}>Создать новый проект</h1>
				<form>
					<div className="mb-3">
						<label htmlFor="inputName" className="form-label">Название проекта</label>
						<input type="text" className="form-control" id="inputName" onChange={nameChange} />
					</div>
					<div className="mb-3">
						<label htmlFor="inputUnique" className="form-label">Уникальная ссылка</label>
						<input type="text" className="form-control" id="inputUnique" aria-describedby="linkDesc" onChange={handleChange} />
						<div id="linkDesc" className="form-text">Можно придумать позже</div>
					</div>
					<label htmlFor="inputSrcLang" className="form-label">Язык оригинала</label>
					<select className="form-select" id="inputSrcLang">
						<option value="ru" selected>русский</option>
						<option value="en">английский</option>
						<option value="de">немецкий</option>
						<option value="fr">французский</option>
					</select>
					<label htmlFor="inputTargLang" className="form-label" style={{ marginTop: '10px' }}>Язык перевода</label>
					<select className="form-select" id="inputTargLang">
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
						<input type="radio" name="radios" className="form-check-input" id="settings-access-private" defaultValue="private" defaultChecked />
						<label className="form-check-label" htmlFor="settings-access-private">Приватный проект</label>
					</div>
					<div className="form-check">
						<input type="radio" name="radios" className="form-check-input" id="settings-access-public" defaultValue="public" />
						<label className="form-check-label" htmlFor="settings-access-public">Публичный проект</label>
					</div>

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