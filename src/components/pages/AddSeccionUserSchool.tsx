import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { SectionItem, SchoolInfoWithUsers } from "@/types/schoolmanagement.type";
/* import { useMutation, useQueryClient } from "@tanstack/react-query";
 */
type SubjectValue = "Lenguaje" | "Matem_tica";

function AddSeccionUserSchool({
    isOpen,
    onClose,
    sections,
    schoolCode,
    teacher,
}: {
    isOpen: boolean;
    onClose: () => void;
    sections: SectionItem[];
    schoolCode: string;
    teacher: SchoolInfoWithUsers;
}) {
/*     const queryClient = useQueryClient();
 */


const director = teacher?.userSchool?.find((direct: any ) => direct.user.roleId === 7);
    const [sectionId, setSectionId] = useState<number | "">("");
    const [subject, setSubject] = useState<SubjectValue | "">("");
    const [error, setError] = useState<string>("");

    const assignedBySection = useMemo(() => {
        const map = new Map<number, Set<string>>();

        for (const sec of sections ?? []) {
            const set = new Set<string>();

            for (const a of (sec as any).assignments ?? []) {
                if (a.isDirector) {
                    set.add(a.subject);
                }
            }

            map.set((sec as any).id, set);
        }

        return map;
    }, [sections]);

    const options = useMemo(() => {
        return (sections ?? []).map((s: any) => {
            const label = `Grado ${s.grade}° · ${s.sectionClass} · ${s.shift}`;
            const alreadyHasThisSubject =
                subject !== "" && (assignedBySection.get(s.id)?.has(subject) ?? false);

            return {
                value: s.id,
                label,
                disabled: alreadyHasThisSubject,
                already: alreadyHasThisSubject,
            };
        });
    }, [sections, assignedBySection, subject]);

    useEffect(() => {
        if (!isOpen) {
            setSectionId("");
            setSubject("");
            setError("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (sectionId === "" || subject === "") return;
        const has = assignedBySection.get(Number(sectionId))?.has(subject) ?? false;
        if (has) setSectionId("");
    }, [subject, sectionId, assignedBySection]);

/*     const mutation = useMutation({
        mutationKey: ["add-section-assignment", schoolCode, directorDui],
        mutationFn: addSectionAssignment,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["school", schoolCode] });
            onClose();
        },
        onError: (err: any) => {
            setError(err?.response?.data?.msg ?? err?.message ?? "Error al guardar.");
        },
    }); */

    if (!isOpen) return null;

    const handleSave = () => {
        setError("");

        if (sectionId === "" || subject === "") {
            setError("Selecciona la sección y la materia.");
            return;
        }

        const duplicate = assignedBySection.get(Number(sectionId))?.has(subject) ?? false;
        if (duplicate) {
            setError("Esa materia ya está asignada al director en esa sección.");
            return;
        }

        const payload = {
            schoolCode,
            teacherId: director?.id,
            sectionId: sectionId,
            subject,
        };

        console.log(payload);

        /* mutation.mutate({
            schoolCode,
            directorDui,
            sectionId: sectionId,
            subject,
        }); */
    };

    const isSaving = false;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
            <button
                className="absolute inset-0 bg-black/40"
                onClick={isSaving ? undefined : onClose}
                aria-label="Cerrar modal"
                type="button"
            />

            <div className="relative z-10 w-[95%] max-w-md rounded-2xl bg-white shadow-xl border border-slate-200">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-800">Agregar asignación</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50"
                        aria-label="Cerrar"
                    >
                        <X className="size-5 text-slate-600" />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Materia</label>
                        <select
                            className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value as SubjectValue | "")}
                            disabled={isSaving}
                        >
                            <option value="">Seleccionar…</option>
                            <option value="Lenguaje">Lenguaje</option>
                            <option value="Matem_tica">Matemática</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Sección</label>
                        <select
                            className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-60"
                            value={sectionId}
                            onChange={(e) => setSectionId(e.target.value ? Number(e.target.value) : "")}
                            disabled={subject === "" || isSaving}
                            title={subject === "" ? "Primero selecciona una materia" : ""}
                        >
                            <option value="">{subject === "" ? "Primero selecciona materia…" : "Seleccionar…"}</option>

                            {options.map((op) => (
                                <option key={op.value} value={op.value} disabled={op.disabled}>
                                    {op.already ? `${op.label} (ya asignado)` : op.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {error ? (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded-lg">
                            {error}
                        </div>
                    ) : null}
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm disabled:opacity-50"
                    >
                        {isSaving ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddSeccionUserSchool;
