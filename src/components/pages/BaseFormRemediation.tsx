import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function BaseFormRemediation() {
    const dataSection = useLocation();
    const data = dataSection.state;

    console.log(data);  
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-indigo-600">Formulario</h1>
                <Link to={`/schools/${data.schoolCode}/remediation`} className="text-indigo-700 bg-indigo-50 px-2 py-1 rounded-sm">Regresar</Link>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Grado</label>
                    <input type="text" disabled={data.grade} defaultValue={data.grade} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" />
                </div>

                <div>
                    <label className="text-sm font-medium">Sección</label>
                    <input type="text" disabled={data.sectionClass} defaultValue={data.sectionClass} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" />
                </div>

                <div>
                    <label className="text-sm font-medium">Turno</label>
                    <input type="text" disabled={data.shift} defaultValue={data.shift} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" />
                </div>

                <div>
                    <label className="text-sm font-medium">Materia</label>
                    <div className="flex gap-4"> 
                        <input type="text" defaultValue={data.activityLabel === "Refuerzo Lenguaje" ? "Lenguaje" : "Matemática" } disabled={data.activityLabel} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" /> 
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-sm font-medium">Nombre completo del docente</label>
                    <input type="text" placeholder="Nombre completo" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="text-sm font-medium">Teléfono</label>
                    <input type="text" placeholder="Ej. 8888-8888" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="text-sm font-medium">DUI</label>
                    <input type="text" placeholder="Ej. 123456789" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>
                <div>
                    <label className="text-sm font-medium">Especialidad (SIGES)</label>
                    <input type="text" placeholder="Debe coincidir con SIGES" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>

                <div>
                    <label className="text-sm font-medium">Correo institucional</label>
                    <input type="email" placeholder="usuario@clases.edu.sv" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
                </div>

            </form>
            <div className="text-end">
                <button type="submit" className="border border-indigo-600 text-indigo-600 bg-indigo-50 px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-600 mt-5 cursor-pointer">Actualizar</button>
            </div>
        </div>
    );
}

export default BaseFormRemediation;