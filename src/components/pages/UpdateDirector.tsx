import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { UpdateDirectorPayload, DirectorForm  } from "@/types/schoolmanagement.type";
import { upsertSchoolUser } from "@/services/school.services";
import { validDUI } from "@/utils/index.utils";
import type { SchoolInfo } from "@/types/schoolmanagement.type";
import UserSchoolSecctionsDirector from "./UserSchoolSecctionsDirector";

const ROLE_DIRECTOR = 7;

function UpdateDirector({school, schoolCode, director, fallbackName, fallbackPhone, onSaved }: { school: SchoolInfo; schoolCode: string; director: any | null; fallbackName?: string; fallbackPhone?: string; onSaved: () => void; }) {
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isValid }, } = useForm<DirectorForm>({
    mode: "onChange",
    defaultValues: {
      email: director?.user?.email ?? "",
      name: director?.user?.name ?? fallbackName ?? "",
      dui: director?.user?.dui ?? "",
      telephone: director?.user?.telephone ?? fallbackPhone ?? "",
    },
  });

  useEffect(() => {
    reset({
      email: director?.user?.email ?? "",
      name: director?.user?.name ?? fallbackName ?? "",
      dui: director?.user?.dui ?? "",
      telephone: director?.user?.telephone ?? fallbackPhone ?? "",
    });
    setErrorMsg(null);
  }, [director, fallbackName, fallbackPhone, reset]);

  const mutation = useMutation({
    mutationKey: ["school-user", schoolCode, ROLE_DIRECTOR],
    mutationFn: upsertSchoolUser,
    onSuccess: async (res: any) => {
      console.log(res?.msg);
      await queryClient.invalidateQueries({ queryKey: ["school", schoolCode] });
      onSaved();
    },
    onError: (err: any) => {
      setErrorMsg(err?.message ?? "Ocurrió un error");
    },
  });

  const onSubmit = (values: DirectorForm) => {
    setErrorMsg(null);

    const payload: UpdateDirectorPayload = {
      schoolCode: Number(schoolCode),
      roleId: ROLE_DIRECTOR,
      email: values.email.trim(),
      name: values.name.trim(),
      dui: values.dui.trim(),
      telephone: values.telephone.trim(),
    };

    mutation.mutate(payload);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
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
                {...register("dui", { required: "DUI es obligatorio", validate: (value) =>
                  validDUI(value) || "El DUI ingresado no es válido", })}
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
        <UserSchoolSecctionsDirector school={school} director={director}/>
        </div>
      </div>
    </div>
  );
}

export default UpdateDirector;
