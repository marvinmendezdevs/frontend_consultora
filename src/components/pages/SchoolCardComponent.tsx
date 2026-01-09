import type { SchoolInfo } from "@/types/schoolmanagement.type"
import { Building, MapPin, School, Users } from "lucide-react"
import { Link } from "react-router"

type SchoolCardComponentProps = {
    school: SchoolInfo
}

function SchoolCardComponent({ school }: SchoolCardComponentProps) {
    return (
        <div className="border border-gray-300 rounded p-3 flex flex-col items-center gap-3 md:flex-row" key={school.code}>
            <div className="bg-indigo-600 p-3 rounded-full text-white">
                <School />
            </div>

            <div className="flex-1">
                <p className="text-lg font-black">{school.name}</p>
                <div className="text-xs flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-lg">
                        <Building className="size-4" />
                        {school.code}
                    </div>

                    <div className="flex items-center lowercase">
                        <MapPin className="size-4" />
                        <p>{school.address}</p>
                    </div>
                </div>
            </div>

            <div className="text-xs ps-3">
                <Link className="flex cursor-pointer items-center gap-2 py-1 px-2 bg-gray-100 rounded-lg hover:bg-gray-200 active:scale-95" to={`/facilitadores/${school.code}/escuela`}>
                    <Users size={12} />
                    Docentes
                </Link>
            </div>
        </div>
    )
}

export default SchoolCardComponent