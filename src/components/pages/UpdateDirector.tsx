import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { UpdateDirectorPayload, DirectorForm, SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import { upsertSchoolUser } from "@/services/school.services";
import { validDUI } from "@/utils/index.utils";
import UserSchoolSecctionsDirector from "./UserSchoolSecctionsDirector";

type UpdateDirectorType = {
  users: SchoolInfoWithUsers['userSchool'];
  sections: SchoolInfoWithUsers['sections']
}

function UpdateDirector({ users, sections }: UpdateDirectorType) {
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const defaultValues = {
    email: "",
    name: "",
    dui: "",
    telephone: "",
  }

  // Obtener el director:
  const director = users.find(user => user.user.roleId === 7);

  if (director) {
    defaultValues.name = director.user.name;
    defaultValues.email = director.user.email;
    defaultValues.dui = director.user.dui;
    defaultValues.telephone = director.user.telephone;
  }

  const { register, handleSubmit, formState: { errors, isValid }, } = useForm<DirectorForm>({
    mode: "onChange",
    defaultValues,
  });

  const mutation = useMutation({
    mutationKey: ["school-user", director?.schoolCode],
    mutationFn: upsertSchoolUser,
    onSuccess: async (res) => {
      console.log(res?.msg);
      queryClient.invalidateQueries({ queryKey: ["school", director?.schoolCode] });
    },
    onError: (err) => {
      setErrorMsg(err?.message ?? "Ocurrió un error");
    },
  });

  const onSubmit = (values: DirectorForm) => {
    setErrorMsg(null);

    const payload: UpdateDirectorPayload = {
      schoolCode: Number(director?.schoolCode),
      roleId: 7,
      email: values.email.trim(),
      name: values.name.trim(),
      dui: values.dui.trim(),
      telephone: values.telephone.trim(),
    };

    mutation.mutate(payload);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Actualizar director(a)</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-sm">Email</label>
              <input
                disabled={mutation.isPending}
                className="w-full border border-gray-200 rounded p-2 font-light text-sm"
                {...register("email", { required: "Email es obligatorio" })}
              />
              {errors.email?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Nombre</label>
              <input
                disabled={mutation.isPending}
                className="w-full border border-gray-200 rounded p-2 font-light text-sm"
                {...register("name", { required: "Nombre es obligatorio" })}
              />
              {errors.name?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">DUI</label>
              <input
                disabled={mutation.isPending}
                inputMode="numeric"
                maxLength={9}
                placeholder="123456789"
                className="w-full border border-gray-200 rounded p-2 font-light text-sm"
                {...register("dui", {
                  required: "DUI es obligatorio", validate: (value) =>
                    validDUI(value) || "El DUI ingresado no es válido",
                })}
              />
              {errors.dui?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.dui.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Teléfono</label>
              <input
                disabled={mutation.isPending}
                className="w-full border border-gray-200 rounded p-2 font-light text-sm"
                {...register("telephone", { required: "Teléfono es obligatorio" })}
              />
              {errors.telephone?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.telephone.message}</p>
              )}
            </div>

            {errorMsg && (
              <p className="text-sm text-red-500 font-light bg-red-50/50 border border-red-200/50 rounded p-2">
                Ya existe un registro con estos datos. Verifica la información o intenta con otros valores.
              </p>
            )}

            <div className="pt-2 flex justify-end gap-2">

              <button
                type="submit"
                disabled={mutation.isPending || !isValid}
                className="px-3 py-2 rounded bg-indigo-600 text-white hover:cursor-pointer disabled:opacity-50"
              >
                {mutation.isPending ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>

          <UserSchoolSecctionsDirector
            sections={sections}
            user={director?.user}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateDirector;
