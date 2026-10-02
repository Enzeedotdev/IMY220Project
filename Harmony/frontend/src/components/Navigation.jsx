import { Link, useNavigate } from "react-router-dom"
import "../css/Navigation.css"

function Navigation (){
    const navigate = useNavigate()

    async function logout() {
        await fetch("/api/logout", { method: "POST" })
        localStorage.removeItem("user")
        navigate("/")
    }

    return(

        <nav className="navBar">
            <Link to="/home" className="navBrand">Harmony</Link>
            <div className="navLinks">
                <Link to="/home" className="navLink">Home</Link>
                <Link to="/profile" className="navLink">Profile</Link>
                <button onClick={logout} className="navLink">Log Out</button>
            </div>
        </nav>

    )

}

export default Navigation
