import Tutorship from "@/components/pages/Tutorship";
import useAuth from "@/hooks/useAuth.hooks";
import { Navigate } from "react-router";
import MonitorDashboard from "@/components/pages/MonitorDashboard";
import FacilitadoresHome from "./FacilitadoresHome";
import CoordinatorFacilitatorDashboard from "@/components/pages/CoordinatorFacilitatorDashboard";
function Home() {
  const { data: user } = useAuth();

  if (!user) return <Navigate to="/login" replace />

  if (user.role.name === 'Tutor' || user.role.name === 'Tutor (Supervisor)') return <Tutorship />

  if (user.role.name === 'Monitor (Gestión Escolar)') return <MonitorDashboard />

  if (user.role.name === 'Facilitador (Gestión Escolar)') return <FacilitadoresHome />
  
  if (user.role.name === 'Coordinador de facilitadores (Gestión escolar)') return <CoordinatorFacilitatorDashboard />

  return <p>Acceso denegado</p>
}

export default Home;