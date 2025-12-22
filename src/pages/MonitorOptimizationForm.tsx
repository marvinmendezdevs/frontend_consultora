import { getAnswerOptimizationBySchoolCode, getFormBySlugForMonitor } from "@/services/forms.services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Forms from "../components/pages/Forms";
import type { FormGeneralType } from "@/types/forms.types";
import { useMutation } from "@tanstack/react-query";
import { setOptimizationForm } from "@/services/forms.services";
import { useNavigate, useParams } from "react-router";

type AnswersType = Record<string, string>

function MonitorOptimizationForm() {
  const { schoolCode } = useParams();
  const { isLoading, isError, data: form } = useQuery<FormGeneralType>({
    queryKey: ["optimization-form"],
    queryFn: () => getFormBySlugForMonitor("optimization-form"),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const { isLoading: isLoadingAnswer, isError: isErrorAnswer, data: answer } = useQuery({ 
    queryKey: ["optimization-answer", schoolCode],
    queryFn: () => {

      if(!schoolCode){
        throw Error("No se encuentra el centro escolar");
      }

      return getAnswerOptimizationBySchoolCode(schoolCode)
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["form-mutation"],
    mutationFn: (data: AnswersType) => {
      if (!schoolCode) {
        throw Error('Debe proporcionar un codigo de centro escolar');
      }

      return setOptimizationForm(data, schoolCode, 'optimizacion')
    },
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["optimization-answer", schoolCode]
      })
      navigate("/monitores")
    },
  });

  if (isLoading || isLoadingAnswer) {
    return (
      <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
        <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
        Cargando información del formulario...
      </p>
    );
  }

  if (isError || !form || isErrorAnswer) {
    return (
      <p className="text-xs text-red-600 text-center p-3">
        ¡Error inespertado! contacte con soporte.
      </p>
    );
  }


  return (
    <>
      <h2 className="text-lg font-black text-indigo-600">Formulario de captura de datos: optimización de centro escolar</h2>

      {mutation.isPending ? (
        <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
          <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
          Guardando respuesta del formulario...
        </p>
      ): (
        <Forms
          form={form}
          answer={answer?.payload ?? {}}
          mutation={mutation}
        />
      )}
    </>
  );
}

export default MonitorOptimizationForm;
