import { useMemo } from "react";
import UpdateSchool from "./UpdateSchool";
import UpdateDirector from "./UpdateDirector";
import UpdateSubdirector from "./UpdateSubdirector";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import type { SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
import { getSchoolByCode } from "@/services/school.services";
import { School, User } from "lucide-react";

const ROLE_DIRECTOR = 7;
const ROLE_SUBDIRECTOR = 8;

const findDirector = (userSchool: any[] = []) =>
  userSchool.find((x) => x.user?.roleId === ROLE_DIRECTOR) ?? null;

const findSubdirector = (userSchool: any[] = []) =>
  userSchool.find((x) => x.user?.roleId === ROLE_SUBDIRECTOR) ?? null;

function SchoolUpdate() {
  const { schoolCode } = useParams();
  

  const { isLoading, isError, data, refetch } = useQuery<SchoolInfoWithUsers>({
    queryKey: ["school", schoolCode],
    queryFn: () => {
      if (!schoolCode) throw Error("No se proporciono un codigo de centro escolar");
      return getSchoolByCode(schoolCode);
    },
    enabled: !!schoolCode,
  });

  const userSchool = data?.userSchool ?? [];

  const director = useMemo(() => findDirector(userSchool), [userSchool]);
  const subdirector = useMemo(() => findSubdirector(userSchool), [userSchool]);

  const onSaved = () => {
    refetch();
  };

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

  console.log(data);
  return (
    <>
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold text-indigo-600 mb-5">Actualización de datos</h1>
      <Link to="/monitores" className="text-indigo-600 hover:text-indigo-800 text-sm px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50">Regresar</Link>
    </div>
      <div className="flex flex-col gap-2">
        <div className="w-full p-10 border border-gray-200 rounded gap-2 font-semibold bg-gray-50">
          <div className="flex items-center gap-2 mb-5">
            <div><School className="size-8 bg-blue-50 text-blue-700 rounded-lg p-1"/></div>
            <p>Centro escolar</p>
          </div>
          <UpdateSchool school={data}/>
        </div>

        <div className="w-full p-10 border border-gray-200 rounded gap-2 font-semibold bg-gray-50">
          <div className="flex items-center gap-2 mb-5">
            <div><User className="size-8 bg-blue-50 text-blue-700 rounded-lg p-1"/></div>
            <p>Director(a)</p>
          </div>
          <UpdateDirector schoolCode={data.code} director={director} fallbackName={data.directorName} fallbackPhone={data.directorPhone} onSaved={onSaved}/>
        </div>

        <div className="w-full p-10 border border-gray-200 rounded gap-2 font-semibold bg-gray-50">
          <div className="flex items-center gap-2 mb-5">
            <div><User className="size-8 bg-blue-50 text-blue-700 rounded-lg p-1"/></div>
            <p>{subdirector ? "Subdirector(a)" : "Agregar subdirector(a)"}</p>
          </div>
          <UpdateSubdirector schoolCode={data.code} subdirector={subdirector} subdirectores={data} onSaved={onSaved}/>
        </div>
      </div>
    </>
  );
}

export default SchoolUpdate;
