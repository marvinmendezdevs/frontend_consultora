import { useNavigate } from "react-router"; // o react-router-dom
import type { SectionItem } from "@/types/schoolmanagement.type";

type RowKind = "general" | "remediation" | "reinforcement";

const ROWS = [
    { label: "Lenguaje", kind: "general" },
    { label: "Matemática", kind: "general" },
    { label: "Remediación Lenguaje", kind: "remediation" },
    { label: "Remediación Matemática", kind: "remediation" },
    { label: "Refuerzo Lenguaje", kind: "reinforcement" },
    { label: "Refuerzo Matemática", kind: "reinforcement" },
] as const;

type Row = (typeof ROWS)[number];

export type SectionRouteState = Pick<
    SectionItem,
    "id" | "grade" | "track" | "subtrack" | "sectionClass" | "shift"
> & {
    activityLabel: string;
    kind: RowKind;
    schoolCode: string;
};

interface TableRemediationProps {
    data: SectionItem[];
}

function TableRemediation({ data }: TableRemediationProps) {
    const navigate = useNavigate();

    const handleClick = (item: SectionItem, row: Row) => {
        const payload: SectionRouteState = {
            id: item.id,
            grade: item.grade,
            track: item.track,
            subtrack: item.subtrack,
            sectionClass: item.sectionClass,
            shift: item.shift,
            activityLabel: row.label,
            kind: row.kind,
            schoolCode: item.schoolCode,
        };

        console.log(payload);
        const path =
            row.kind === "general"
                ? "/schools/general/form"
                : row.kind === "remediation"
                    ? "/schools/remediation/form"
                    : "/schools/reinforcement/form";

        navigate(path, { state: payload });
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[900px]">
                <div className="grid grid-cols-10 bg-gray-100 p-1 w-full text-center text-gray-700 text-sm font-semibold">
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

                {data.map((item, index) => (
                    <div
                        key={`${item.sectionClass}-${index}`}
                        className="border border-gray-200 rounded-sm mb-3 overflow-hidden"
                    >
                        <div className="divide-y divide-gray-200">
                            {ROWS.map((row) => (
                                <div
                                    key={`${item.sectionClass}-${row.label}`}
                                    onClick={() => handleClick(item, row)}
                                    className="grid grid-cols-10 text-center cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") handleClick(item, row);
                                    }}
                                >
                                    <p className="h-14 text-xs py-5">{item.grade}</p>
                                    <p className="h-14 text-xs py-5">{item.track}</p>
                                    <p className="h-14 text-xs py-5">{item.subtrack}</p>
                                    <p className="h-14 text-xs py-5">{item.sectionClass}</p>
                                    <p className="h-14 text-xs py-5">{item.shift}</p>

                                    <p className="h-14 text-xs py-5">{row.label}</p>

                                    <p className="h-14 text-xs py-5">-</p>
                                    <p className="h-14 text-xs py-5">-</p>
                                    <p className="h-14 text-xs py-5">-</p>
                                    <p className="h-14 text-xs py-5">-</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TableRemediation;
