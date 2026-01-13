import { upsertSubdirector } from "@/services/school.services";
import type { SchoolInfo, SchoolInfoWithUsers, SubdirectorForm, UpdateSubdirectorPayload } from "@/types/schoolmanagement.type";
import { validDUI } from "@/utils/index.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FingerprintPattern, GraduationCap, Info, Mail, Phone, Trash2, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UpdateSubirectorType {
  users: SchoolInfoWithUsers['userSchool'];
  sections: SchoolInfoWithUsers['sections']
  schoolCode: SchoolInfo['code']
}

function UpdateSubdirector({ users, schoolCode }: UpdateSubirectorType) {
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [succesMsg, setSuccesMsg] = useState(false);

  const subdirectores = users.filter(item => item.user.roleId === 8);

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<SubdirectorForm>({
    mode: "onChange",
    
  });

  const mutation = useMutation({
    mutationKey: ["school-user", schoolCode],
    mutationFn: upsertSubdirector,
    onSuccess: async () => {
      setSuccesMsg(true)
      queryClient.invalidateQueries({ queryKey: ["school", schoolCode] });
      reset({
        email: "",
        name: "",
        dui: "",
        telephone: ""
      });
    },
    onError: (err) => {
      setErrorMsg(err?.message ?? "Ocurrió un error");
    },
  });

  if(succesMsg === true){
    setTimeout(() => {
      setSuccesMsg(false);
    }, 3000);
  }

    const onSubmit = (values: SubdirectorForm) => {
      setErrorMsg(null);
  
      const payload: UpdateSubdirectorPayload = {
        schoolCode: Number(schoolCode),
        roleId: 8,
        email: values.email.trim(),
        name: values.name.trim(),
        dui: values.dui.trim(),
        telephone: values.telephone.trim(),
      };
  
      mutation.mutate(payload);
    };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="w-full bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Actualizar Subdirector(a)</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-sm">Email</label>
              <input
                disabled={mutation.isPending || subdirectores.length === 2}
                className="w-full border border-gray-200 rounded p-2 font-light text-sm disabled:cursor-not-allowed"
                {...register("email", { required: "Email es obligatorio" })}
              />
              {errors.email?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Nombre</label>
              <input
                disabled={mutation.isPending || subdirectores.length === 2}
                className="w-full border border-gray-200 rounded p-2 font-light text-sm disabled:cursor-not-allowed"
                {...register("name", { required: "Nombre es obligatorio" })}
              />
              {errors.name?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">DUI</label>
              <input
                disabled={mutation.isPending || subdirectores.length === 2}
                inputMode="numeric"
                maxLength={9}
                placeholder="123456789"
                className="w-full border border-gray-200 rounded p-2 font-light text-sm disabled:cursor-not-allowed"
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
                disabled={mutation.isPending || subdirectores.length === 2}
                className="w-full border border-gray-200 rounded p-2 font-light text-sm disabled:cursor-not-allowed"
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
              {subdirectores.length === 2 ? (
                <div className="text-sm font-normal flex items-center gap-1 w-full bg-blue-100 rounded-sm p-2 text-blue-700">
                  <Info className="size-5"/>
                  <p>Ya no se permite agregar más subdirectores</p>
                </div>
              ):(
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="submit"
                    disabled={mutation.isPending || !isValid}
                    className="px-3 py-2 rounded bg-indigo-600 text-white hover:cursor-pointer disabled:opacity-50"
                  >
                    {mutation.isPending ? "Guardando..." : "Guardar"}
                  </button>
                </div>  
              )}
              {succesMsg === true && <p className="font-normal text-sm bg-green-100 rounded-sm p-2 text-green-700 my-2">Subdirector agregado correctamente...</p>}
          </form>
        </div>
        <div className="bg-white rounded-lg p-5">
              <p className="text-xl mb-3">Lista de subdirectores</p>
              <div className="flex flex-col gap-2">
                {subdirectores.length !== 0 ? (
                    subdirectores.map(subdirector => (
                      <div key={subdirector.userId} className="flex flex-col md:flex-row w-full justify-between items-center gap-2 border border-gray-100 p-2 rounded-lg shadow">
                        <div className="flex items-center flex-col md:flex-row gap-2 w-full md:w-auto justify-center ">
                          <div className="flex items-center justify-center bg-indigo-50 p-2 rounded-lg">
                            <User className="text-indigo-700" />
                          </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-gray-800">{subdirector.user.name}</p>
                              <div className="flex-wrap md:flex gap-4 text-xs font-normal text-gray-500">
                                <div className="flex gap-1">
                                  <FingerprintPattern className="size-4" />
                                  <p>{subdirector.user.dui}</p>
                                </div>
                                <div className="flex gap-1">
                                  <Mail className="size-4" />
                                  <p>{subdirector.user.email}</p>
                                </div>
                                <div className="flex gap-1">
                                  <Phone className="size-4" />
                                  <p>{subdirector.user.telephone}</p>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="flex justify-between md:flex-col w-full md:w-auto gap-2 mt-2 md:mt-0">
                            <button className="flex items-center gap-1 text-xs font-normal bg-indigo-100 p-1 text-indigo-800 rounded-lg text-center">
                              <GraduationCap className="size-4"/>
                              Secciones
                            </button>
                            <button className="flex items-center gap-1 text-xs font-normal bg-red-100 p-1 text-red-800 rounded-lg text-center">
                              <Trash2 className="size-4"/>
                              Eliminar
                            </button>
                        </div>
                      </div>
                    ))
                ):(
                  <p className="font-normal text-sm bg-blue-100 rounded-sm p-1 text-blue-700 mt-2">No hay subdirectores agregados.</p>
                )}
              </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateSubdirector;
