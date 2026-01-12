interface paginationProps {
    dataFiltered: unknown[],
    infoPerPage: number,
    page: number,
    setPage: (page: number) => void,
    schoolsPage: unknown[]
}

function Pagination({ dataFiltered, infoPerPage, page, setPage, schoolsPage }: paginationProps) {

    const totalPage = Math.ceil(dataFiltered.length / infoPerPage)
    const pageStart = (page - 1) * infoPerPage;
    const pageEnd = page * infoPerPage;
    schoolsPage = dataFiltered.slice(pageStart, pageEnd)

  return (
        <div className="flex justify-between">
            { schoolsPage.length !== 0 && page > 1 ? (
                <button onClick={() => setPage(page - 1)} className="p-2 border border-gray-300 rounded cursor-pointer">anterior</button>
            ) : (
                <button className="p-2 border border-gray-300 rounded opacity-50 cursor-not-allowed">anterior</button>
            ) }
            { schoolsPage.length !== 0 && page < totalPage ? (
                <button onClick={() => setPage(page + 1)} className="p-2 border border-gray-300 rounded cursor-pointer">siguiente</button>
            ) : (
                <button className="p-2 border border-gray-300 rounded opacity-50 cursor-not-allowed">siguiente</button>
            ) }
        </div>
  )
}

export default Pagination