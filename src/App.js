import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Projects from "./pages/Projects.js";
import Search from "./pages/Search.js";
import User from "./pages/User.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Project from './pages/Project.js';
import Create from './pages/Create.js';
import Editor from './pages/Editor.js';
import Notfound from './pages/Error.js';
import Load from './pages/Load.js';

const api_link = "127.0.0.1:3000"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <About/> } />
        <Route path="projects" element={ <Projects/> } />
        <Route path="search" element={ <Search/> } />
        <Route path="user" element={ <User/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="signup" element={ <Signup/> } />
        <Route path="projects/:id" element={ <Project/> } />
        <Route path="create" element={ <Create/> } />
        <Route path="projects/:project_id/sections/:section_id" element={ <Editor/> } />
        <Route path="notfound" element={ <Notfound/> } />
        <Route path="users/:id" element={ <User/> } />
        <Route path="load" element={ <Load/> } />
      </Routes>
    </div>
  )
}

export default App;
