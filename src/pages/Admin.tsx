import AdminDashboardGeneral from "@/components/pages/AdminDashboardGeneral";
import AdminDashboardGestionEscolar from "@/components/pages/AdminDashboardGestionEscolar";
import AdminDashboardTutoriaFormacion from "@/components/pages/AdminDashboardTutoriaFormacion";
import { useState } from "react";
import { GraduationCap, LayoutGrid, School } from "lucide-react";

interface adminProps {
    id: number,
    label: string
    icon:React.ReactNode
}

function Admin() {
  const pages: adminProps[] = [
    { id: 1, label: "General", icon:<LayoutGrid className="size-4"/>},
    { id: 2, label: "Gestión Escolar", icon:<School className="size-4" />},
    { id: 3, label: "Tutoría y formación", icon:<GraduationCap className="size-4" />},
  ];

  const[active, setActive] = useState<number>(1)
  const content: Record<number, React.ReactNode> = {
    1: <AdminDashboardGeneral/>,
    2: <AdminDashboardGestionEscolar/>,
    3: <AdminDashboardTutoriaFormacion/>
  }

  return (
    <div>
       <div className="flex justify-center mb-5">
            <div className="flex flex-col md:flex-row justify-center items-center bg-gray-100 p-1 rounded-lg w-full md:w-auto">
                {pages.map(item => (
                    <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`transition-colors cursor-pointer p-2 rounded-lg flex items-center justify-center gap-1 w-full md:w-auto text-sm ${ active === item.id ? "bg-white text-gray-700 transition-colors" : "text-slate-400"
                    }`}>
                    {item.icon}
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
