import { BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home.jsx"
import Splash from "./components/Splash.jsx"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Profile from "./pages/Profile.jsx"
import Post from "./pages/Post.jsx"
import Album from "./pages/Album.jsx"


function App() {





  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/post/:postId" element={<Post/>} />
          <Route path="/album/:albumId" element={<Album/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
} 

export default App