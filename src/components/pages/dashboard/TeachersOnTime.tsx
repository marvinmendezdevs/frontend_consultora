import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { teacherDataProps } from './GeneralInformation';
import type { DashboardRecord } from '@/types/dashboard.types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type GroupedRow = {
    [date: string]: DashboardRecord[]
}

function TeachersOnTime({ teacherData, title }: teacherDataProps) {
    const [, , type] = title.split(" ");

    // Procesar los datos de los docentes para agrupar por fechas:
    const rowByDate = teacherData.reduce<GroupedRow>((acc, item) => {
        if (!acc[item.dateReported]) {
            acc[item.dateReported] = [];
        }

        acc[item.dateReported].push(item);

        return acc;
    }, {});

    const labelsToChart = Object.keys(rowByDate);
    const dataToChart: Record<string, number[]> = {
        total: [],
        demo: [],
        access: [],
    }

    for(const label of labelsToChart){        
        dataToChart.total.push(rowByDate[label][0].total)
        dataToChart.demo.push(rowByDate[label][1].demo)
        dataToChart.access.push(rowByDate[label][2].access)
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    const labels = Object.keys(rowByDate);

    const data = {
        labels,
        datasets: [
            {
                label: `TOTAL ${type.toUpperCase()}`,
                data: dataToChart.total,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: `${type.toUpperCase()} CON DEMO`,
                data: dataToChart.demo,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: `${type.toUpperCase()} CON ACCESO`,
                data: dataToChart.access,
                borderColor: 'rgba(25, 40, 145,0.6)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return (
        <div className="bg-white p-5 border border-gray-200 rounded-lg my-5">
            <h2 className="font-bold text-slate-600 uppercase">{title}</h2>

            <div className="min-h-[300px]">
                <Line options={options} data={data} />
            </div>
        </div>
    )
}

export default TeachersOnTime