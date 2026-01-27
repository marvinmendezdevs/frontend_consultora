import { ClipboardCheck, Funnel, GraduationCap } from "lucide-react"

function AdminDashboardTutoriaFormacion() {
  return (
    <>
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

      <div className="bg-gray-50 p-3 rounded-lg my-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold my-3"><ClipboardCheck className="text-blue-800"/>Diagnóstico inicial</h3>
        <div className="bg-white p-3 rounded-lg shadow-xs">
          <div className="flex justify-between">
            <div>
              <p className="uppercase text-gray-400 font-semibold text-sm">Centros Escolares</p>
              <p className="uppercase text-gray-400 font-semibold my-2 flex gap-1 items-center"><span className="text-black text-2xl font-bold mb-3">335</span>/ 400</p>
            </div>
            <p className="text-4xl font-semibold bg-linear-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">67%</p>
          </div>
          <div className="bg-gray-300 rounded-xl">
            <div className="bg-linear-to-r from-blue-600 to-cyan-400 p-2 w-36 md:w-[600px] rounded-xl"></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg my-4 ">
        <h3 className="flex items-center gap-2 text-lg font-semibold my-3"><GraduationCap className="text-blue-800"/>Formación Directivos y Docentes</h3>
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
                <p className="font-semibold text-center text-gray-700">Directores con Formación 12hrs</p>
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
                <p className="font-semibold text-center text-gray-700">Docentes con Formación 12 hrs</p>
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
                <p className="font-semibold text-center text-gray-700">Observaciones docentes</p>
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
                <p className="font-semibold text-center text-gray-700">Retroalimentaciones docentes</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg my-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold my-3"><GraduationCap className="text-blue-800"/>Tutoría y Formación Docente</h3>
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
                <p className="font-semibold text-center text-gray-700">Agendas de acompañamiento completadas</p>
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
                <p className="font-semibold text-center text-gray-700">Tutorías presenciales ejecutadas</p>
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
                <p className="font-semibold text-center text-gray-700">Docentes Tutoría Presencial</p>
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
                <p className="font-semibold text-center text-gray-700">Docentes Tutoría Virtual</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboardTutoriaFormacion
