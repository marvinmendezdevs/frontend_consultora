import { getTutorsInfo } from "@/services/tutorship.services";
import type { UserType } from "@/types/auth.types";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

type GroupedTutorsType = Record<string, UserType[]>

function TutorLeader() {
    const [tutorType, setTutorType] = useState("PRESENCIAL");
    const { isLoading, isError, data } = useQuery<UserType[]>({
        queryKey: ["tutors-info"],
        queryFn: getTutorsInfo,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const groupedTutors = useMemo(() => {
        if (!data) return {}

        return data.reduce((acc, item) => {
            if (!item.infoTutores) return acc;

            const type = item.infoTutores.type;

            if (!acc[type]) {
                acc[type] = [];
            }

            acc[type].push(item);

            return acc;
        }, {
            PRESENCIAL: [],
            VIRTUAL: []
        } as GroupedTutorsType);

    }, [data]);

    if (isLoading) return (
        <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
            <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
            Cargando información de tutores...
        </p>
    );

    if (isError) return (
        <p className="text-xs text-red-600 text-center p-3">
            ¡Error inespertado! contacte con soporte.
        </p>
    );

    if (data) return (
        <>
            <h2 className="text-lg font-black text-indigo-600">Información de tutores</h2>

            <div className="grid gap-4 md:grid-cols-3 my-3">
                <button className="shadow-inner p-4 bg-gray-50 rounded-lg text-start cursor-pointer" onClick={() => setTutorType("PRESENCIAL")}>
                    <p className="font-bold">Presenciales</p>
                    <p className="font-bold text-5xl">{groupedTutors.PRESENCIAL.length}</p>
                    <p className="text-xs">{groupedTutors.PRESENCIAL.length === 1 ? "Tutor" : "Tutores"}</p>
                </button>

                <button className="shadow-inner p-4 bg-gray-50 rounded-lg text-start cursor-pointer" onClick={() => setTutorType("VIRTUAL")}>
                    <p className="font-bold">Virtuales</p>
                    <p className="font-bold text-5xl">{groupedTutors.VIRTUAL.length}</p>
                    <p className="text-xs">{groupedTutors.VIRTUAL.length === 1 ? "Tutor" : "Tutores"}</p>
                </button>
            </div>


            <div>
                {groupedTutors[tutorType].map(tutor => (
                    <div>{tutor.name}</div>
                ))}
            </div>
        </>
    )
}

export default TutorLeader