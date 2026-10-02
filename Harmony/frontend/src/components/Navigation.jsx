import { Link } from "react-router-dom"
import "../css/Navigation.css"

function Navigation (){

    return(

        <nav className="navBar">
            <Link to="/home" className="navBrand">Harmony</Link>
            <div className="navLinks">
                <Link to="/home" className="navLink">Home</Link>
                <Link to="/profile" className="navLink">Profile</Link>
            </div>
        </nav>

    )

}

export default Navigation
