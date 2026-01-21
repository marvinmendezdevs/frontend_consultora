import { GraduationCap, NotebookText } from "lucide-react"

type TeacherSectionProgressProps = {
    data: {
        totalTeacherAccess: number;
        totalTeacher: number;
        totalTeacherSectionsAccess: number;
        totalTeacherSections: number;
    }
}

function TeacherSectionProgress({ data }: TeacherSectionProgressProps) {
    const calculatePercentage = (total: number, access: number) => {
        if (total === 0) return "0.00";
        return ((access / total) * 100).toFixed(2);
    }

    return (
        <div className="my-3 grid gap-4 md:grid-cols-2">
            <div className="p-3 rounded-lg bg-gray-100 shadow-inner">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-200 p-3 text-indigo-600 rounded-lg">
                        <GraduationCap size={30} />
                    </div>
                    <div>
                        <p className="uppercase text-xs text-slate-600">Docentes registrados</p>
                        <p className="text-xl font-bold">{data.totalTeacherAccess}/{data.totalTeacher} con acceso</p>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="h-3 bg-gray-300 rounded-lg overflow-hidden">
                        <div className="h-3 bg-indigo-600 rounded-lg" style={{ width: `${calculatePercentage(data.totalTeacher, data.totalTeacherAccess)}%` }}></div>
                    </div>
                    <p className="text-sm mt-1 text-slate-600">
                        {calculatePercentage(data.totalTeacher, data.totalTeacherAccess)}% verificados {" "}
                        ({data.totalTeacher - data.totalTeacherAccess} pendientes)
                    </p>
                </div>
            </div>

            <div className="p-3 rounded-lg bg-gray-100 shadow-inner">
                <div className="flex items-center gap-3">
                    <div className="bg-green-200 p-3 text-green-600 rounded-lg">
                        <NotebookText size={30} />
                    </div>
                    <div>
                        <p className="uppercase text-xs text-slate-600">Secciones registradas</p>
                        <p className="text-xl font-bold">{data.totalTeacherSectionsAccess}/{data.totalTeacherSections} con acceso</p>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="h-3 bg-gray-300 rounded-lg">
                        <div className="h-3 bg-green-600 rounded-lg" style={{ width: `${calculatePercentage(data.totalTeacherSections, data.totalTeacherSectionsAccess)}%` }}></div>
                    </div>
                    <p className="text-sm mt-1 text-slate-600">
                        {calculatePercentage(data.totalTeacherSections, data.totalTeacherSectionsAccess)}% verificados {" "}
                        ({data.totalTeacherSections - data.totalTeacherSectionsAccess} pendientes)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TeacherSectionProgress