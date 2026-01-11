import { setAccessTeacher } from "@/services/teacher.services";
import type { AssignmentType } from "@/types/tutorship.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TeacherAccessListItemProps = {
    assignment: AssignmentType
}

function TeacherAccessListItem({ assignment }: TeacherAccessListItemProps) {
    const validateValidName = (string: string) => string === 'none' ? '' : string

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["access-teacher"],
        mutationFn: setAccessTeacher,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["teacherBySchool"]
            });
        }
    });

    const handleActiveAccess = (sectionId: AssignmentType['id']) => {
        mutation.mutate(sectionId);
    }

    const checkGrade = (grade: number): string => {

    const highSchoolYears: Record<number, string> = {
        10: '1er. Año de Bachillerato',
        11: '2do. Año de Bachillerato',
        12: '3er. Año de Bachillerato'
    };

    return highSchoolYears[grade] ?? `${grade}º Grado`;
}

    return (
        <li key={assignment.id}>
            <div className="flex items-center justify-between">
                <div className="p-3">
                    <div className="font-semibold flex items-center gap-2">
                        <p>
                            {checkGrade(Number(assignment.section.grade))} {validateValidName(assignment.section.track)}  "{assignment.section.sectionClass}"
                        </p>
                        <span className="text-[10px] font-normal border border-gray-300 p-0.5 rounded">
                            {assignment.subject}
                        </span>
                    </div>
                    <p className="text-xs text-slate-600">
                         {validateValidName(assignment.section.subtrack)} • {assignment.section.shift}
                    </p>
                </div>

                {assignment.access ? (
                    <p className="italic text-xs text-green-600">Acceso verificado</p>
                ) : (
                    <button className="border border-indigo-300 text-indigo-600 font-semibold shadow-xs text-xs py-2 px-5 rounded-lg cursor-pointer transition hover:bg-indigo-100 active:scale-95 disabled:opacity-50 shadow-indigo-100 hover:shadow-indigo-200"
                        onClick={() => handleActiveAccess(assignment.id)}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Guardando..." : "Aprobar"}
                    </button>
                )}
            </div>
        </li>
    )
}

export default TeacherAccessListItem