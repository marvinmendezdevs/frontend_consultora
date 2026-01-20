import type { SchoolInfoWithUsers, SectionItem } from "@/types/schoolmanagement.type";
import type { UserType } from "@/types/auth.types";
import { BookOpen, ChevronDown, Sun } from "lucide-react";
import { useState } from "react";

type sections = SchoolInfoWithUsers['sections']

interface Selection {
    sectionId: number;
    subject: string;
}

type UserSchoolSecctionsDirectorProps = {
    sections: sections
    user?: UserType
}


function AddSectionsTeacher({user, sections }: UserSchoolSecctionsDirectorProps) {
    console.log(sections)

    const [selectedAssignments, setSelectedAssignments] = useState<Selection[]>([]);

    const secctionsGroup = sections.reduce((acc, item) => {
        const grade = +item.grade;
        if (!acc[grade]) {
            acc[grade] = []
        }
        acc[grade].push(item);
        return acc
    }, {} as Record<string, SectionItem[]>)

    const toggleSelection = (sectionId: number, subject: string) => {
        setSelectedAssignments((prev) => {
            const exists = prev.find(seccion => seccion.sectionId === sectionId && seccion.subject === subject);
            if (exists) {
                return prev.filter(seccion => !(seccion.sectionId === sectionId && seccion.subject === subject));
            } else {
                return [...prev, { sectionId, subject }];
            }
        });
    };

    const isSelected = (sectionId: number, subject: string) => 
        selectedAssignments.some(seccion => seccion.sectionId === sectionId && seccion.subject === subject);

    const handleSave = () => {
        const payload = {
            user: user?.id,
            assigments: selectedAssignments
        }
        console.log(payload);
    }

    return (
        <>
            <h2 className="text-2xl mb-3 font-semibold">Secciones del centro escolar</h2>
            <div className="flex flex-col gap-2">
                {sections.length > 0 ? (
                    Object.keys(secctionsGroup).map((grade, index) => (
                        <div className="border border-gray-200 rounded-lg p-3" key={index}>
                            <details className="group transition-all">
                                <summary className="flex justify-between items-center hover:cursor-pointer">
                                    <div className="flex gap-3 items-center">
                                        <span className="bg-indigo-100 px-3 py-2 rounded-lg text-indigo-800 text-xl font-bold">{grade}°</span>
                                        <p className="text-gray-600">{secctionsGroup[grade].length} Secciones registradas</p>
                                    </div>
                                    <ChevronDown className="transition-all duration-400 group-open:rotate-180" />
                                </summary>
                                <div className="flex flex-col w-full gap-2 mt-5">
                                    {secctionsGroup[grade].map((seccions) => (
                                        <div className="border border-gray-200 rounded-lg bg-gray-50/90 p-4" key={seccions.id}>
                                            <div className="font-bold flex items-center gap-4 mb-4">
                                                <p className="text-lg">Sección {seccions.sectionClass}</p>
                                                <div className={`flex items-center rounded-lg p-1 font-normal text-xs ${seccions.shift === "Matutino" ? "bg-yellow-100 text-yellow-700" : "bg-indigo-100 text-indigo-700"}`}>
                                                    <Sun className="size-4 mr-1"/>{seccions.shift}
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-4 flex-col md:flex-row w-full my-3">
                                                <div 
                                                    onClick={() => toggleSelection(seccions.id, "Lenguaje")}
                                                    className={`border transition-all w-full p-4 rounded-lg flex justify-evenly gap-3 items-center cursor-pointer ${isSelected(seccions.id, "Lenguaje") ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-gray-300 bg-white"}`}
                                                >
                                                    <p className={`p-2 rounded-full ${isSelected(seccions.id, "Lenguaje") ? "bg-indigo-200" : "bg-gray-100"}`}>
                                                        <BookOpen className={`size-4 ${isSelected(seccions.id, "Lenguaje") ? "text-indigo-700" : "text-gray-400"}`}/>
                                                    </p>
                                                    <div className="flex flex-col">
                                                        <p className="font-bold text-gray-600">Lenguaje</p>
                                                        <p className="font-semibold text-[10px] text-gray-400 uppercase">
                                                            {isSelected(seccions.id, "Lenguaje") ? "Seleccionado" : "Click para marcar"}
                                                        </p>
                                                    </div>
                                                    <input type="checkbox" checked={isSelected(seccions.id, "Lenguaje")} readOnly className="cursor-pointer accent-indigo-600"/>
                                                </div>

                                                <div onClick={() => toggleSelection(seccions.id, "Matemática")}
                                                    className={`border transition-all w-full p-4 rounded-lg flex justify-evenly gap-3 items-center cursor-pointer ${isSelected(seccions.id, "Matemática") ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-gray-300 bg-white"}`}>

                                                    <p className={`p-2 rounded-full ${isSelected(seccions.id, "Matemática") ? "bg-indigo-200" : "bg-gray-100"}`}>
                                                        <BookOpen className={`size-4 ${isSelected(seccions.id, "Matemática") ? "text-indigo-700" : "text-gray-400"}`}/>
                                                    </p>
                                                    <div className="flex flex-col">
                                                        <p className="font-bold text-gray-600">Matemática</p>
                                                        <p className="font-semibold text-[10px] text-gray-400 uppercase">
                                                            {isSelected(seccions.id, "Matemática") ? "Seleccionado" : "Click para marcar"}
                                                        </p>
                                                    </div>
                                                    <input type="checkbox" checked={isSelected(seccions.id, "Matemática")} readOnly className="cursor-pointer accent-indigo-600"/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex w-full md:justify-end mt-2">
                                        <button onClick={handleSave} disabled={selectedAssignments.length === 0} className="w-full md:w-auto cursor-pointer disabled:bg-gray-300 font-normal text-sm hover:bg-blue-100 hover:text-blue-900 bg-white border border-blue-200 text-blue-800 hover:border-transparent py-2 px-6 rounded-lg transition-colors">
                                            Guardar {selectedAssignments.length > 0 && `(${selectedAssignments.length})`}
                                        </button>
                                    </div>
                                </div>
                            </details>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-10 text-gray-500">No hay secciones para este Centro Escolar</p>
                )}
            </div>
        </>
    );
}

export default AddSectionsTeacher;