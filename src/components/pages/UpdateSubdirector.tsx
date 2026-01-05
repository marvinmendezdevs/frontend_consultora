import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ROLE_SUBDIRECTOR = 8;

type UpsertSubdirectorPayload = {
  schoolCode: string;
  roleId: number;
  userSchoolId?: number;
  userId?: number;
  email: string;
  name: string;
  dui: string;
  telephone: string;
};

type SubdirectorForm = {
  email: string;
  name: string;
  dui: string;
  telephone: string;
};

// 🔹 MOCK temporal
async function upsertSubdirectorMock(dataSubdirector: UpsertSubdirectorPayload) {
  console.log("📡 Enviando payload Subdirector (mock):", dataSubdirector);
  await new Promise((r) => setTimeout(r, 700));
  return { success: true, dataSubdirector };
}

function UpsertSubdirector({
  schoolCode,
  subdirector,
  onSaved,
}: {
  schoolCode: string;
  subdirector: any | null;
  onSaved: () => void;
}) {
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SubdirectorForm>({
    mode: "onChange", 
    defaultValues: {
      email: subdirector?.user?.email ?? "",
      name: subdirector?.user?.name ?? "",
      dui: subdirector?.user?.dui ?? "",
      telephone: subdirector?.user?.telephone ?? "",
    },
  });

  useEffect(() => {
    reset({
      email: subdirector?.user?.email ?? "",
      name: subdirector?.user?.name ?? "",
      dui: subdirector?.user?.dui ?? "",
      telephone: subdirector?.user?.telephone ?? "",
    });

    setErrorMsg(null);
  }, [subdirector, reset]);

  const mutation = useMutation({
    mutationFn: (dataSubdirector: UpsertSubdirectorPayload) =>
      upsertSubdirectorMock(dataSubdirector),

    onSuccess: (res) => {
      console.log("✅ Respuesta mutation Subdirector:", res);

      queryClient.invalidateQueries({
        queryKey: ["school", schoolCode],
      });

      onSaved();
    },

    onError: (error) => {
      console.error("❌ Error mutation Subdirector:", error);
      setErrorMsg("Ocurrió un error al guardar el subdirector.");
    },
  });

  const onSubmit = (values: SubdirectorForm) => {
    setErrorMsg(null);

    const dataSubdirector: UpsertSubdirectorPayload = {
      schoolCode,
      roleId: ROLE_SUBDIRECTOR,
      email: values.email.trim(),
      name: values.name.trim(),
      dui: values.dui.trim(),
      telephone: values.telephone.trim(),
    };

    console.log(dataSubdirector);

    mutation.mutate(dataSubdirector);
  };

  return (
    <div>
      <div
        onClick={mutation.isPending ? undefined : onSaved}
      />

      <div>
        <div className="w-full bg-white rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {subdirector ? "Actualizar subdirector" : "Agregar subdirector"}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="text-sm">Email</label>
              <input
                disabled={mutation.isPending}
                className="w-full border border-gray-200 rounded p-2"
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
                className="w-full border border-gray-200 rounded p-2"
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
                className="w-full border border-gray-200 rounded p-2"
                {...register("dui", { required: "DUI es obligatorio" })}
              />
              {errors.dui?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.dui.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Teléfono</label>
              <input
                disabled={mutation.isPending}
                className="w-full border border-gray-200 rounded p-2"
                {...register("telephone", { required: "Teléfono es obligatorio" })}
              />
              {errors.telephone?.message && (
                <p className="text-xs text-red-600 mt-1">{errors.telephone.message}</p>
              )}
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {errorMsg}
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
        </div>
      </div>
    </div>
  );
}

export default UpsertSubdirector;
