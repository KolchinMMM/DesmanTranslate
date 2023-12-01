import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import placeholder from "../images/placeholder.png";
import { Container } from "react-bootstrap";

export default function Notfound(){
    return (
        <>
            <Navbar/>
            
            <Container>
                <h2 style={{marginTop: "30px"}}>404 Not Found</h2>
                <br/>
                <p>Такой страницы не существует. Проверьте адрес страницы или <Link to="/create" className="link-primary">создайте свой проект с такой ссылкой!</Link></p>

            </Container>

            <Footer/>
        </>
    );
}