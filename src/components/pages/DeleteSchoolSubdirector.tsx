import { useState } from "react";
import type { DeleteUserSchool } from "@/types/schoolmanagement.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserSchool } from "@/services/school.services";

function DeleteSchoolSubdirector({ subdirectores, schoolCode, onSaved }: { subdirectores: any; schoolCode: string; onSaved: () => void; }) {
  const queryClient = useQueryClient();

  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  const mutationDelete = useMutation({
    mutationKey: ["delete-userSchool", schoolCode],
    mutationFn: deleteUserSchool,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["school", schoolCode] });
      onSaved();
      setDeletingUserId(null);
    },
    onError: (err: any) => {
      console.log(err);
      setDeletingUserId(null);
    },
  });

  const handleDelete = (payload: DeleteUserSchool) => {
    setDeletingUserId(payload.userId);
    mutationDelete.mutate({ userId: payload.userId, schoolCode: payload.schoolCode });
  };

  return (
    <>
      { subdirectores.userSchool.filter((x: any) => x.user.roleId === 8).length > 0 ? (
          subdirectores.userSchool.filter((x: any) => x.user.roleId === 8).map((subdirector: any) => {
              const isThisDeleting = mutationDelete.isPending && deletingUserId === subdirector.userId;
              return (
                  <div key={subdirector.id} className="border border-gray-100 rounded p-2 flex flex-col md:flex-row items-center md:justify-between">
                  <p className="font-light">{subdirector.user.name}</p>
  
                  <button type="button" disabled={isThisDeleting} onClick={() => handleDelete({ userId: subdirector.userId, schoolCode: subdirector.schoolCode })}
                      className="px-2 py-1 rounded border border-red-500 bg-red-50 text-red-500 hover:cursor-pointer disabled:opacity-50 text-xs font-semibold">
                      {isThisDeleting ? "Eliminando..." : "Eliminar"}
                  </button>
                  </div>
              );
              })
      ) : (
        <p className="text-center">No hay subdirectores agregados</p>
      )}
    </>
  );
}

export default DeleteSchoolSubdirector;
