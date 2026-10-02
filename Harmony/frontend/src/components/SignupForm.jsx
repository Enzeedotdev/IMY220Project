import { useState } from "react"
import "../css/SignupForm.css"

function SignupForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords dont match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
    const data = await response.json()

    console.log(data)
  }

  return (
    <form className="signupForm" onSubmit={handleSubmit}>
      <label className="signupFormLabel">
        Username
        <input type="text" name="username" value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signupFormInput"
        />
      </label>

      <label className="signupFormLabel">
        Email
        <input type="email" name="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signupFormInput"
        />
      </label>

      <label className="signupFormLabel">
        Password
        <input type="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signupFormInput"
        />
      </label>

      <label className="signupFormLabel">
        Confirm Password
        <input type="password" name="confirmPassword" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signupFormInput"
        />
      </label>

      { error &&
        <p className="signupFormError">{error}</p>
      }

      <button type="submit" className="signupFormButton">
        Sign Up
      </button>
    </form>
  )
}

export default SignupForm
