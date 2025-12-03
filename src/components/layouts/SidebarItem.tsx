import type { ReactElement } from "react";
type SidebarItemProps = {
    icon: ReactElement;
    label: string;
    active: boolean;
    onClick: () => void;
}

function SidebarItem({ icon: IconElement, label, active, onClick }: SidebarItemProps){
  return (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
      active 
        ? 'bg-indigo-50 text-indigo-700 font-medium' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {IconElement}
    <span>{label}</span>
  </button>
)}

export default SidebarItem;
