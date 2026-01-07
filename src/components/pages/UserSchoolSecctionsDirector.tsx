import type { SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import { BookOpen, Moon, Sun, Plus } from "lucide-react";
import { useState } from "react";
import AddSeccionUserSchool from "./AddSeccionUserSchool";

function UserSchoolSecctionsDirector({ school, }: {
    school: SchoolInfoWithUsers;
}) {

    console.log(school);

    const [openAdd, setOpenAdd] = useState(false);

    return (
        <div className="my-5 p-2 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-semibold my-2">Secciones</p>

                <button
                    type="button"
                    onClick={() => setOpenAdd(true)}
                    className="flex items-center gap-1 px-1 rounded border border-blue-500 bg-blue-50 text-blue-500 hover:cursor-pointer disabled:opacity-50 text-xs font-semibold"
                >
                    <Plus /> Agregar
                </button>
            </div>
            <div className="max-h-[250px] overflow-y-auto">
                {school?.sections?.map((item: any) =>
                    item.assignments.map((assignment: any) =>
                        assignment && assignment.isDirector ? (
                            <div className="flex flex-col gap-2 overflow-y-auto table-fixed w-full divide-y divide-gray-100">
                            <div
                                key={assignment.id}
                                className="flex items-center justify-between py-4"
                            >
                                <div className="flex items-center gap-2 w-full">
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
                        </div>
                        ) : null
                    )
                )}
                </div>

            <AddSeccionUserSchool
                isOpen={openAdd}
                onClose={() => setOpenAdd(false)}
                sections={school.sections as any}
                schoolCode={school.code}
                teacher={school}
            />
        </div>
    );
}

export default UserSchoolSecctionsDirector;
