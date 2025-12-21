import { getFormBySlugForMonitor } from "@/services/forms.services";
import { useQuery } from "@tanstack/react-query";
import Forms from "../components/pages/Forms";
import type { FormGeneralType } from "@/types/forms.types";

function MonitorOptimizationForm() {
  const {
    isLoading,
    isError,
    data: form,
  } = useQuery<FormGeneralType>({
    queryKey: ["optimization-form"],
    queryFn: () => getFormBySlugForMonitor("optimization-form"),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
        <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
        Cargando información del formulario...
      </p>
    );
  }

  if (isError || !form) {
    return (
      <p className="text-xs text-red-600 text-center p-3">
        ¡Error inespertado! contacte con soporte.
      </p>
    );
  }

  return (
    <>
      <h2 className="text-lg font-black text-indigo-600">Formulario de captura de datos: optimización de centro escolar</h2>

      <Forms
        form={ form }
      />
    </>
  );
}

export default MonitorOptimizationForm;
