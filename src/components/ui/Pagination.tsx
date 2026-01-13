import type { Dispatch, SetStateAction } from "react"

type paginationProps = {
    setPage: Dispatch<SetStateAction<number>>
    totalPage: number
    page: number
}

function Pagination({ setPage, totalPage, page }: paginationProps) {


    return (
        <div className="flex justify-between mt-5">
            <button onClick={() => setPage(prev => prev - 1)} className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200 shadow-sm px-4 py-2.5 text-sm rounded-xl gap-2 cursor-pointer `} disabled={page <= 1}> « anterior</button>
            <button onClick={() => setPage(prev => prev + 1)} className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200 shadow-sm px-4 py-2.5 text-sm rounded-xl gap-2 cursor-pointer" disabled={page >= totalPage}>siguiente »</button>
        </div>
    )
}

export default Pagination