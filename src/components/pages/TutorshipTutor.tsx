import { useState } from "react";
import { FunnelX, Search } from "lucide-react";
import SearchTutor from "./SearchTutor";
import TutorTeacherList from "./TutorTeacherList";

function TutorshipTutor() {
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [readOnly, setReadOnly] = useState(false)

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchTerm.length) return;

        setReadOnly(true);
        setSearch(searchTerm);
    }

    const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.currentTarget.value);

    const handleRemoveFilter = () => {
        setReadOnly(false);
        setSearch('');
        setSearchTerm('');
    }

    return (
        <>
            <div className="flex justify-between">
                <h2 className="font-bold text-indigo-700 text-2xl">Buscar docente</h2>

                <div className="flex gap-3 items-center">
                    {search && <FunnelX className="text-red-500" size={20} onClick={handleRemoveFilter} />}
                    <form className="flex border border-gray-200 rounded-full items-center overflow-hidden px-1" onSubmit={handleSearch}>
                        <input className="p-2 outline-0" placeholder="Digite DUI del docente" type="text" name="search" id="search" readOnly={readOnly} onChange={handleSearchTerm} value={searchTerm} />
                        <button className="p-2">
                            <Search />
                        </button>
                    </form>
                </div>

            </div>
            {!search.length ? (
                <p className="my-5 text-sm text-center p-2 bg-indigo-50 border border-indigo-600 text-indigo-600">Realice una búsqueda de docente por DUI</p>
            ) : (
                <SearchTutor
                    search={search}
                />
            )}

            <div className="border-t border-gray-300 my-3"></div>

            <h2 className="text-2xl font-black text-indigo-600">Lista de docentes asignados</h2>

            <TutorTeacherList
                setSearch={ setSearch }
                setReadOnly={ setReadOnly }
                setSearchTerm={ setSearchTerm }
            />
        </>
    )
}

export default TutorshipTutor
