import Navigation from "../components/Navigation.jsx"
import LoginForm from "../components/LoginForm.jsx"
import "../css/Login.css"

function Login() {
  return (
    <>
        <Navigation/>
        <div className="loginMain">
          <h1 className="loginTitle">Log In</h1>
          <LoginForm />
        </div>
    </>
  
  )
}

export default Login
