import type { SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import type { UserType } from "@/types/auth.types";
import { Plus, Trash } from "lucide-react";
import { useMemo, useState } from "react";

type sections = SchoolInfoWithUsers['sections']

type UserSchoolSecctionsDirectorProps = {
    sections: sections
    user?: UserType
}

type newDirectorSection = {
    subject: string
    sectionId: number
}

// type Assignaments = SchoolInfoWithUsers['sections'][0]['assignments']

function UserSchoolSecctionsDirector({ sections }: UserSchoolSecctionsDirectorProps) {
    const [assignmentsSections, setAssignmentsSections] = useState<newDirectorSection[]>([]);

    const handleAddSubjectSection = (subject: string, sectionId: number) => {
        const existingSection = assignmentsSections.some(section => section.sectionId === sectionId && section.subject === subject);

        if (!existingSection) {
            setAssignmentsSections(prev => [...prev, { subject, sectionId }]);
        }
    }

    const sectionsToView = useMemo(() => {
        return assignmentsSections.flatMap(assignment => {

            const matches = sections.filter(section => section.id === assignment.sectionId);

            return matches.map(s =>
                `${s.grade}o. grado, ${s.track === 'none' ? "" : s.track} ${s.subtrack === 'none' ? "" : s.subtrack} "${s.sectionClass}" - ${s.shift} - ${assignment.subject}`
            );
        });

    }, [sections, assignmentsSections]);

    const handleDeleteSection = (subject: string, sectionId: number) => {
        setAssignmentsSections(prev =>
            prev.filter(section =>
                !(section.sectionId === sectionId && section.subject === subject)
            )
        );
    }

    const handleSaveSections = () => {
        const data = {
            // roleId: user?.role.name ?? 'usuario',
            sections: sectionsToView
        }
        console.log(data);
    }


    return (
        <>
            <h2 className="text-2xl mb-3">Secciones del centro escolar</h2>

            {assignmentsSections.length > 0 && (
                <div className="mb-5 bg-gray-100 p-3 rounded-lg">
                    <p className="text-indigo-600 mb-3">Secciones que atiende el usuario</p>
                    <div className="font-normal">
                        {sectionsToView.map((string, index) => (
                            <p key={index}>{index + 1}. {string}</p>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button className="bg-indigo-600 text-white p-2 rounded-lg text-xs cursor-pointer hover:bg-indigo-700"
                            onClick={handleSaveSections}
                        >
                            Guardar secciones
                        </button>
                    </div>
                </div>
            )}

            <div className="font-normal divide-y divide-gray-100 overflow-x-auto max-h-72">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Grado</th>
                            <th className="p-2">Tipo</th>
                            <th className="p-2">Opción</th>
                            <th className="p-2">Sección</th>
                            <th className="p-2">Turno</th>
                            <th className="p-2">Atiende</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-300">
                        {sections.map(section => (
                            <tr key={section.id}>
                                <td className="text-center p-2">{section.grade}</td>
                                <td className="text-center p-2">{section.track}</td>
                                <td className="text-center p-2">{section.subtrack}</td>
                                <td className="text-center p-2">"{section.sectionClass}"</td>
                                <td className="text-center p-2">{section.shift}</td>
                                <td className="text-center p-2">
                                    <table className="w-full">
                                        <tbody className="divide-y divide-dashed divide-slate-300">
                                            <tr>
                                                <td className="p-1">Matemática</td>
                                                <td className="p-1 flex justify-center">
                                                    <button className="flex items-center gap-2 text-indigo-600 p-1 rounded-lg cursor-pointer hover:bg-indigo-100/25"
                                                        onClick={() => handleAddSubjectSection("Matemática", section.id)}
                                                    >
                                                        <Plus size={10} />
                                                        Agregar
                                                    </button>
                                                </td>
                                                <td className="p-1 flex justify-center">
                                                    <button className="flex items-center gap-2 text-red-600 p-1 rounded-lg cursor-pointer hover:bg-indigo-100/25"
                                                        onClick={() => handleDeleteSection("Matemática", section.id)}
                                                    >
                                                        <Trash size={10} />
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-1">Lenguaje</td>
                                                <td className="p-1 flex justify-center">
                                                    <button className="flex items-center gap-2 text-indigo-600 p-1 rounded-lg cursor-pointer hover:bg-indigo-100/25"
                                                        onClick={() => handleAddSubjectSection("Lenguaje", section.id)}
                                                    >
                                                        <Plus size={10} />
                                                        Agregar
                                                    </button>
                                                </td>
                                                <td className="p-1 flex justify-center">
                                                    <button className="flex items-center gap-2 text-red-600 p-1 rounded-lg cursor-pointer hover:bg-indigo-100/25"
                                                        onClick={() => handleDeleteSection("Lenguaje", section.id)}
                                                    >
                                                        <Trash size={10} />
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default UserSchoolSecctionsDirector;
