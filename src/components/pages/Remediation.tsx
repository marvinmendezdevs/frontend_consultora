import { useQuery } from "@tanstack/react-query";
import { remediacionSchool } from "@/services/school.services";
import { useParams } from "react-router";
import type { SectionItem } from "@/types/schoolmanagement.type";

function Remediation() {

  const {schoolCode} = useParams();
      const { isLoading, isError, data } = useQuery({
        queryKey: ["remediacion", schoolCode],
        queryFn: () => remediacionSchool(schoolCode as string),
    });

    console.log(data);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {isError}</p>;
    if (data) return (
    <div>
        <h1 className="text-xl font-semibold my-6">Remedicación y refuerzo</h1>
        <div>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[900px]">

              <div className="grid grid-cols-10 bg-gray-100 p-1 w-full text-center">
                <div className="py-2">Grado</div>
                <div className="py-2">Tipo</div>
                <div className="py-2">Opción</div>
                <div className="py-2">Sección</div>
                <div className="py-2">Turno</div>
                <div className="py-2">Materia</div>
                <div className="py-2">Docente</div>
                <div className="py-2">Dui</div>
                <div className="py-2">Phone</div>
                <div className="py-2">Email</div>
              </div>

              {data.map((item: SectionItem, index: number) => (
                <div
                  key={index + 1}
                  className="w-full border border-gray-200 rounded-sm flex flex-col mb-3 max-h-96"
                >
                  <div className="w-full divide-y divide-gray-200">

                    <div className="grid grid-cols-10 text-center">
                      <p className="h-14 text-xs py-5">{item.grade}</p>
                      <p className="h-14 text-xs py-5">{item.track}</p>
                      <p className="h-14 text-xs py-5">{item.subtrack}</p>
                      <p className="h-14 text-xs py-5">{item.sectionClass}</p>
                      <p className="h-14 text-xs py-5">{item.shift}</p>
                      <p className="h-14 text-xs py-5">lenguaje</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                    </div>

                    <div className="grid grid-cols-10 text-center">
                      <p className="h-14 text-xs py-5">{item.grade}</p>
                      <p className="h-14 text-xs py-5">{item.track}</p>
                      <p className="h-14 text-xs py-5">{item.subtrack}</p>
                      <p className="h-14 text-xs py-5">{item.sectionClass}</p>
                      <p className="h-14 text-xs py-5">{item.shift}</p>
                      <p className="h-14 text-xs py-5">matematica</p>
                      <p className="h-14 text-xs py-5 truncate"></p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                    </div>

                    <div className="grid grid-cols-10 text-center">
                      <p className="h-14 text-xs py-5">{item.grade}</p>
                      <p className="h-14 text-xs py-5">{item.track}</p>
                      <p className="h-14 text-xs py-5">{item.subtrack}</p>
                      <p className="h-14 text-xs py-5">{item.sectionClass}</p>
                      <p className="h-14 text-xs py-5">{item.shift}</p>
                      <p className="h-14 text-xs py-5">remediación lenguaje</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                    </div>

                    <div className="grid grid-cols-10 text-center">
                      <p className="h-14 text-xs py-5">{item.grade}</p>
                      <p className="h-14 text-xs py-5">{item.track}</p>
                      <p className="h-14 text-xs py-5">{item.subtrack}</p>
                      <p className="h-14 text-xs py-5">{item.sectionClass}</p>
                      <p className="h-14 text-xs py-5">{item.shift}</p>
                      <p className="h-14 text-xs py-5">remediación matematica</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                    </div>

                    <div className="grid grid-cols-10 text-center">
                      <p className="h-14 text-xs py-5">{item.grade}</p>
                      <p className="h-14 text-xs py-5">{item.track}</p>
                      <p className="h-14 text-xs py-5">{item.subtrack}</p>
                      <p className="h-14 text-xs py-5">{item.sectionClass}</p>
                      <p className="h-14 text-xs py-5">{item.shift}</p>
                      <p className="h-14 text-xs py-5">refuerzo lenguaje</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                    </div>

                    <div className="grid grid-cols-10 text-center">
                      <p className="h-14 text-xs py-5">{item.grade}</p>
                      <p className="h-14 text-xs py-5">{item.track}</p>
                      <p className="h-14 text-xs py-5">{item.subtrack}</p>
                      <p className="h-14 text-xs py-5">{item.sectionClass}</p>
                      <p className="h-14 text-xs py-5">{item.shift}</p>
                      <p className="h-14 text-xs py-5">refuerzo matematica</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                      <p className="h-14 text-xs py-5">-</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
    );
}

export default Remediation
