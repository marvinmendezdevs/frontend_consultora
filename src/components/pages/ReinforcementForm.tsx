import { Link, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import type { SectionItem } from "@/types/schoolmanagement.type";
import { useState } from "react";

function ReinforcementForm() {
    const dataSection = useLocation();
    const dataSectionItem = dataSection.state;

  const [dataSections, setDataSections] = useState<SectionItem | null>(null);
  console.log(dataSections);

  const { register, handleSubmit} = useForm<SectionItem>({
    defaultValues: {
    grade: "",
    sectionClass: "",
    shift: "",
    subtrack: "",
    track: "",
    schoolCode: "",
    name: "",
    phone: "",
    dui: "",
    speciality: "",
    email: "",
    activityLabel: "",
    kind: "reinforcement"
  }
  });

    const onSubmit = (data: SectionItem) => {
        const payload: SectionItem = {
            id: data.id,
            grade: data.grade,
            sectionClass: data.sectionClass,
            shift: data.shift,
            subtrack: data.subtrack,
            track: data.track,
            schoolCode: data.schoolCode,
            name: data.name,
            phone: data.phone,
            dui: data.dui,
            speciality: data.speciality,
            email: data.email,
            activityLabel: data.activityLabel,
            kind: data.kind
        }

        setDataSections(payload);
    };
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-indigo-600">Formulario de refuerzo</h1>
                <Link to={`/schools/${dataSectionItem.schoolCode}/remediation`} className="text-indigo-700 bg-indigo-50 px-2 py-1 rounded-sm">Regresar</Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Grado</label>
                    <input type="text" disabled={dataSectionItem.grade} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" {...register("grade")}/>
                </div>

                <div>
                    <label className="text-sm font-medium">Sección</label>
                    <input type="text" disabled={dataSectionItem.sectionClass} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" {...register("sectionClass")}/>
                </div>

                <div>
                    <label className="text-sm font-medium">Turno</label>
                    <input type="text" disabled={dataSectionItem.shift} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" {...register("shift")}/>
                </div>

                <div>
                    <label className="text-sm font-medium">Tipo de refuerzo</label>
                    <div className="flex gap-4"> 
                        <input type="text" value={dataSectionItem.activityLabel === "Refuerzo Lenguaje" ? "Lenguaje" : "Matemática" } disabled={dataSectionItem.activityLabel} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-800" {...register("activityLabel")}/>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="text-sm font-medium">Nombre completo del docente</label>
                    <input type="text" placeholder="Nombre completo" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" {...register("name")}/>
                </div>
                <div>
                    <label className="text-sm font-medium">Teléfono</label>
                    <input type="text" placeholder="Ej. 8888-8888" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" {...register("phone")}/>
                </div>
                <div>
                    <label className="text-sm font-medium">DUI</label>
                    <input type="text" placeholder="Ej. 123456789" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" {...register("dui")}/>
                </div>
                <div>
                    <label className="text-sm font-medium">Especialidad (SIGES)</label>
                    <input type="text" placeholder="Debe coincidir con SIGES" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" {...register("speciality")}/>
                </div>

                <div>
                    <label className="text-sm font-medium">Correo institucional</label>
                    <input type="email" placeholder="usuario@clases.edu.sv" className="w-full border border-gray-300 rounded px-3 py-2 text-sm" {...register("email")}/>
                </div>

                <div className="text-end col-span-2">
                    <button type="submit" className="border border-indigo-600 text-indigo-600 bg-indigo-50 px-4 py-2 rounded hover:bg-indigo-100 hover:text-indigo-600 mt-5 cursor-pointer">Guardar</button>
                </div>
            </form>
        </div>
    );
}

export default ReinforcementForm;