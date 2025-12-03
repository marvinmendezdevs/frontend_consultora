import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./pages/Login"
import AppLayout from "./components/layouts/AppLayout"

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
