import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { SharePage } from "./pages/SharePage"
import LandingPage from "./pages/LandingPage"
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/share/:shareLink" element={<SharePage />} />
    </Routes>
  </BrowserRouter>
}

export default App