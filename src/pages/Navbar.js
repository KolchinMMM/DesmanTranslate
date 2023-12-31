import { Link } from "react-router-dom";
import logo from "../images/logo.png"
import Button from "react-bootstrap/Button"
import React, { useEffect, useState } from "react"

var user = ""
if (localStorage.getItem("user") != null) {
	user = JSON.parse(localStorage.getItem("user"))
}

function Navbar() {
	const [input, setInput] = useState("");
	function Logout() {
		localStorage.clear("user")
		window.location.reload(false);
	}

	async function Change_personal_account() {
		if (user != "") {
			setInput(
				<ul className="nav" style={{ display: "flex" }}>
					<li className="nav-item">
						<Link to={"/users/" + user.id} reloadDocu className="nav-link link-primary px-2">
							{user.username}
						</Link>
					</li>
					<Button
						className="nav-item border-0"
						variant="outline-secondary"
						style={{ padding: "2px", height: "75%", margin: "auto", marginLeft: "10px" }}
						onClick={Logout}>
						Выйти
					</Button>

				</ul>)
		} else {
			setInput(<ul className="nav" style={{ display: "flex" }}>
				<li className="nav-item">
					<Link to="/login" className="nav-link link-body-emphasis px-2">
						Войти
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/signup" className="nav-link link-body-emphasis px-2">
						Зарегистрироваться
					</Link>
				</li>
			</ul>)
		}
	}

	useEffect(() => {
		Change_personal_account();
	}, []);

	return (
		<>
			<header className="py-3 border-bottom">
				<div className="container d-flex flex-wrap justify-content-center">
					<a className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
						<img
							width={250}
							height={100}
							src={logo}
							alt="logo"
						/>
					</a>
					<div className="d-flex align-items-center">
						<form role="search">
							<input
								type="search"
								className="form-control"
								placeholder="Поиск..."
								aria-label="Search"
							/>
						</form>
					</div>
				</div>
			</header>
			<nav className="py-2 bg-body-tertiary border-bottom">
				<div className="container d-flex flex-wrap">
					<ul className="nav me-auto">
						<li className="nav-item">
							<Link
								to="/"
								className="nav-link link-body-emphasis px-2 active"
								aria-current="page"
							>
								Главная
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/projects" className="nav-link link-body-emphasis px-2">
								Проекты
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/search" className="nav-link link-body-emphasis px-2">
								Поиск проектов
							</Link>
						</li>
					</ul>
					{input}
				</div>
			</nav>
		</>
	);
}

export default Navbar;