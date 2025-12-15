import type { UserType } from "@/types/auth.types";

type TutorshipInfoTutoresProps = {
    tutor: UserType[];
    meta: {
      page: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    }
    setPage: (page: number) => void;
}

function TutorshipInfoTutores({ tutor, meta, setPage }: TutorshipInfoTutoresProps) {

  return (
    <>
    <div className="overflow-x-auto ">
      <p className="text-indigo-600 font-bold my-5">Tutores {tutor[0]?.infoTutores?.type == "PRESENCIAL" ? "Presenciales" : "Virtuales"}</p>
      <table className="w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-76 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">TUTOR</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TELÉFONO</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DISTRITO</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DIAGNÓSTICO</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">OBSERVACIONES</th>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">RETROALIMENTACIONES</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tutor.map((tutor, index) => (
            <tr key={index}>
              <td className="w-76 px-4 py-4 whitespace-nowrap flex flex-col"><span className="text-xs font-medium text-gray-900">{tutor.name}</span><span className="text-xs text-gray-500">{tutor.email}</span></td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{tutor.telephone}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{tutor?.infoTutores?.districts?.district ?? "-"}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{tutor?.infoTutores?.diagnostic}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{tutor?.infoTutores?.observations}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{tutor?.infoTutores?.retro}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        
        <button disabled={meta.hasPreviousPage === false} onClick={() => setPage(prev => prev - 1)}>Anterior</button>
        <button disabled={meta.hasNextPage === false} onClick={() => setPage(prev => prev + 1)}>Siguiente</button>
      </div>
    </div>
    </>
  )
}

export default TutorshipInfoTutores