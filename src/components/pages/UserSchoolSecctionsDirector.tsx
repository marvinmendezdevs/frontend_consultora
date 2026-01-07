import type { SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import type { UserType } from "@/types/auth.types";
import { Plus, Trash } from "lucide-react";

type UserSchoolSecctionsDirectorProps = {
    sections: SchoolInfoWithUsers['sections']
    director?: UserType
}

type Assignaments = SchoolInfoWithUsers['sections'][0]['assignments']

function UserSchoolSecctionsDirector({ sections, director }: UserSchoolSecctionsDirectorProps) {

    const verifyAttendSection = (assignaments: Assignaments) => {
        const isAttendendByDirector = assignaments.filter(section => section.isDirector);

        console.log(isAttendendByDirector)
        return isAttendendByDirector;
    }
    return (
        <>
            <div>
                <h2>Secciones del centro escolar</h2>
            </div>
            <div className="font-normal divide-y divide-gray-100">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Grado</th>
                            <th className="p-2">Tipo</th>
                            <th className="p-2">Opción</th>
                            <th className="p-2">Sección</th>
                            <th className="p-2">Turno</th>
                            <th className="p-2">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {sections.map(section => (
                            <tr key={section.id}>
                                <td className="text-center">{section.grade}</td>
                                <td className="text-center">{section.track}</td>
                                <td className="text-center">{section.subtrack}</td>
                                <td className="text-center">"{section.sectionClass}"</td>
                                <td className="text-center">{section.shift}</td>
                                <td className="text-center">
                                    {!verifyAttendSection(section.assignments) ? (
                                        <button className="text-xs flex items-center gap-1 text-indigo-500">
                                            <Plus size={10} />
                                            <span>Agregar</span>
                                        </button>
                                    ) : (
                                        <button className="text-xs flex items-center gap-1 text-red-500">
                                            <Trash size={10} />
                                            <span>eliminar</span>
                                        </button>
                                    )}
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
