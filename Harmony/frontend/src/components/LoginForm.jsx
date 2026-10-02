import { useState } from "react"
import "../css/LoginForm.css"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, showErr] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email || !password) {
      showErr("Email and password required")
      return
    }

    const response = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()

    console.log(data)
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <label className="loginFormLabel">
        Email
        <input type="email" name="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="loginFormInput"
        />
      </label>

      <label className="loginFormLabel">
        Password
        <input type="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="loginFormInput"
        />
      </label>

      {error && <p className="loginFormError">{error}</p>}

      <button type="submit" className="loginFormButton"> Log In    </button>
    </form>
  )
}

export default LoginForm
