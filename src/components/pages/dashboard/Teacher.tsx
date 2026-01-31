import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type DashboardRecord = {
    id: number,
    total: number,
    demo: number,
    access: number,
    group: number
}

type teacherDataProps = {
    teacherData: DashboardRecord[]
}


function Teacher({ teacherData }: teacherDataProps) {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                borderRadius: 8,
                titleFont: {
                    size: 14,
                    weight: 700 // Número directo para evitar error de tipo 'string'
                },
                bodyFont: {
                    size: 13,
                    weight: 400 // Número directo
                },
                displayColors: true,
                boxPadding: 6,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11,
                        weight: 500 // Número directo
                    },
                },
            },
            y: {
                grid: {
                    color: '#f1f5f9',
                    drawTicks: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 11,
                        weight: 400 // Número directo
                    },
                    stepSize: 5,
                    padding: 10,
                },
            },
        },
    };

    console.log(teacherData)
    console.log(teacherData.map(item => item.total))

    const data = {
        // ESTOS SON TUS ITEMS (Eje X)
        labels: teacherData.map(item => `Grupo ${item.group}`),

        // AQUÍ ESTÁN LAS 3 BARRAS POR CADA ITEM
        datasets: [
            {
                label: 'Total docentes', // Barra 1
                data: teacherData.map(item => item.total),       // Valores para cada escuela
                backgroundColor: 'rgba(53, 162, 235, 0.7)', // Azul
            },
            {
                label: 'Docentes con acceso', // Barra 2
                data: teacherData.map(item => item.access),       // Valores para cada escuela
                backgroundColor: 'rgba(75, 192, 192, 0.7)', // Verde azulado
            },
            {
                label: 'Docentes demo',      // Barra 3
                data: teacherData.map(item => item.demo),        // Valores para cada escuela
                backgroundColor: 'rgba(255, 99, 132, 0.7)', // Rojo/Rosado
            },
        ],
    };

    return (
        <div className="bg-white p-5 border border-gray-200 rounded-lg my-5">
            <h2 className="font-bold text-slate-600 uppercase">Información de docentes</h2>

            <div className="grid gap-5 mt-3 items-center lg:grid-cols-2">
                <div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Grupo</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Acceso</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Demo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {teacherData.map((row) => (
                                <tr key={row.group} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        Grupo {row.group}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-slate-600 font-medium">{row.total}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                            {row.access}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                                            {row.demo}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    )
}

export default Teacher