import { getObservations } from "@/services/tutorship.services"
import { useQuery } from "@tanstack/react-query"

type ObservationListType = {
  teacherDui: string
}

function ObservationList({ teacherDui }: ObservationListType) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['observations-teacher'],
    queryFn: () => getObservations(teacherDui),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return (
    <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
      <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
      Cargando lista de docentes asignados...
    </p>
  );

  if (isError) return (
    <p className="text-xs text-red-600 text-center p-3">
      ¡Error inespertado! contacte con soporte.
    </p>
  );

  if(data) return (
    <section className="mt-3">
      <h3 className="font-bold">Lista de observaciones</h3>
      {teacherDui}
    </section>
  )
}

export default ObservationList