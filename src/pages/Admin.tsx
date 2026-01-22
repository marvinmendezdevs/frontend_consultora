import AdminDashboardGeneral from "@/components/pages/AdminDashboardGeneral";
import AdminDashboardGestionEscolar from "@/components/pages/AdminDashboardGestionEscolar";
import AdminDashboardTutoriaFormacion from "@/components/pages/AdminDashboardTutoriaFormacion";
import { useState } from "react";

interface adminProps {
    id: number,
    label: string
}

function Admin() {
  const pages: adminProps[] = [
    { id: 1, label: "General"},
    { id: 2, label: "Gestión Escolar"},
    { id: 3, label: "Tutoría y formación"},
  ];

  const[active, setActive] = useState<number>(1)
  const content: Record<number, React.ReactNode> = {
    1: <AdminDashboardGeneral/>,
    2: <AdminDashboardGestionEscolar/>,
    3: <AdminDashboardTutoriaFormacion/>
  }

  return (
    <div>
       <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-lg">
                {pages.map(item => (
                    <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`transition-colors cursor-pointer p-2 rounded-lg ${ active === item.id ? "bg-gray-200 text-gray-700 transition-colors" : "text-slate-400"
                    }`}>
                    {item.label}
                    </button> 
                ))}
            </div>
       </div>
       <div>
        {content[active]}
       </div>
    </div>
  )
}

export default Admin
