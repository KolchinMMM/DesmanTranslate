import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useNavigate } from "react-router-dom"
import { FaCog, FaFilter, FaBookOpen, FaEyeSlash, FaPlus, FaCheck, FaCode, FaRegTrashAlt, FaEllipsisV, FaUndo, FaRedo, FaBook } from "react-icons/fa"
import { BsReplyFill, BsChatLeftText, BsGlobe } from "react-icons/bs"
import { Link, useParams } from "react-router-dom";


import React, { setState, useEffect, useState, formData } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

function LinkWithTooltip({ id, children, href, tooltip, where }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement={where}
      delayShow={300}
      delayHide={150}
    >
      <a href={href}>{children}</a>
    </OverlayTrigger>
  );
}

function Piece(){
	return(
	<>
		<Container fluid style={{margin: "0px", padding: "7px", minHeight: "100px"}} className="py-2 d-flex justify-content-between">
		<Col md="auto" className="d-flex align-items-center" style={{marginRight: "10px", marginTop: "20px"}}>
			<Form className="d-flex align-items-center">
			<Form.Group className="mb-3" controlId="formBasicCheckbox">
				<Form.Check type="checkbox"/>
			</Form.Group>        
			</Form>
		</Col>
		<Col style={{marginRight: "10px"}}>
			<Form.Control className="d-flex align-items-start"
			readOnly
			as="textarea"
			style={{ paddingTop: "5px", paddingLeft: "10px", height: "100%", wordWrap: "break-word" }}
			>
			aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
			</Form.Control>
		</Col>
		<Col>
			<Form.Control className="d-flex align-items-start"
			readOnly
			as="textarea"
			style={{ paddingTop: "5px", paddingLeft: "10px", height: "100%", wordWrap: "break-word" }}
			>
			Здесь отображается самый новый перевод. Пользователь может редактировать только свой перевод.
			</Form.Control>
		</Col>
		</Container>
	</>
	)
}






function Translation(){
	return(
	<>
		<FloatingLabel controlId="translationVariant" label="Ник пользователя">
		<Form.Control
			as="textarea"
			readOnly
			style={{ marginTop: "10px", minHeight: "100px", wordWrap: "break-word" }}
		>
			aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
		</Form.Control>
		</FloatingLabel>
	</>
	)
}

export default function Editor(){

	const [sections, setSections] = useState([]);

	const [translations, setTranslations] = useState([]);

	useEffect(() => {
		console.log(translations)
	  }, [translations])

	const link = useParams()

	console.log(link["project_id"], link["section_id"])
	let navigate = useNavigate(); 
	const routeChange = () =>{ 
		let path = '/projects/'+link["project_id"]; 
		navigate(path);
	}

	function Translation1(username, text){
		console.log(username, text)
		return(
		<>
			<FloatingLabel controlId="translationVariant" label={username}>
			<Form.Control
				as="textarea"
				readOnly
				style={{ marginTop: "10px", minHeight: "100px", wordWrap: "break-word" }}
			>
				{text}
			</Form.Control>
			</FloatingLabel>
		</>
		)
	}

	async function Get_string(idString){
		let arr_jsx = []
		console.log(idString)
		
		console.log("pokak", idString)
		await fetch("/api/projects/" + link["project_id"]+"/sections/"+link["section_id"]+"/strings/"+idString+"/translations")
		.then(response => response.json())
			.then(translat => {
				for (const elem of translat){
					console.log("nasral")
					console.log(elem)
					fetch("/api/users/"+elem.author_id)
						.then(response => response.json())
						.then(userishe => {
							var item = Translation1(userishe.username, elem.text)
							arr_jsx.push(item)
						})
				}
			}).then(async ()=>{
				console.log(arr_jsx)
				setTranslations(arr_jsx)
			})
		
	}
	

	function Piece1(text, translation, id_string){
		return(
		<>
			<Container fluid style={{margin: "0px", padding: "7px", minHeight: "100px"}} className="py-2 d-flex justify-content-between">
			<Col md="auto" className="d-flex align-items-center" style={{marginRight: "10px", marginTop: "20px"}}>
				<Form className="d-flex align-items-center">
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox"/>
				</Form.Group>        
				</Form>
			</Col>
			<Col style={{marginRight: "10px"}} onClick={async (e) => 
					{
						Get_string(id_string)
					}
				}>
				<Form.Control className="d-flex align-items-start"
				readOnly
				as="textarea"
				style={{ paddingTop: "5px", paddingLeft: "10px", height: "100%", wordWrap: "break-word" }}
				>
				{text}
				</Form.Control>
			</Col>
			<Col>
				<Form.Control className="d-flex align-items-start"
				readOnly
				as="textarea"
				style={{ paddingTop: "5px", paddingLeft: "10px", height: "100%", wordWrap: "break-word" }}
				>
				{translation}
				</Form.Control>
			</Col>
			</Container>
			<hr style={{padding: "0px", margin: "0px"}}/>
		</>
		)
	}

	async function Get_strings(){
		var arr_jsx = []
		await fetch("/api/projects/" + link["project_id"]+"/sections/"+link["section_id"]+"/strings")
			.then(response => response.json())
			.then(async data_sections =>{
				var count = 0
				for (const elem of data_sections){
					count++
					await fetch("/api/projects/" + link["project_id"]+"/sections/"+link["section_id"]+"/strings/"+ elem.id+"/translations")
						.then(response => response.json())
						.then(translations => {
							let item
							if (translations.length === 0){
								item = Piece1(elem.text, "А где", elem.id)

							}else{
								item = Piece1(elem.text, translations[0].text, elem.id)
							}
							arr_jsx.push(item)
						})
				}
			})
			.then(() =>{
				setSections(arr_jsx)
			}
			)
	}

	useEffect(() => {
        Get_strings()
    }, [])

	return (
	<>
	<header className="fixed-top" expand="lg">
	<Container fluid className="bg-white py-1 border-bottom d-flex flex-wrap justify-content-between">
		<div className="d-inline-flex align-items-center">
		<LinkWithTooltip tooltip="Вернуться к проекту" href="#" id="tooltip-back" where="bottom">
			<Button variant="outline-dark" onClick={routeChange}><BsReplyFill style={{marginBottom: "3px"}}/></Button>
		</LinkWithTooltip>
		</div>
		<div className="d-inline-flex align-items-center">
		<h3 className="pt-1">Проект: Раздел</h3>
		</div>
		<div className="d-inline-flex align-items-center">
		<LinkWithTooltip tooltip="Настройки редактора" href="#" id="tooltip-settings" where="bottom">
			<Button variant="outline-dark"><FaCog style={{marginBottom: "3px"}}/></Button>
		</LinkWithTooltip>
		</div>
	</Container>

	<Container fluid
	className="border-bottom bg-white row py-1 d-flex flex-wrap justify-content-between"
	style={{margin: "0px"}}
	>
		<Col className="py-1 d-inline-flex align-items-center">
			<LinkWithTooltip tooltip="Отменить" href="#" id="tooltip-settings" where="bottom">
			<Button variant="link"><FaUndo style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Повторить" href="#" id="tooltip-settings" where="bottom">
			<Button variant="link"><FaRedo style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Фильтр" href="#" id="tooltip-settings" where="bottom">
			<Button variant="outline-primary" style={{marginLeft: "10px"}}><FaFilter style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Скрыть исходник" href="#" id="tooltip-settings" where="bottom">
			<Button variant="outline-primary" style={{marginLeft: "10px"}}><FaCode style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Добавить отрывок" href="#" id="tooltip-settings" where="bottom">
			<Button variant="outline-primary" style={{marginLeft: "10px"}}><FaPlus style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Словарь" href="#" id="tooltip-settings" where="bottom">
			<Button variant="outline-primary" style={{marginLeft: "10px"}}><FaBook style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
		
			
			<Form style={{marginLeft: "10px"}}>
			<Form.Group controlId="pieceSearch">
				<Form.Control type="search" placeholder="Поиск..."/>
			</Form.Group>
			</Form>
		</Col>
		<Col></Col>
		<Col className="py-1 d-inline-flex align-items-center">
			<LinkWithTooltip tooltip="Одобрить перевод" href="#" id="tooltip-settings" where="bottom">
			<Button disabled variant="outline-secondary"><FaCheck style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Скрыть отрывок" href="#" id="tooltip-settings" where="bottom">
			<Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><FaEyeSlash style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Удалить отрывок" href="#" id="tooltip-settings" where="bottom">
			<Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><FaRegTrashAlt style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Прочее" href="#" id="tooltip-settings" where="bottom">
			<Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><FaEllipsisV style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			<LinkWithTooltip tooltip="Комментарии" href="#" id="tooltip-settings" where="bottom">
			<Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><BsChatLeftText style={{marginBottom: "3px"}}/></Button>
			</LinkWithTooltip>
			
		</Col>
		
	</Container>
	</header>

	<Container fluid style={{marginTop: "110px"}}>
		<Row>
		<Col className="border-bottom" style={{padding: "0px"}}>
		{sections}
		
			
		</Col>
		<Col className="border-start border-end border-bottom" md={4}>
			<Button variant="outline-success" style={{margin: "10px 0px 10px 0px"}}><FaPlus style={{marginBottom: "3px", marginRight: "3px"}}/>  Добавить перевод </Button>
			<Form.Control className="d-flex align-items-start"
			as="textarea"
			placeholder="Ваш вариант перевода..."
			style={{ marginBottom: "10px", paddingTop: "5px", paddingLeft: "10px", minHeight: "85px", wordWrap: "break-word" }}
			>
			</Form.Control>
			
			<h3>Варианты перевода</h3>
			{translations}
			
			

		</Col>
		</Row>
	</Container>
	</>
	);
}