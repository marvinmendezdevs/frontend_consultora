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
        const total = rowByDate[label].reduce((acc,item) => acc + item.total, 0);
        const access = rowByDate[label].reduce((acc,item) => acc + item.access, 0);
        const demo = rowByDate[label].reduce((acc,item) => acc + item.demo, 0);
        
        dataToChart.total.push(total)
        dataToChart.demo.push(demo)
        dataToChart.access.push(access)
    }

    const options = {
  responsive: true,
  maintainAspectRatio: false,
  // 1. Espaciado para que las etiquetas de los extremos no se corten
  layout: {
    padding: {
      right: 20,
      left: 10,
      top: 10
    }
  },
  elements: {
    line: {
      tension: 0.3, // Esto da la curvatura suave a las líneas
      borderWidth: 3,
    },
    point: {
      radius: 4, // Tamaño del punto en cada fecha
      hoverRadius: 6,
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      align: 'center' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 20,
        font: {
          size: 12,
          weight: 600
        },
        color: '#64748b'
      }
    },
    datalabels: {
      // Ajuste para que los números sigan la línea sin estorbar
      display: false,
      anchor: 'center' as const,
      align: 'bottom' as const,
      offset: 10,
      color: '#475569',
      font: {
        size: 11,
        weight: 600
      },
      // Esto evita que se amontonen si hay puntos muy cercanos
      padding: 4
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false, // Permite ver los datos de la fecha con solo pasar el mouse cerca
      backgroundColor: '#1e293b',
      padding: 12,
    }
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: '#f1f5f9'
      },
      ticks: {
        color: '#94a3b8',
        font: { size: 12 }
      }
    },
    y: {
      beginAtZero: false, // En tu imagen empieza en 1000
      min: 0,
      max: 6000,
      ticks: {
        stepSize: 1000,
        color: '#94a3b8'
      },
      grid: {
        color: '#f1f5f9'
      },
      border: {
        display: false
      }
    }
  }
};

    const labels = Object.keys(rowByDate);

    const data = {
        labels,
        datasets: [
            {
                label: `TOTAL ${type.toUpperCase()}`,
                data: dataToChart.total,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.7)',
            },
            {
                label: `${type.toUpperCase()} CON DEMO`,
                data: dataToChart.demo,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
            },
            {
                label: `${type.toUpperCase()} CON ACCESO`,
                data: dataToChart.access,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
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