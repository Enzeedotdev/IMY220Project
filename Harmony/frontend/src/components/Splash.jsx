import "../css/Splash.css"
import { Link } from "react-router-dom"
import heroImg from "../assets/hero.png"

function Splash () {
  return (
    <div className="splashMain">
      <div className="splashContent">
        <h1 className="splashTitle">Harmony</h1>
        <h2 className="splashSubtitle">Welcome to Harmony, all your posts in sync.</h2>
        <div className="splashActions">
          <Link to="/signup" className="splashButton splashButtonPrimary">Sign Up</Link>
          <Link to="/login" className="splashButton splashButtonSecondary">Log In</Link>
        </div>
      </div>
      <img src={heroImg} alt="" className="splashHero" />
    </div>
  )
}

export default Splash
