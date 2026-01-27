import { CalendarCheck2, Database, Layers, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type DbTask = {
  id: string;
  phase: number;
  code: string;

  startYear?: number;
  startMonth: number; // 1..12
  endYear?: number;
  endMonth: number; // 1..12

  color: "pink" | "orange" | "green" | "purple" | "blue";
};

type DbResponse = {
  year: number;
  tasks: DbTask[];
};

type YM = { year: number; month: number }; // 1..12
type MonthCell = { abs: number; ym: YM };

// ✅ ahora una barra puede tener “items” internos (scroll dentro de la misma casilla)
type UiItem = { label: string; colorClass: string };

type UiBlock = {
  id: string;
  startIdx: number;
  endIdx: number;
  span: number;
  lane: number;
  items: UiItem[];
};

type Row = { name: string; blocks: UiBlock[]; lanesCount: number };

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const COLOR_MAP: Record<DbTask["color"], string> = {
  pink: "bg-fuchsia-600",
  orange: "bg-orange-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  blue: "bg-sky-600",
};

// ✅ paleta para items internos
const COLOR_RING = ["bg-fuchsia-600", "bg-orange-500", "bg-green-500", "bg-purple-500", "bg-sky-600"];

const clampMonth = (m: number) => Math.min(12, Math.max(1, m));
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

function ymToAbsIndex(ym: YM) {
  return ym.year * 12 + (ym.month - 1);
}
function absIndexToYm(abs: number): YM {
  const year = Math.floor(abs / 12);
  const month = (abs % 12) + 1;
  return { year, month };
}
function buildMonths(startAbs: number, endAbs: number): MonthCell[] {
  const out: MonthCell[] = [];
  for (let a = startAbs; a <= endAbs; a++) out.push({ abs: a, ym: absIndexToYm(a) });
  return out;
}
function buildYearBands(months: MonthCell[]) {
  const bands: { year: number; from: number; to: number }[] = [];
  for (let i = 0; i < months.length; i++) {
    const y = months[i].ym.year;
    const prev = bands[bands.length - 1];
    if (!prev || prev.year !== y) bands.push({ year: y, from: i, to: i });
    else prev.to = i;
  }
  return bands;
}

function assignLanesBlocks(tasks: Array<Omit<UiBlock, "lane">>) {
  const sorted = [...tasks].sort((a, b) => a.startIdx - b.startIdx || a.endIdx - b.endIdx);

  const laneEnds: number[] = [];
  const out: UiBlock[] = [];

  for (const t of sorted) {
    let lane = 0;
    while (lane < laneEnds.length && laneEnds[lane] >= t.startIdx) lane++;
    if (lane === laneEnds.length) laneEnds.push(t.endIdx);
    else laneEnds[lane] = t.endIdx;
    out.push({ ...t, lane });
  }

  return { blocks: out, lanesCount: Math.max(1, laneEnds.length) };
}

function mapCodeToGroup(code: string) {
  const m = code.match(/^([A-Za-z]+)(\d+)$/);
  if (!m) return code;

  const prefix = m[1].toUpperCase();
  const num = m[2];

  const prefixMap: Record<string, string> = {
    P: "G1-",
    S: "G2-",
    T: "G3-",
    C: "G4-",
    Q: "G5-",
  };

  const newPrefix = prefixMap[prefix] ?? `${prefix}-`;
  return `${newPrefix}${num}`; // ej: G1-800, G2-200, etc
}

function toItemsFromDiv200(code: string, baseColor: string): UiItem[] {
  const m = code.match(/^(.+?)-(\d+)$/);
  if (!m) return [{ label: code, colorClass: baseColor }];

  const prefix = `${m[1]}-`;
  const num = Number(m[2]);

  if (!Number.isFinite(num) || num <= 0) return [{ label: code, colorClass: baseColor }];
  if (num % 200 !== 0) return [{ label: code, colorClass: baseColor }];

  const count = Math.max(1, Math.floor(num / 200));

  // ✅ si solo es 200 (1 item), usa el color real de la tarea
  if (count === 1) {
    return [{ label: `${prefix}200`, colorClass: baseColor }];
  }

  // ✅ si hay varios (400, 600, 800...), el primero usa el color real y el resto rota
  return Array.from({ length: count }, (_, i) => ({
    label: `${prefix}200`,
    colorClass: i === 0 ? baseColor : COLOR_RING[(i - 1) % COLOR_RING.length],
  }));
}


const BAR_H = 160;
const GAP_Y = 0;
const PAD_Y = 0;

const FIXED_ROW_HEIGHT = 200;


function TaskBar({ block, colW }: { block: UiBlock; colW: number }) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const check = () => setHasOverflow(el.scrollHeight > el.clientHeight + 1);
    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [block.items.length]);

  return (
    <div
      className="absolute rounded-lg"
      style={{
        left: block.startIdx * colW + 6,
        width: block.span * colW - 12,
        top: PAD_Y + block.lane * (BAR_H + GAP_Y),
        height: BAR_H,
        overflow: "hidden",
      }}
      title={block.items.map((x) => x.label).join(" | ")}
    >
      {/* ✅ contenido con scroll interno */}
      <div
        ref={contentRef}
        className="h-full overflow-y-auto px-1 py-1"
      >
        <div className="space-y-1">
          {block.items.map((it, idx) => (
            <div
              key={`${block.id}-it-${idx}`}
              className={[
                "w-full rounded-md text-[11px] font-semibold text-white",
                "flex items-center justify-center leading-none",
                it.colorClass,
              ].join(" ")}
              style={{ height: 24 }}
            >
              {it.label}
            </div>
          ))}
        </div>
      </div>

      {hasOverflow && (
        <>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center pb-0.5">
            <ChevronDown className="h-3 w-3 text-slate-500" />
          </div>
        </>
      )}
    </div>
  );
}

export default function AdminDashboardGeneral() {
  const mockData: DbResponse = {
    year: 2026,
    tasks: [
      { id: "s20-2025", phase: 0, code: mapCodeToGroup("S200"), startYear: 2025, startMonth: 9, endYear: 2025, endMonth: 10, color: "pink" },

      { id: "t800-1", phase: 0, code: mapCodeToGroup("T800"), startYear: 2026, startMonth: 3, endYear: 2026, endMonth: 4, color: "orange" },
      { id: "c800-1", phase: 0, code: mapCodeToGroup("C800"), startYear: 2026, startMonth: 6, endYear: 2026, endMonth: 7, color: "green" },
      { id: "q800-1", phase: 0, code: mapCodeToGroup("Q800"), startYear: 2026, startMonth: 9, endYear: 2026, endMonth: 10, color: "purple" },

      { id: "s800-2", phase: 1, code: mapCodeToGroup("S200"), startYear: 2026, startMonth: 2, endYear: 2026, endMonth: 4, color: "pink" },
      { id: "t800-2", phase: 1, code: mapCodeToGroup("T800"), startYear: 2026, startMonth: 5, endYear: 2026, endMonth: 7, color: "orange" },
      { id: "c800-2", phase: 1, code: mapCodeToGroup("C800"), startYear: 2026, startMonth: 8, endYear: 2026, endMonth: 10, color: "green" },

      { id: "p800-1", phase: 2, code: mapCodeToGroup("P200"), startYear: 2026, startMonth: 2, endYear: 2026, endMonth: 4, color: "blue" },
      { id: "s800-3", phase: 2, code: mapCodeToGroup("S200"), startYear: 2026, startMonth: 5, endYear: 2026, endMonth: 7, color: "pink" },
      { id: "t800-3", phase: 2, code: mapCodeToGroup("T800"), startYear: 2026, startMonth: 8, endYear: 2026, endMonth: 10, color: "orange" },

      { id: "p800-2", phase: 3, code: mapCodeToGroup("P200"), startYear: 2026, startMonth: 5, endYear: 2026, endMonth: 7, color: "blue" },
      { id: "s800-4", phase: 3, code: mapCodeToGroup("S200"), startYear: 2026, startMonth: 8, endYear: 2026, endMonth: 10, color: "pink" },

      { id: "p800-3", phase: 4, code: mapCodeToGroup("P200"), startYear: 2026, startMonth: 7, endYear: 2026, endMonth: 10, color: "blue" },
    ],
  };

  const colW = 140;
  const LEFT_W = 100;

  const timelineScrollRef = useRef<HTMLDivElement | null>(null);
  const leftSentinelRef = useRef<HTMLDivElement | null>(null);
  const rightSentinelRef = useRef<HTMLDivElement | null>(null);

  const baseStart: YM = { year: 2024, month: 9 };
  const baseAbsStart = ymToAbsIndex(baseStart);

  const [range, setRange] = useState(() => ({
    startAbs: baseAbsStart,
    endAbs: baseAbsStart + 15,
  }));

  const months = useMemo(() => buildMonths(range.startAbs, range.endAbs), [range]);
  const yearBands = useMemo(() => buildYearBands(months), [months]);
  const timelineWidth = months.length * colW;

  const rows: Row[] = useMemo(() => {
    const byPhase: Map<number, Array<Omit<UiBlock, "lane">>> = new Map();

    const toAbs = (t: DbTask, which: "start" | "end") => {
      const y = which === "start" ? (t.startYear ?? mockData.year) : (t.endYear ?? mockData.year);
      const m = which === "start" ? t.startMonth : t.endMonth;
      return ymToAbsIndex({ year: y, month: clampMonth(m) });
    };

    for (const t of mockData.tasks) {
      const a = toAbs(t, "start");
      const b = toAbs(t, "end");

      const startIdx = clamp(Math.min(a, b) - range.startAbs, 0, months.length - 1);
      const endIdx = clamp(Math.max(a, b) - range.startAbs, 0, months.length - 1);

      const baseColor = COLOR_MAP[t.color] ?? "bg-slate-600";
      const items = toItemsFromDiv200(t.code, baseColor);

      const block: Omit<UiBlock, "lane"> = {
        id: t.id,
        startIdx,
        endIdx,
        span: endIdx - startIdx + 1,
        items,
      };

      const list = byPhase.get(t.phase) ?? [];
      list.push(block);
      byPhase.set(t.phase, list);
    }

    return Array.from({ length: 5 }, (_, phase) => {
      const list = byPhase.get(phase) ?? [];
      const packed = assignLanesBlocks(list);
      return { name: `Fase ${phase}`, blocks: packed.blocks, lanesCount: packed.lanesCount };
    });
  }, [mockData.tasks, range.startAbs, months.length, mockData.year]);

  useEffect(() => {
    const el = timelineScrollRef.current;
    if (!el) return;
    el.scrollLeft = colW * 2;
  }, [colW]);

  useEffect(() => {
    const root = timelineScrollRef.current;
    const leftS = leftSentinelRef.current;
    const rightS = rightSentinelRef.current;
    if (!root || !leftS || !rightS) return;

    const ADD_MONTHS = 24;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;

          if (e.target === rightS) {
            setRange((prev) => ({ startAbs: prev.startAbs, endAbs: prev.endAbs + ADD_MONTHS }));
          }

          if (e.target === leftS) {
            setRange((prev) => {
              const addedPx = ADD_MONTHS * colW;
              requestAnimationFrame(() => {
                root.scrollLeft = root.scrollLeft + addedPx;
              });
              return { startAbs: prev.startAbs - ADD_MONTHS, endAbs: prev.endAbs };
            });
          }
        }
      },
      {
        root,
        rootMargin: `0px ${colW * 6}px 0px ${colW * 6}px`,
        threshold: 0.01,
      }
    );

    io.observe(leftS);
    io.observe(rightS);
    return () => io.disconnect();
  }, [colW]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-indigo-700 mb-5">
        <Layers className="size-5" />
        <h3 className="text-lg font-semibold">Información por grupo</h3>
      </div>

      <div className="flex justify-center w-full">
        <div className="w-full md:w-6/12">
          <p className="text-gray-800 font-semibold text-sm mb-1">Número de CE planificados</p>
          <div className="border border-gray-300 flex justify-center items-center p-4 rounded-lg shadow-inner">
            <p className="font-bold text-3xl text-gray-800">800</p>
          </div>
        </div>
      </div>  

      
      <div className="flex items-center gap-2 my-5 text-indigo-700">
        <CalendarCheck2 className="size-5" />
        <h1 className="text-lg font-semibold">Planificación Modernización CE</h1>
      </div>

      <div className="w-full border border-gray-200 rounded-md overflow-hidden bg-white">
        <div className="grid" style={{ gridTemplateColumns: `${LEFT_W}px 1fr` }}>
          <div className="bg-gray-50 border-r border-gray-200">
            <div className="h-[84px] border-b border-gray-200 flex items-center px-5 font-semibold text-slate-700">
              Fase/Mes
            </div>

            {rows.map((row) => (
              <div
                key={row.name}
                className="flex items-center px-5 text-base font-semibold text-slate-700 border-b border-gray-200"
                style={{ height: FIXED_ROW_HEIGHT }}
              >
                {row.name}
              </div>
            ))}
          </div>

          <div ref={timelineScrollRef} className="overflow-x-auto">
            <div style={{ width: timelineWidth }}>
              <div className="sticky top-0 z-20 bg-white border-b border-gray-200 h-9 flex">
                {yearBands.map((b) => {
                  const span = b.to - b.from + 1;
                  return (
                    <div
                      key={b.year}
                      className="flex items-center justify-center font-semibold text-slate-800 border-r border-gray-200"
                      style={{ width: span * colW }}
                    >
                      {b.year}
                    </div>
                  );
                })}
              </div>

              <div className="sticky top-9 z-20 bg-white border-b border-gray-200 h-12 flex">
                {months.map((m, i) => {
                  const isYearStart = i === 0 || months[i - 1].ym.year !== m.ym.year;
                  return (
                    <div
                      key={m.abs}
                      className={[
                        "flex items-center justify-center font-semibold text-slate-700 border-r border-gray-200",
                        isYearStart ? "border-l-4 border-l-red-500" : "",
                      ].join(" ")}
                      style={{ width: colW }}
                      title={`${MONTHS[m.ym.month - 1]} ${m.ym.year}`}
                    >
                      {MONTHS[m.ym.month - 1]}
                    </div>
                  );
                })}
              </div>

              <div className="relative h-0">
                <div ref={leftSentinelRef} className="absolute left-0 top-0 h-1 w-1 opacity-0" />
                <div ref={rightSentinelRef} className="absolute right-0 top-0 h-1 w-1 opacity-0" />
              </div>

              {rows.map((row) => {
                const contentHeight = PAD_Y * 2 + row.lanesCount * BAR_H + (row.lanesCount - 1) * GAP_Y;

                return (
                  <div key={row.name} className="relative border-b border-gray-200 bg-white" style={{ height: FIXED_ROW_HEIGHT }}>
                    <div className="absolute inset-0 pointer-events-none cursor-pointer">
                      <div className="flex h-full">
                        {months.map((m, i) => {
                          const isYearStart = i === 0 || months[i - 1].ym.year !== m.ym.year;
                          return (
                            <div
                              key={m.abs}
                              className={[
                                "h-full border-r border-gray-200",
                                isYearStart ? "border-l-4 border-l-red-500" : "",
                              ].join(" ")}
                              style={{ width: colW }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="absolute inset-0 overflow-y-auto cursor-pointer" style={{ height: FIXED_ROW_HEIGHT }}>
                      <div className="relative" style={{ height: Math.max(FIXED_ROW_HEIGHT, contentHeight) }}>
                        {row.blocks.map((block) => (
                          <TaskBar key={block.id} block={block} colW={colW} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 my-5 text-indigo-700">
        <Database className="size-5" />
        <h3 className="text-lg font-semibold">Base de datos CE</h3>
      </div>
      <div className="flex items-center my-2 gap-1">
        <p className="w-">Buscar </p>
        <input type="search" placeholder="Fase, Bloque, Departamento, Municipio, Planificado/Real" className="px-2 py-1 w-full border border-gray-200 rounded-md" />
      </div>
      <div className="overflow-y-auto ">
        <table className="w-full table-fixed">
          <thead className="bg-gray-200">
            <tr className="text-gray-600">
              <th className="p-3 text-xs rounded-tl-xl ">Grupo</th>
              <th className="p-3 text-xs ">Código CE</th>
              <th className="p-3 text-xs ">Nombre CE</th>
              <th className="p-3 text-xs ">Fase</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            <tr>
              <td className="text-xs text-center text-gray-600 p-4">1</td>
              <td className="text-xs text-center text-gray-600 p-4">Completa</td>
              <td className="text-xs text-center text-gray-600 p-4">Completa</td>
              <td className="text-xs text-center text-gray-600 p-4 flex flex-col justify-center items-center"><span>4</span><span>No iniciada</span></td>
            </tr>
            <tr>
              <td className="text-xs text-center text-gray-600 p-4">2</td>
              <td className="text-xs text-center text-gray-600 p-4">-</td>
              <td className="text-xs text-center text-gray-600 p-4">-</td>
              <td className="text-xs text-center text-gray-600 p-4">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
