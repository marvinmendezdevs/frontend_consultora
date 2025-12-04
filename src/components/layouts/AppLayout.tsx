import { useState } from 'react';
import { 
  Briefcase, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  ChevronRight, 
  Clock, 
  CheckCircle 
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import useAuth from '@/hooks/useAuth.hooks';

const stats = [
  { title: 'Ingresos Totales', value: '$12,450', change: '+12%', icon: TrendingUp, color: 'bg-green-500' },
  { title: 'Citas Activas', value: '24', change: '+4%', icon: Calendar, color: 'bg-blue-500' },
  { title: 'Nuevos Clientes', value: '8', change: '+15%', icon: Users, color: 'bg-purple-500' },
];

const upcomingAppointments = [
  { id: 1, time: '09:00', client: 'Ana García', type: 'Primera Vez', service: 'Consulta General', status: 'Confirmado' },
  { id: 2, time: '10:30', client: 'Carlos Ruiz', type: 'Seguimiento', service: 'Limpieza Dental', status: 'Pendiente' },
  { id: 3, time: '12:00', client: 'María López', type: 'Urgencia', service: 'Extracción', status: 'Cancelado' },
];

function AppLayout(){
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Inicio');

  const { data: user } = useAuth();

  const onLogout = () => {
    console.log('Logout clicked');
  };

  if(user) return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">GestiónPro</span>
          </div>

          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Principal</p>
            <SidebarItem icon={<LayoutDashboard />} label="Inicio" active={activeTab === 'Inicio'} onClick={() => setActiveTab('Inicio')} />
            <SidebarItem icon={<Calendar />} label="Agenda" active={activeTab === 'Agenda'} onClick={() => setActiveTab('Agenda')} />
            <SidebarItem icon={<Users />} label="Clientes" active={activeTab === 'Clientes'} onClick={() => setActiveTab('Clientes')} />
            
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 mt-8">Administración</p>
            <SidebarItem icon={<TrendingUp />} label="Finanzas" active={activeTab === 'Finanzas'} onClick={() => setActiveTab('Finanzas')} />
            <SidebarItem icon={<Settings />} label="Ajustes" active={activeTab === 'Ajustes'} onClick={() => setActiveTab('Ajustes')} />
          </div>

          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64">
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.jobTitle}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                {user.name[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Panel de Control</h1>
                <p className="text-slate-500">Aquí tienes el resumen de hoy, 24 de Octubre.</p>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition">
                <Plus size={20} />
                Nueva Cita
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                    <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-0.5 rounded-full">
                      {stat.change} vs ayer
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                    <stat.icon size={24} className={`${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Appointments List (Takes up 2 cols) */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Próximas Citas</h3>
                  <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                    Ver Agenda <ChevronRight size={16} />
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Hora</th>
                        <th className="px-6 py-4">Cliente</th>
                        <th className="px-6 py-4">Servicio</th>
                        <th className="px-6 py-4">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {upcomingAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-slate-900 font-medium">
                              <Clock size={16} className="text-slate-400" />
                              {apt.time}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{apt.client}</div>
                            <div className="text-xs text-slate-500">{apt.type}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{apt.service}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${apt.status === 'Confirmado' ? 'bg-green-100 text-green-800' : 
                                apt.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                            `}>
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions / Tips (Takes up 1 col) */}
              <div className="bg-indigo-900 text-white rounded-xl shadow-lg p-6 relative overflow-hidden flex flex-col justify-between">
                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>
                 <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                 
                 <div className="relative z-10">
                   <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                      <CheckCircle className="text-indigo-300" />
                   </div>
                   <h3 className="text-xl font-bold mb-2">Consejo Pro</h3>
                   <p className="text-indigo-200 text-sm mb-6">
                     Los recordatorios automáticos por WhatsApp reducen el ausentismo en un 40%.
                   </p>
                   <button className="w-full bg-white text-indigo-900 font-semibold py-2.5 rounded-lg hover:bg-indigo-50 transition text-sm">
                     Configurar Recordatorios
                   </button>
                 </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;