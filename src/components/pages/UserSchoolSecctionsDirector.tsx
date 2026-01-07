import type { SchoolInfo, SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import { BookOpen, Moon, Sun } from "lucide-react";

function UserSchoolSecctionsDirector({ school, director }: { school: SchoolInfo, director: SchoolInfoWithUsers['userSchool'][number] }) {

    console.log(school.sections);
    const directorDui = director.user.dui;

    return (
        <>
        <div className="flex items-center justify-between">
            <p className="text-xl font-semibold my-2">Secciones</p>
            <button className="px-2 py-1 rounded border border-red-500 bg-red-50 text-red-500 hover:cursor-pointer disabled:opacity-50 text-xs font-semibold">Agregar Sección</button>
        </div>
            <div className="flex flex-col gap-2 overflow-y-auto table-fixed w-full h-[200px]">
                {school?.sections?.map((item: any) => (
                    item.assignments.map((assignment: any) => (
                        assignment.teacher.dui === directorDui && (
                            <div key={assignment.id} className="flex items-center justify-between border border-gray-100 rounded p-2 gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border bg-blue-50 text-blue-600 border-blue-100"><BookOpen className="size-5" /></div>
                                    <div className="flex flex-col">
                                            {assignment.subject === 'Matem_tica' ? (
                                                <p className="text-gray-800">Matemática</p>
                                            ):(
                                                <p className="text-gray-800">{assignment.subject}</p>
                                            )}
                                        <div className="flex gap-2 items-center mt-1">
                                            <p className="text-xs bg-gray-100 p-1 rounded text-gray-600 uppercase"><span> Grado {item.grade}°</span> . <span>{item.sectionClass}</span></p>
                                            {
                                                item.shift === 'Matutino' ? (
                                                    <p className="flex gap-1 items-center text-xs bg-gray-100 p-1 rounded text-gray-600 uppercase"><Sun className="size-4 text-yellow-500" />{item.shift}</p>
                                                ) : (
                                                    <p className="flex items-center text-xs bg-gray-100 p-1 rounded text-gray-600 uppercase"><Moon className="size-4 text-indigo-500" />{item.shift}</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                <p className="px-2 py-1 rounded border border-red-500 bg-red-50 text-red-500 hover:cursor-pointer disabled:opacity-50 text-xs font-semibold">Eliminar</p> 
                            </div>
                        )
                    ))
                ))}
            </div>
        </>
    );
}

export default UserSchoolSecctionsDirector;