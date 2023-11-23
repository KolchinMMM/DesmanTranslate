import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Projects from "./pages/Projects.js";
import Search from "./pages/Search.js";
import User from "./pages/User.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";

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
      </Routes>
    </div>
  )
}

export default App;
