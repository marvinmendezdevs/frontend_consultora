import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { UpdateDirectorPayload, DirectorForm, SchoolInfo } from "@/types/schoolmanagement.type";
import { Check, Info } from "lucide-react";

const ROLE_DIRECTOR = 7;

async function upsertDirectorMock(dataDirector: UpdateDirectorPayload) {
  await new Promise((r) => setTimeout(r, 700));
  return dataDirector;
}

function UpdateDirector({
  schoolCode,
  director,
  fallbackName,
  fallbackPhone,
  sections,
  onSaved,
}: {
  schoolCode: string;
  director: any | null;
  fallbackName?: string;
  fallbackPhone?: string;
  sections?: SchoolInfo['sections'];
  onSaved: () => void;
}) {
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<DirectorForm>({
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
  }, [open, director, fallbackName, fallbackPhone, reset]);

  const mutation = useMutation({
    mutationFn: (dataDirector: UpdateDirectorPayload) =>
      upsertDirectorMock(dataDirector),

    onSuccess: (res) => {
      console.log( res);

      queryClient.invalidateQueries({
        queryKey: ["school", schoolCode],
      });

      onSaved();
    },

    onError: (error) => {
      console.error(error);
    },
  });

  if (!open) return null;

  const onSubmit = (values: DirectorForm) => {
    setErrorMsg(null);

    const UpdateDirectorPayload = {
      schoolCode,
      roleId: ROLE_DIRECTOR,
      email: values.email.trim(),
      name: values.name.trim(),
      dui: values.dui.trim(),
      telephone: values.telephone.trim(),
    };
    mutation.mutate(UpdateDirectorPayload);
  };

  return (
    <div>
      <div onClick={mutation.isPending ? undefined : onSaved} />

      <div>
        <div className="w-full bg-white rounded-xl p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-sm">Email</label>
              <input disabled={mutation.isPending} className="w-full border border-gray-200 rounded p-2 font-light text-sm" {...register("email", { required: "Email es obligatorio" })}/>
              {errors.email?.message && (<p className="text-xs text-red-600 mt-1">{errors.email.message}</p>)}
            </div>

            <div>
              <label className="text-sm">Nombre</label>
              <input disabled={mutation.isPending} className="w-full border border-gray-200 rounded p-2 font-light text-sm" {...register("name", { required: "Nombre es obligatorio" })}/>
              {errors.name?.message && (<p className="text-xs text-red-600 mt-1">{errors.name.message}</p>)}
            </div>

            <div>
              <label className="text-sm">DUI</label>
              <input disabled={mutation.isPending} className="w-full border border-gray-200 rounded p-2 font-light text-sm" {...register("dui", { required: "DUI es obligatorio" })}/>
              {errors.dui?.message && (<p className="text-xs text-red-600 mt-1">{errors.dui.message}</p>)}
            </div>

            <div>
              <label className="text-sm">Teléfono</label>
              <input disabled={mutation.isPending} className="w-full border border-gray-200 rounded p-2 font-light text-sm" {...register("telephone", { required: "Teléfono es obligatorio" })}/>
              {errors.telephone?.message && (<p className="text-xs text-red-600 mt-1">{errors.telephone.message}</p>)}
            </div>
            {errorMsg && (<p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">{errorMsg}</p>)}

            <div className="my-5 flex items-center gap-2 bg-blue-50/50 p-2 rounded">
              <Info className="text-blue-700/75" />
              <p className="text-xs text-blue-700/75">Seleccione los grados que atiende (si aplica).</p>
            </div>
            <div className="overflow-y-auto h-[200px]">
              <div className="flex flex-col gap-2">
                {sections?.map((section) => (
                  section.assignments.map((item) => (
                    director?.user?.dui === item.teacher.dui && (
                      <button type="button"
                        key={item.id}
                        className={`relative w-full gap-5 group flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 text-left`}
                      >
                        <span className={`text-sm transition-colors duration-200 ${item.teacher.dui === director?.user?.dui ? 'text-white font-medium' : 'text-gray-600'}`}>
                          {section.grade}-{section.sectionClass} {section.shift}
                        </span>

                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${item.teacher.dui === director?.user?.dui ? 'bg-white/20' : 'bg-gray-100 border border-gray-200'}`}>

                          <Check className={`w-3 h-3 transition-opacity ${item.teacher.dui === director?.user?.dui ? 'opacity-100 text-white' : 'opacity-0'}`} />
                        </div>
                      </button>
                    )
                  ))
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2"><button type="submit" disabled={mutation.isPending || !isValid} className="px-3 py-2 rounded bg-indigo-600 text-white hover:cursor-pointer disabled:opacity-50">{mutation.isPending ? "Guardando..." : "Guardar"}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDirector;
