import { formatNumber } from "@/utils/index.utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
    title: string
    value: number
    icon: LucideIcon
    color: string
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className={`p-3 rounded-xl ${colorMap[color] || 'bg-slate-100'}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <h4 className="text-2xl font-bold text-slate-900">{formatNumber(value)}</h4>
        </div>
      </div>
    </div>
  );
};

export default StatCard;