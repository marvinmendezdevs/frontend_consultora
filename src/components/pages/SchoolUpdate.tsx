import UpdateSchool from "./UpdateSchool";
import UpdateDirector from "./UpdateDirector";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import type { SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import { getSchoolByCode } from "@/services/school.services";
import { School, User } from "lucide-react";

function SchoolUpdate() {
  const { schoolCode } = useParams();

  const { isLoading, isError, data } = useQuery<SchoolInfoWithUsers>({
    queryKey: ["school", schoolCode],
    queryFn: () => {
      if (!schoolCode) throw Error("No se proporciono un codigo de centro escolar");
      return getSchoolByCode(schoolCode);
    },
    enabled: !!schoolCode,
  });

  // const onSaved = () => {
  //   refetch();
  // };

  if (!schoolCode) {
    return <p className="text-sm text-red-600">No se proporcionó un código de centro escolar.</p>;
  }

  if (isLoading) {
    return <p className="text-sm text-slate-600">Cargando centro escolar...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-600">Ocurrió un error al cargar el centro escolar.</p>;
  }

  if (!data) return null;

  return (
    <>
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold text-indigo-600 mb-5">Actualización de datos</h1>
      <Link to="/monitores" className="text-indigo-600 hover:text-indigo-800 text-sm px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50">Regresar</Link>
    </div>
      <div className="flex flex-col gap-2 mb-5">
        <div className="w-full px-2 rounded-lg gap-2 font-semibold bg-gray-50 py-4">
          <div className="flex items-center gap-2 mb-5">
            <div><School className="size-8 bg-blue-50 text-blue-700 rounded-lg p-1"/></div>
            <p>Centro escolar</p>
          </div>
          <UpdateSchool school={data}/>
        </div>

        <div className="w-full px-2 rounded-lg gap-2 font-semibold bg-gray-50 py-4">
          <div className="flex items-center gap-2 mb-5">
            <div><User className="size-8 bg-blue-50 text-blue-700 rounded-lg p-1"/></div>
            <p>Director(a)</p>
          </div>
          <UpdateDirector 
            users={ data.userSchool }
            sections={data.sections}
          />
        </div>

        {/* <div className="w-full px-2 rounded-lg gap-2 font-semibold bg-gray-50 py-4">
          <div className="flex items-center gap-2 mb-5">
            <div><User className="size-8 bg-blue-50 text-blue-700 rounded-lg p-1"/></div>
            <p>{subdirector ? "Subdirector(a)" : "Agregar subdirector(a)"}</p>
          </div>
          <UpdateSubdirector schoolCode={data.code} subdirector={subdirector} subdirectores={data} onSaved={onSaved}/>
        </div> */}
      </div>
    </>
  );
}

export default SchoolUpdate;
