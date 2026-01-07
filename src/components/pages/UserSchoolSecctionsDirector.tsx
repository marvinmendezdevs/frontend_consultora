import type { SchoolInfo, SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import { BookOpen, Moon, Sun, Plus } from "lucide-react";
import { useState } from "react";
import AddSeccionUserSchool from "./AddSeccionUserSchool";

function UserSchoolSecctionsDirector({
    school,
    director,
}: {
    school: SchoolInfo;
    director: SchoolInfoWithUsers["userSchool"][number];
}) {
    const directorDui = director.user.dui;

    const [openAdd, setOpenAdd] = useState(false);

    const handleAdd = (payload: { sectionId: number; subject: "Lenguaje" | "Matem_tica" }) => {
        // Aquí mandás a tu backend o hacés mutation
        // payload.sectionId
        // payload.subject
        console.log("AGREGAR:", payload);
    };

    return (
        <>
            <div className="flex items-center justify-between my-6">
                <p className="text-xl font-semibold my-2">Secciones</p>

                <button
                    type="button"
                    onClick={() => setOpenAdd(true)}
                    className="flex items-center gap-1 px-1 rounded border border-blue-500 bg-blue-50 text-blue-500 hover:cursor-pointer disabled:opacity-50 text-xs font-semibold"
                >
                    <Plus /> Agregar
                </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto table-fixed w-full h-[200px]">
                {school?.sections?.map((item: any) =>
                    item.assignments.map((assignment: any) =>
                        assignment.teacher.dui === directorDui ? (
                            <div
                                key={assignment.id}
                                className="flex items-center justify-between border border-gray-100 rounded p-2 gap-2"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border bg-blue-50 text-blue-600 border-blue-100">
                                        <BookOpen className="size-5" />
                                    </div>

                                    <div className="flex flex-col">
                                        {assignment.subject === "Matem_tica" ? (
                                            <p className="text-gray-800">Matemática</p>
                                        ) : (
                                            <p className="text-gray-800">{assignment.subject}</p>
                                        )}

                                        <div className="flex gap-2 items-center mt-1">
                                            <p className="text-xs bg-gray-100 p-1 rounded text-gray-600 uppercase">
                                                <span> Grado {item.grade}°</span> . <span>{item.sectionClass}</span>
                                            </p>

                                            {item.shift === "Matutino" ? (
                                                <p className="flex gap-1 items-center text-xs bg-gray-100 p-1 rounded text-gray-600 uppercase">
                                                    <Sun className="size-4 text-yellow-500" />
                                                    {item.shift}
                                                </p>
                                            ) : (
                                                <p className="flex items-center text-xs bg-gray-100 p-1 rounded text-gray-600 uppercase">
                                                    <Moon className="size-4 text-indigo-500" />
                                                    {item.shift}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button className="px-2 py-1 rounded border border-red-500 bg-red-50 text-red-500 hover:cursor-pointer disabled:opacity-50 text-xs font-semibold">
                                    Eliminar
                                </button>
                            </div>
                        ) : null
                    )
                )}
            </div>

            <AddSeccionUserSchool
                isOpen={openAdd}
                onClose={() => setOpenAdd(false)}
                sections={school.sections as any}
                directorDui={director.user.dui}
                onSubmit={handleAdd}
            />
        </>
    );
}

export default UserSchoolSecctionsDirector;
