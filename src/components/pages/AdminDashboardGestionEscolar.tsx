import { BookOpen, BookOpenText, CardSim, ChartColumnIncreasing, ClockCheck, DraftingCompass, Funnel, GraduationCap, LaptopMinimalCheck, SquareUser } from "lucide-react"
import { exportToExcel, type Column } from "@/utils/exportExcell";

type RowProps = {
  grupo: string;
  idCe: string;
  nameCe: string;
  fase: string;
  matricula: string;
  cantidadAlumnos: string;
  seccionesTotales: string;
  seccionesDocentes: string;
};


function AdminDashboardGestionEscolar() {

const rows: RowProps[] = [
  {
    grupo: "A",
    idCe: "CE-001",
    nameCe: "Centro Escolar San José",
    fase: "1",
    matricula: "Sí",
    cantidadAlumnos: "320",
    seccionesTotales: "12",
    seccionesDocentes: "10",
  },
  {
    grupo: "A",
    idCe: "CE-001",
    nameCe: "Centro Escolar San José",
    fase: "1",
    matricula: "Sí",
    cantidadAlumnos: "320",
    seccionesTotales: "12",
    seccionesDocentes: "10",
  },
  {
    grupo: "A",
    idCe: "CE-001",
    nameCe: "Centro Escolar San José",
    fase: "1",
    matricula: "Sí",
    cantidadAlumnos: "320",
    seccionesTotales: "12",
    seccionesDocentes: "10",
  },
];

const columns: Column<RowProps>[] = [
  { header: "Grupo", key: "grupo" },
  { header: "ID CE", key: "idCe" },
  { header: "Nombre CE", key: "nameCe" },
  { header: "Fase", key: "fase" },
  { header: "Matrícula cerrada", key: "matricula" },
  { header: "Cantidad Alumnos", key: "cantidadAlumnos" },
  { header: "Secciones totales", key: "seccionesTotales" },
  { header: "Secciones con docente asignado", key: "seccionesDocentes" },
];
  return (
    <div>
      <div className="border border-gray-300 rounded-lg p-3">
        <p className="flex items-center text-gray-400 font-bold text-xl mb-4"><Funnel className="size-4" />Filtros de Búsqueda</p>
        <div className="flex flex-col my-3">
          <label className="text-xs font-semibold mb-1">Fase del Proyecto</label>
          <select className="border border-gray-200 rounded-lg p-2 text-gray-500 text-sm bg-gray-50">
            <option value="">Seleccione</option>
            <option value="">Fase 0</option>
            <option value="">Fase 1</option>
            <option value="">Fase 2</option>
            <option value="">Fase 3</option>
            <option value="">Fase 4</option>
          </select>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-xs font-semibold mb-1">Grupo Específico</label>
          <select className="border border-gray-200 rounded-lg p-2 text-gray-500 text-sm bg-gray-50">
            <option value="">Seleccione</option>
            <option value="">Grupo 1</option>
            <option value="">Grupo 2</option>
            <option value="">Grupo 3</option>
            <option value="">Grupo 4</option>
            <option value="">Grupo 5</option>
          </select>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-xs font-semibold mb-1">Código del Centro Escolar</label>
          <input type="search" placeholder="Ej. 10635" className="border border-gray-200 rounded-lg p-2 text-sm bg-gray-50"/>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-xs font-semibold mb-1">Nombre del Centro Escolar</label>
          <input type="search" placeholder="Ej. Pedro Felix Cantor" className="border border-gray-200 rounded-lg p-2 text-sm bg-gray-50"/>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-xs font-semibold mb-1">Departamento</label>
          <select className="border border-gray-200 rounded-lg p-2 text-gray-500 text-sm bg-gray-50">
            <option value="">Seleccione</option>
          </select>
        </div>
        <div className="flex flex-col my-3">
          <label className="text-xs font-semibold mb-1">Municipio</label>
          <select className="border border-gray-200 rounded-lg p-2 text-gray-500 text-sm bg-gray-50">
            <option value="">Seleccione</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
        <div className="bg-white p-6 rounded-3xl border-l-8 border-blue-500 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-blue-50 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Fase 0</p>
            <div className="text-4xl font-bold text-slate-900 mb-1">200</div>
            <p className="text-xs font-semibold text-blue-600">Centros Escolares</p>
            <p className="text-[10px] text-slate-400 mt-4 italic">Nombre de los grupos</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-l-8 border-blue-500 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-blue-50 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fase 1</p>
            <div className="text-4xl font-bold text-slate-900 mb-1">200</div>
            <p className="text-xs font-semibold text-blue-600">Centros Escolares</p>
            <p className="text-[10px] text-slate-400 mt-4 italic">Nombre de los grupos</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-l-8 border-blue-500 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-blue-50 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fase 2</p>
            <div className="text-4xl font-bold text-slate-900 mb-1">200</div>
            <p className="text-xs font-semibold text-blue-600">Centros Escolares</p>
            <p className="text-[10px] text-slate-400 mt-4 italic">Nombre de los grupos</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-l-8 border-blue-500 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-blue-50 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fase 3</p>
            <div className="text-4xl font-bold text-slate-900 mb-1">200</div>
            <p className="text-xs font-semibold text-blue-600">Centros Escolares</p>
            <p className="text-[10px] text-slate-400 mt-4 italic">Nombre de los grupos</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-l-8 border-blue-500 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-blue-50 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fase 4</p>
            <div className="text-4xl font-bold text-slate-900 mb-1">200</div>
            <p className="text-xs font-semibold text-blue-600">Centros Escolares</p>
            <p className="text-[10px] text-slate-400 mt-4 italic">Nombre de los grupos</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border-l-8 border-blue-500 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-blue-50 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total de Centros Escolares</p>
            <div className="text-4xl font-bold text-slate-900 mb-1">1000</div>
            <p className="text-xs font-semibold text-blue-600">Centros Escolares</p>
            <p className="text-[10px] text-slate-400 mt-4 italic">Nombre de los grupos</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={() => exportToExcel(rows, columns, "Gestion Escolar.xlsx")} className="flex items-center rounded-xl border border-green-700 text-green-900 px-2 py-2 mb-4 font-semibold cursor-pointer text-sm hover:border-green-800 hover:bg-green-800 hover:text-white transition-all transform">
          <CardSim className="size-4"/>
          Descargar Excel
        </button>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <h3 className="flex items-center gap-2 text-lg font-semibold my-1"><GraduationCap className="text-blue-800"/>Matricula</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-xs">
              <div className="flex justify-between">
                <div>
                  <p className="uppercase text-gray-400 font-semibold text-sm">Centros Escolares</p>
                  <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 400</p>
                </div>
                <p className="text-4xl font-semibold bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">67%</p>
              </div>
              <div className="bg-gray-300 rounded-xl">
                <div className="bg-linear-to-r from-blue-600 to-cyan-400 p-2 w-36 md:w-56 rounded-xl"></div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-xs">
              <div className="flex justify-between">
                <div>
                  <p className="uppercase text-gray-400 font-semibold text-sm">Alumnos</p>
                  <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center"><span className="text-black text-2xl font-bold mb-3">2100</span>/ 490</p>
                </div>
                <p className="text-4xl font-semibold bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">67%</p>
              </div>
              <div className="bg-gray-300 rounded-xl">
                <div className="bg-linear-to-r from-blue-600 to-cyan-400 p-2 w-36 md:w-56 rounded-xl"></div>
              </div>
            </div>
        </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg my-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold my-1"><SquareUser className="text-blue-800"/>Asignación Docente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-xs">
              <div className="flex justify-between">
                <div>
                  <p className="uppercase text-gray-400 font-semibold text-sm">Centros Escolares</p>
                  <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 400</p>
                </div>
                <p className="text-4xl font-semibold bg-linear-to-r from-cyan-600 to-green-400 bg-clip-text text-transparent">67%</p>
              </div>
              <div className="bg-gray-300 rounded-xl">
                <div className="bg-linear-to-r from-cyan-600 to-green-400 p-2 w-36 md:w-56 rounded-xl"></div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-xs">
              <div className="flex justify-between">
                <div>
                  <p className="uppercase text-gray-400 font-semibold text-sm">Secciones</p>
                  <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 400</p>
                </div>
                <p className="text-4xl font-semibold bg-linear-to-r from-cyan-600 to-green-400 bg-clip-text text-transparent">67%</p>
              </div>
              <div className="bg-gray-300 rounded-xl">
                <div className="bg-linear-to-r from-cyan-600 to-green-400 p-2 w-36 md:w-56 rounded-xl"></div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-xs">
              <div className="flex justify-between">
                <div>
                  <p className="uppercase text-gray-400 font-semibold text-sm">Alumnos</p>
                  <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 400</p>
                </div>
                <p className="text-4xl font-semibold bg-linear-to-r from-cyan-600 to-green-400 bg-clip-text text-transparent">67%</p>
              </div>
              <div className="bg-gray-300 rounded-xl">
                <div className="bg-linear-to-r from-cyan-600 to-green-400 p-2 w-36 md:w-56 rounded-xl"></div>
              </div>
            </div>
        </div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mt-8 mb-3"><BookOpen className="text-blue-800"/>Total Clases Asignadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-white p-4">
              <div className="text-center bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-center">
                  <DraftingCompass className="text-white bg-blue-600 size-10 p-2 rounded-full" />
                </div>
                <p className="text-blue-800 font-bold">Matemática</p>
              </div>
              <div className="text-center bg-orange-50 p-4 rounded-lg">
                <div className="flex justify-center">
                  <BookOpenText className="text-white bg-orange-600 size-10 p-2 rounded-full" />
                </div>
                <p className="text-orange-800 font-bold">Lenguaje</p>
              </div>
              <div className="text-center bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-center">
                  <ChartColumnIncreasing className="text-white bg-purple-600 size-10 p-2 rounded-full" />
                </div>
                <p className="text-purple-800 font-bold">Remediación</p>
              </div>
          </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg my-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold my-3"><ClockCheck className="text-blue-800"/>Publicación horarios optimizados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Centros Escolares</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Secciones</p>
          </div>
        </div>
      </div>




      <div className="bg-gray-50 p-3 rounded-lg my-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold my-3"><LaptopMinimalCheck className="text-blue-800"/>Vinculación plataforma LXP</h3>
        <p className="col-span-2 text-gray-600 font-semibold my-5">Accesos exitosos a LXP</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Director</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Docentes</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Alumnos</p>
          </div>
        </div>
        <p className="col-span-2 text-gray-600 font-semibold my-5">Usuarios con acceso diario a la plataforma</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Director</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Docentes</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Alumnos</p>
          </div>
        </div>
        
        <p className="col-span-2 text-gray-600 font-semibold my-5">Número de docentes con clase modelada</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Docentes</p>
          </div>
          <div className="bg-white p-3 rounded-lg">
              <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                        <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                        <circle className="text-indigo-500 progress-ring-circle" strokeWidth="10" strokeDasharray="314.159" strokeDashoffset="-720" strokeLinecap="round" stroke="currentColor" fill="transparent" r="50" cx="64" cy="64" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-700">67%</span>
                </div>
                <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center justify-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 65</p>
                <p className="font-semibold text-center text-gray-700">Alumnos</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-3xl p-8 overflow-hidden relative shadow-xl mt-3">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h4 className="text-slate-400 font-bold uppercase tracking-tighter text-sm mb-2">Tiempo promedio de uso</h4>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl font-black text-white">53.1</span>
                                <span className="text-2xl font-bold text-emerald-400 italic">minutos</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div className="w-full text-center px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                                <span className=" flex flex-col text-xl font-bold">53.1m</span>
                                <span className="text-[10px] text-slate-300 uppercase">Director</span>
                            </div>
                            <div className="w-full text-center px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                                <span className=" flex flex-col text-xl font-bold">53.1m</span>
                                <span className="text-[10px] text-slate-300 uppercase">Docentes</span>
                            </div>
                            <div className="w-full text-center px-6 py-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                                <span className=" flex flex-col text-xl font-bold">53.1m</span>
                                <span className="text-[10px] text-slate-300 uppercase">Alumnos</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -left-12 -top-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
      </div>
    </div>
  )
}

export default AdminDashboardGestionEscolar
