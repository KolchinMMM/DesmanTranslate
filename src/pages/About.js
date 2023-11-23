import { Link } from "react-router-dom";
import Home from "./Home";

function About() {
  return (
    <div>
      <h1>This is about</h1>
      <Link to="/">homepage</Link>
      <Link to="about">You can contact us by submitting form</Link>
    </div>
  );
}

export default About;