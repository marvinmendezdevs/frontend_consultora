import { BrowserRouter, Routes, Route } from "react-router"
import Login from "./pages/Login"
import AppLayout from "./components/layouts/AppLayout"
import ProtectedRoute from "./components/layouts/ProtectedRoute"

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
