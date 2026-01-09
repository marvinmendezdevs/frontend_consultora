import { setAccessTeacher } from "@/services/teacher.services";
import type { TeacherType } from "@/types/index.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type TeacherCardToAccessProps = {
    teacher: TeacherType
}

function TeacherCardToAccess({ teacher }: TeacherCardToAccessProps) {
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

    const handleActiveAccess = (teacherId: TeacherType['id']) => {
        mutation.mutate(teacherId);
    }

    return (
        <div className="flex items-center gap-2 py-2" key={teacher.id}>
            <div className="flex items-center justify-center size-10 rounded-full bg-indigo-600 text-white border-2 border-green-600">
                {teacher.name[0]}
            </div>
            <div className="flex-1">
                <p>{teacher.name}</p>
            </div>
            <div>
                {teacher.teacherAccess ? (
                    <p className="italic text-xs text-green-600">Acceso verificado</p>
                ) : (
                    <button className="text-xs bg-gray-100 p-2 rounded-lg cursor-pointer hover:bg-gray-200 active:scale-95 disabled:opacity-50"
                        onClick={ () => handleActiveAccess(teacher.id) }
                        disabled={ mutation.isPending }
                    >
                        {mutation.isPending ? "Guardando" : "Marcar acceso"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default TeacherCardToAccess