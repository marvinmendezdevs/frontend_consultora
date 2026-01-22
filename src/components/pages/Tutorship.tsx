import { useQuery } from "@tanstack/react-query";
import { getMetricsTutorship } from "@/services/tutorship.services";
import { calculatePercentage } from "@/utils/index.utils";

type MetricsTutorshipType = {
    totalTeachers: number
    diagnosticos: number
    observaciones: number
    retroalimentaciones: number
}

const OBSERVATION_FEEDBACK_TOTAL = 7;

function Tutorship() {
    const { data, error, isLoading } = useQuery<MetricsTutorshipType>({
        queryKey: ["tutorship"],
        queryFn: getMetricsTutorship,
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div>Cargando datos...</div>
    if (error) return <div>Error: {error.message}</div>
    if (data) return (
        <div>
            <h2 className="font-bold text-indigo-700 text-2xl">Resumen general</h2>

            <div className="grid gap-4 md:grid-cols-[1fr_2fr] my-3">
                <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                    <p className="text-xs text-gray-600">Docentes asignados</p>
                    <p className="text-5xl font-black">{data.totalTeachers}</p>
                </div>

                <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                    <p className="text-xs text-gray-600">Diagnósticos realizados</p>

                    <div className="mt-1">
                        <p className="text-xs text-gray-800">
                            {calculatePercentage(data.totalTeachers, data.diagnosticos)}%
                        </p>
                        <div className="h-3 mt-1 rounded-lg bg-gray-300 overflow-hidden">
                            <div className="bg-indigo-600 h-3 rounded-lg" style={{ width: `${calculatePercentage(data.totalTeachers, data.diagnosticos)}%` }}></div>
                        </div>
                        <p className="text-xs">
                            {data.diagnosticos} diagnósticos realizados
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 my-3">
                <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                    <p className="text-xs text-gray-600">Observaciones realizadas</p>

                    <div className="mt-1">
                        <p className="text-xs text-gray-800">
                            {calculatePercentage(data.totalTeachers * OBSERVATION_FEEDBACK_TOTAL, data.observaciones)}%
                        </p>
                        <div className="h-3 mt-1 rounded-lg bg-gray-300 overflow-hidden">
                            <div className="bg-indigo-600 h-3 rounded-lg" style={{ width: `${calculatePercentage(data.totalTeachers * OBSERVATION_FEEDBACK_TOTAL, data.observaciones)}%` }}></div>
                        </div>
                        <p className="text-xs">
                            {data.observaciones} observaciones realizadas
                        </p>
                    </div>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                    <p className="text-xs text-gray-600">Retroalimentaciones realizadas</p>

                    <div className="mt-1">
                        <p className="text-xs text-gray-800">
                            {calculatePercentage(data.totalTeachers * OBSERVATION_FEEDBACK_TOTAL, data.retroalimentaciones)}%
                        </p>
                        <div className="h-3 mt-1 rounded-lg bg-gray-300 overflow-hidden">
                            <div className="bg-indigo-600 h-3 rounded-lg" style={{ width: `${calculatePercentage(data.totalTeachers * OBSERVATION_FEEDBACK_TOTAL, data.retroalimentaciones)}%` }}></div>
                        </div>
                        <p className="text-xs">
                            {data.retroalimentaciones} retroalimentaciones realizadas
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Tutorship
