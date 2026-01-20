import { deleteUserSchool } from "@/services/school.services"
import type { DeleteUserSchool } from "@/types/schoolmanagement.type";
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";

interface deleteUserProps{
  userId: number,
  schoolCode: string,
  onClose: () => void
}

function DeleteSchoolSubdirector({userId, schoolCode, onClose}: deleteUserProps) {
  const queryClient = useQueryClient();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const mutation = useMutation({
    mutationKey: ["delete-user", userId],
    mutationFn: deleteUserSchool,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["school", schoolCode] });
      onClose()
    },
    onError: (err) => {
      console.log(err)
      setErrorMsg(err?.message ?? "Ocurrió un error");
    },
  })

  const onSubmit = () => {
    setErrorMsg(null);

    const paylod: DeleteUserSchool = {
      userId: userId,
      schoolCode: schoolCode
    }
     
     mutation.mutate(paylod)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow transform transition-all m-5">
      {errorMsg && (
        <p className="w-full text-sm text-red-500 font-normal border-l-2 bg-red-50 p-2 mb-5">
          Error al eliminar el subdirector, por favor contacte con soporte.
        </p>
      )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ¿Eliminar Subdirector(a)?
        </h3>
        
        <p className="text-gray-500 mb-6">
          Esta acción eliminará al Subdirector(a) permanentemente de la escuela. No podrás deshacer este cambio.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-95 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button onClick={onSubmit} disabled={mutation.isPending}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium disabled:bg-red-300 disabled:cursor-not-allowed active:scale-95 transition-all cursor-pointer"
          >
            {mutation.isPending ? "Eliminando..." : "Eliminar" }
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteSchoolSubdirector
