import useAuth from "@/hooks/useAuth.hooks";
import { Building2, Info, Users, Wifi, Zap } from "lucide-react";

function FuncionamientoCe() {
      const { data: user } = useAuth();

  return (
    <>
      <div>
        <div className="bg-gray-900 rounded-t-xl px-4 py-6 col-span-2">
            <h1 className="text-white font-bold text-xl text-center">Funcionamiento del Centro Escolar</h1>
            <p className="text-center text-gray-300 mb-5">Por favor, seleccione las opciones que describan la situación actual de su centro escolar.</p>
            <div className="flex justify-center">
                <Info className="-mb-12 size-13 bg-indigo-500 text-white p-2 rounded-xl border-4 border-white"/>
            </div>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="col-span-2 md:col-span-1">
                <div className="flex gap-2 items-center mb-3">
                    <Building2 className="size-5 text-indigo-700" />
                    <label className="font-bold text-gray-700">1. Infraestructura funcional</label>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly gap-5 w-full">
                    <div className="flex justify-between items-center w-full gap-5 p-2 rounded-lg border border-gray-200 text-center">
                        <label>Si</label>
                        <input type="radio" className="cursor-pointer"/>
                    </div>
                    <div className="flex justify-between items-center w-full gap-5 p-2 rounded-lg border border-gray-200 text-center">
                        <label>No</label>
                        <input type="radio"  className="cursor-pointer"/>
                    </div>
                </div>
            </div>
            <div className="col-span-2 md:col-span-1">
                <div className="flex gap-2 items-center mb-3">
                    <Zap className="size-5 text-indigo-700" />
                    <label className="font-bold text-gray-700">2. Servicios básicos</label>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly gap-5">
                    <div className="w-full flex justify-between gap-5 p-2 rounded-lg border border-gray-200">
                        <label>Electricidad</label>
                        <input type="checkbox" className="cursor-pointer"/>
                    </div>
                    <div className="w-full flex justify-between gap-5 p-2 rounded-lg border border-gray-200">
                        <label>Agua potable</label>
                        <input type="checkbox" className="cursor-pointer"/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col col-span-2">
                <div className="flex gap-2 items-center mb-3">
                    <Wifi className="size-5 text-indigo-700"/>
                    <label className="font-bold text-gray-700">3. Estado de internet</label>
                </div>
                <select className="p-2 rounded-lg border border-gray-200">
                    <option value="">Seleccione</option>
                    <option value="Sin conexión">Sin conexión</option>
                    <option value="Intermitente">Intermitente</option>
                    <option value="Baja velocidad">Baja velocidad</option>
                    <option value="Funcional">Funcional</option>
                </select>
            </div>
            <div className="flex gap-2 items-center col-span-2">
                <Users className="size-5 text-indigo-700" />
                <label className="font-bold text-gray-700">4. Asistencia docente</label>
            </div>
            <div className="flex flex-col md:flex-row md:col-span-2 w-full md:gap-5 -mt-6">
                <div className="flex flex-col w-full">
                    <label className="text-green-700 font-semibold">Presentes</label>
                    <input id="presentes" type="number" placeholder="Ej. 20" min={0} className="flex flex-col gap-5 p-2 rounded-lg border border-gray-200 w-full"/>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-red-700 font-semibold">No presentes</label>
                    <input id="nopresentes" type="number" placeholder="Ej. 20" min={0} className="flex flex-col gap-5 p-2 rounded-lg border border-gray-200"/>
                </div>
            </div>
            <div className="flex justify-end col-span-2">
                <button className="bg-indigo-50 border border-indigo-500 text-indigo-700 rounded-xl p-2 text-sm hover:bg-indigo-500 hover:text-white cursor-pointer transform transition-all hover:transform">Registrar reporte</button>
            </div>
        </form>
      </div>
    </>
  )
}

export default FuncionamientoCe
