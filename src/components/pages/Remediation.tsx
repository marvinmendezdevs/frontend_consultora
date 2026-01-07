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
        <h1 className="text-xl font-semibold my-2">Remedicación y refuerzo</h1>
        <div className="w-full table-fixed overflow-x-auto">
          <div className="grid grid-cols-10 bg-gray-100 p-1 w-full">
            <div className="col-span-1 w-36">
              <p>Grado</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Tipo</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Opción</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Sección</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Turno</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Materia</p>
            </div>
            <div className="col-span-1 w-38">
              <p>Docente</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Dui</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Phone</p>
            </div>
            <div className="col-span-1 w-36">
              <p>Email</p>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-2 w-full">
            {data.map((item: SectionItem) => (
              <div key={item.id}>
                <p>{item.grade}</p>
                <p>{item.track}</p>
                <p>{item.subtrack}</p>
                <p>{item.sectionClass}</p>
                <p>{item.shift}</p>
                <p>lenguaje</p>
                <p>lenguaje</p>
                <p>lenguaje</p>
                <p>lenguaje</p>
                <p>lenguaje</p>
              </div>
            ))}
          </div>
        </div>
    </div>
    );
}

export default Remediation
