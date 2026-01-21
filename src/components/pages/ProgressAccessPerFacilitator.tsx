import type { DashboardFacilitatorType } from "@/types/schoolmanagement.type";
import Pagination from "../ui/Pagination"
import { cleanSearchTerm, formatDate, getHours } from "@/utils/index.utils";
import { usePagination } from "@/hooks/usePagination";

type sectionPerFacilitatorType = {
  id: number;
  name: string;
  email: string;
  username: string;
  telephone: string;
  dui: string;
  roleId: number;
  createdAt: string;
  verified: boolean;
  lastLogin?: string;
  _count: {
    teacherSectionAccess: number;
  };
}

function ProgressAccessPerFacilitator({ sectionPerFacilitator }: {sectionPerFacilitator: DashboardFacilitatorType['sectionPerFacilitator']} ) {

    const filterByName = (facilitator: sectionPerFacilitatorType, searchTerm: string) => {
        return cleanSearchTerm(facilitator.name).includes(cleanSearchTerm(searchTerm))
    }

    const {
        handleSetSearchTerm,
        totalPage,
        itemsPage,
        setPage,
        page
    } = usePagination<sectionPerFacilitatorType>({
        data: sectionPerFacilitator,
        perPage: 5,
        fn: filterByName,
    });

    return (
        <div className="mt-5">
            <input
                className="p-2 border border-gray-300 block mb-3 outline-0 w-full md:ms-auto"
                type="search"
                placeholder="Digita el código o nombre del centro escolar"
                onChange={handleSetSearchTerm}
            />
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-200 border-b-2">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th>Últ. conexión</th>
                            <th className="p-2 max-w-14">Secciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {itemsPage.map(facilitator => (
                            <tr key={facilitator.id}>
                                <td className="p-2">
                                    {facilitator.name}
                                </td>
                                <td>
                                    <p className="text-xs text-gray-700 text-center">
                                        {formatDate(facilitator.lastLogin as string)}, {" "}
                                        {getHours(facilitator.lastLogin as string)}
                                    </p>
                                </td>
                                <td className="text-center p-2">
                                    {facilitator._count.teacherSectionAccess}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                setPage={setPage}
                totalPage={totalPage}
                page={page}
            />
        </div>
    )
}

export default ProgressAccessPerFacilitator