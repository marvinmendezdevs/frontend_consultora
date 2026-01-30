import { readFileCsvToText, syncTeacherData } from "@/services/readFile.services"
import { useMutation } from "@tanstack/react-query"
import { CloudUpload, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
    file: FileList
}

function AdminComponent() {
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const mutation = useMutation({
        mutationKey: ["sync-teacher-data"],
        mutationFn: syncTeacherData
    });

    const onSubmit = async (formData: FormValues) => {
        const file = formData.file[0]
        if (!file) return

        setIsLoading(true)

        try {
            const textContent = await readFileCsvToText(file);
            
            mutation.mutate(textContent);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-black text-indigo-600">Actualización de datos</h2>

            <h3 className="mt-3 text-sm font-black text-slate-600">Docentes</h3>

            <form className="mt-3" onSubmit={handleSubmit(onSubmit)} >
                <div className="w-full">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900"
                        htmlFor="file_input"
                    >
                        Cargar archivo CSV
                    </label>

                    <input
                        className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2.5 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-indigo-50 file:text-indigo-700
      hover:file:bg-indigo-100
      border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        id="file_input"
                        type="file"
                        accept=".csv"
                        {...register('file', {
                            required: true,
                            validate: {
                                isCsv: (files) => files[0]?.type === 'text/csv' || files[0]?.name.endsWith('.csv') || "Solo se permiten archivos .csv"
                            }
                        })}
                    />
                    <p>{errors.file?.message}</p>

                    <p className="mt-1 text-xs text-gray-500" id="file_input_help">
                        Solo archivos .CSV (Máx. 5MB).
                    </p>
                </div>

                <button 
                    className={`bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg mt-3 ms-auto flex items-center gap-2 transition-all
                        ${isLoading ? 'opacity-70 cursor-not-allowed' : 'active:scale-95 cursor-pointer'}
                    `}
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Procesando...</span>
                        </>
                    ) : (
                        <>
                            <CloudUpload size={16} />
                            <span>Sincronizar Información</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default AdminComponent