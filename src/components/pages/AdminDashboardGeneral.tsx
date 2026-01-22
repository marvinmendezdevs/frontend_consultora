import { useMemo } from "react";

type DbTask = {
  id: string;
  phase: number;
  code: string;
  startMonth: number;
  endMonth: number;
  color: "pink" | "orange" | "green" | "purple" | "blue";
};

type DbResponse = {
  year: number;
  tasks: DbTask[];
};

type UiTask = {
  id: string;
  label: string;
  start: number; // 1..12
  end: number;   // 1..12
  span: number;
  lane: number;  // 0..n
  colorClass: string;
};

type Row = {
  name: string;
  tasks: UiTask[];
  lanesCount: number;
};

const MONTHS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

const COLOR_MAP: Record<DbTask["color"], string> = {
  pink: "bg-fuchsia-600",
  orange: "bg-orange-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  blue: "bg-sky-600",
};

const clampMonth = (m: number) => Math.min(12, Math.max(1, m));

const mapDbToUiTask = (t: DbTask): Omit<UiTask, "lane"> => {
  const start = clampMonth(t.startMonth);
  const end = clampMonth(t.endMonth);
  const realEnd = Math.max(start, end);

  return {
    id: t.id,
    label: t.code,
    start,
    end: realEnd,
    span: Math.max(1, realEnd - start + 1),
    colorClass: COLOR_MAP[t.color] ?? "bg-slate-600",
  };
};

function assignLanes(
  tasks: Array<Omit<UiTask, "lane">>
): { tasks: UiTask[]; lanesCount: number } {
  const sorted = [...tasks].sort((a, b) => a.start - b.start || a.end - b.end);

  const laneEnds: number[] = [];
  const out: UiTask[] = [];

  for (const t of sorted) {
    let lane = 0;

    while (lane < laneEnds.length && laneEnds[lane] >= t.start) {
      lane++;
    }

    if (lane === laneEnds.length) laneEnds.push(t.end);
    else laneEnds[lane] = t.end;

    out.push({ ...t, lane });
  }

  return { tasks: out, lanesCount: laneEnds.length };
}

const BAR_H = 28; 
const GAP_Y = 8;  
const PAD_Y = 10; 

const MAX_ROW_HEIGHT = 140; 

function TaskBar({ task }: { task: UiTask }) {
  return (
    <div
      style={{
        gridColumn: `${task.start} / span ${task.span}`,
        transform: `translateY(${PAD_Y + task.lane * (BAR_H + GAP_Y)}px)`,
        height: `${BAR_H}px`,
      }}
      className={[
        "rounded-md text-white text-xs font-semibold",
        "flex items-center justify-center shadow-sm",
        task.colorClass,
      ].join(" ")}
      title={`${task.label} (Mes ${task.start}–${task.end})`}
    >
      {task.label}
    </div>
  );
}

function AdminDashboardGeneral() {
  const mockData: DbResponse = {
    year: 2026,
    tasks: [
      { id: "1", phase: 0, code: "S20", startMonth: 1, endMonth: 1, color: "pink" },
      { id: "2", phase: 1, code: "S200", startMonth: 2, endMonth: 3, color: "pink" },
      { id: "3", phase: 1, code: "T800", startMonth: 5, endMonth: 5, color: "orange" },
      { id: "4", phase: 1, code: "C800", startMonth: 7, endMonth: 7, color: "green" },
      { id: "5", phase: 2, code: "P200", startMonth: 6, endMonth: 7, color: "blue" },
      { id: "6", phase: 3, code: "S200", startMonth: 9, endMonth: 10, color: "purple" },
      { id: "7", phase: 4, code: "P800", startMonth: 10, endMonth: 12, color: "blue" },

      { id: "8", phase: 4, code: "P200", startMonth: 2, endMonth: 12, color: "pink" },
      { id: "9", phase: 4, code: "P200", startMonth: 2, endMonth: 12, color: "green" },
      { id: "10", phase: 4, code: "P200", startMonth: 2, endMonth: 12, color: "purple" },
    ],
  };

  const rows: Row[] = useMemo(() => {
    const byPhase = new Map<number, Array<Omit<UiTask, "lane">>>();

    for (const task of mockData.tasks) {
      const list = byPhase.get(task.phase) ?? [];
      list.push(mapDbToUiTask(task));
      byPhase.set(task.phase, list);
    }

    return Array.from(byPhase.entries())
      .sort(([a], [b]) => a - b)
      .map(([phase, tasks]) => {
        const packed = assignLanes(tasks);
        return {
          name: `Fase ${phase}`,
          tasks: packed.tasks,
          lanesCount: packed.lanesCount,
        };
      });
  }, [mockData.tasks]);

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">
        Seguimiento Gantt – Modernización CE
      </h1>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[140px_1fr]">
            <div />
            <div className="grid grid-cols-12 border border-gray-300 divide-x divide-gray-300">
              {MONTHS.map((m) => (
                <div
                  key={m}
                  className="h-10 flex items-center justify-center text-xs font-semibold bg-yellow-200"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-300 border-t-0 divide-y">
            {rows.map((row) => {
              const contentHeight =
                PAD_Y * 2 +
                row.lanesCount * BAR_H +
                (row.lanesCount - 1) * GAP_Y;

              const viewHeight = Math.min(contentHeight, MAX_ROW_HEIGHT);

              return (
                <div key={row.name} className="grid grid-cols-[140px_1fr]">
                  <div className="bg-gray-100 flex items-center px-3 text-sm font-semibold">
                    {row.name}
                  </div>

                  <div
                    className="relative overflow-hidden border-l border-gray-300"
                    style={{ height: viewHeight }}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="grid grid-cols-12 h-full divide-x divide-gray-300" />
                    </div>

                    <div className="absolute inset-0 overflow-y-auto" style={{ height: viewHeight }}>
                      <div className="relative" style={{ height: contentHeight }}>
                        <div className="absolute inset-0 grid grid-cols-12 px-1">
                          {row.tasks.map((task) => (
                            <TaskBar key={task.id} task={task} />
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardGeneral;
