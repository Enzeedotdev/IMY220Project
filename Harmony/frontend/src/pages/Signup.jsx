import Navigation from "../components/Navigation.jsx"
import SignupForm from "../components/SignupForm.jsx"
import "../css/Signup.css"

function Signup() {
  return (
    <>
      <Navigation/>
      <div className="signupMain">
        <h1 className="signupTitle">Sign Up</h1>
        <SignupForm />
      </div>
    </>
    
  )
}

export default Signup
