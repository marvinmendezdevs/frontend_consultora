import type { TeacherTutorType } from "@/types/tutorship.types";
import TeacherAccessListItem from "./TeacherAccessListItem";
import { BookOpen, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

type TeacherCardToAccessProps = {
    teacher: TeacherTutorType
}

function TeacherCardToAccess({ teacher }: TeacherCardToAccessProps) {
    const [isOpen, setIsOpen] = useState(false);

    const checkPendingAssignment = (array: TeacherTutorType['assignments']) => array.filter(section => !section.access).length

    return (
        <div className="rounded-lg shadow overflow-hidden">
            <div className="flex items-center gap-2 p-3 pb-5 rounded-lg hover:bg-gray-100" key={teacher.id}>
                <div className="flex items-center justify-center size-10 rounded-full bg-indigo-600 text-white border-2 border-green-600">
                    {teacher.name[0]}
                </div>
                <div className="flex-1">
                    <p className="font-bold">{teacher.name}</p>
                    <div className="text-slate-500 text-xs flex items-center gap-2">
                        <p className="flex gap-1 items-center">
                            <BookOpen size={12} />
                            <span>
                                {teacher.assignments.length} secciones
                            </span>
                        </p>

                        <p className="flex gap-1 items-center bg-orange-100 text-orange-600 py-0.5 px-2 rounded-full">
                            <Info size={12} />
                            {checkPendingAssignment(teacher.assignments)} pendientes
                        </p>
                    </div>
                </div>
                {isOpen ? (
                    <button className="text-slate-500 cursor-pointer active:scale-95"
                        onClick={() => setIsOpen(false)}
                    >
                        <ChevronUp />
                    </button>
                ) : (
                    <button className="text-slate-500 cursor-pointer active:scale-95"
                        onClick={() => setIsOpen(true)}
                    >
                        <ChevronDown />
                    </button>
                )}
            </div>
            <ul className={`${isOpen ? 'block' : 'hidden'} p-3 border-t border-gray-200 divide-y divide-gray-100`}>
                {teacher.assignments.map(assignment => (
                    <TeacherAccessListItem
                        key={assignment.id}
                        assignment={assignment}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TeacherCardToAccess