import { usePagination } from "@/hooks/usePagination";
import { getTeachersByTutors } from "@/services/tutorship.services";
import type { TeacherType } from "@/types/index.types";
import { useQuery } from "@tanstack/react-query";
import { Pointer } from "lucide-react";
import Pagination from "../ui/Pagination";
import { cleanSearchTerm } from "@/utils/index.utils";

type TeacherMetricType = TeacherType & {
  totalDiagnosticos: number;
  totalObservaciones: number;
}

type TutorTeacherListProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setReadOnly: React.Dispatch<React.SetStateAction<boolean>>
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

function TutorTeacherList({ setSearch, setReadOnly, setSearchTerm }: TutorTeacherListProps) {
  const { isLoading, isError, data: teachers } = useQuery<TeacherMetricType[]>({
    queryKey: ["all-teacher-by-tutor"],
    queryFn: () => getTeachersByTutors()
  });

  const schoolFiltered = (teacher: TeacherType, searchTerm: string) => {
    return cleanSearchTerm(teacher.name).includes(cleanSearchTerm(searchTerm))
  }

  const {
    handleSetSearchTerm,
    totalPage,
    itemsPage,
    setPage,
    page
  } = usePagination<TeacherMetricType>({
    data: teachers ?? [],
    perPage: 5,
    fn: schoolFiltered
  });

  if (isLoading) return (
    <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
      <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
      Cargando lista de docentes...
    </p>
  )

  if (isError || !teachers) return (
    <p className="text-xs text-red-600 text-center p-3">
      ¡Error inespertado! contacte con soporte.
    </p>
  );

  const handleSearhTerm = (dui: string) => {
    setSearch(dui);
    setSearchTerm(dui);
    setReadOnly(true);
  }

  return (
    <div className="divide-y divide-gray-300 space-y-3">
      <input
        className="p-2 my-2 border border-gray-300 block mb-3 outline-0 w-full md:ms-auto"
        type="search"
        placeholder="Digita el nombre del docente"
        onChange={handleSetSearchTerm}
      />
      {itemsPage.length > 0 ? itemsPage.map(teacher => (
        <div className="p-2 flex justify-between items-center" key={teacher.id}>
          <div>
            <p className="font-bold">{teacher.name}</p>
            <p className="text-xs text-gray-600">{teacher.totalDiagnosticos} diagnósticos - {teacher.totalObservaciones} observaciones</p>
          </div>

          <button className="flex items-center gap-2 text-xs bg-indigo-600 text-white cursor-pointer rounded-lg py-1 px-2 hover:bg-indigo-700 active:scale-95"
            onClick={() => handleSearhTerm(teacher.dui)}
          >
            <Pointer size={14} />
            <span>Seleccionar</span>
          </button>
        </div>
      )) : (
        <p className="p-2 text-center text-gray-600">No tiene docentes asignados</p>
      )}

      <Pagination
        setPage={setPage}
        totalPage={totalPage}
        page={page}
      />
    </div>
  )
}

export default TutorTeacherList