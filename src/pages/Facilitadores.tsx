import FacilitatorSchoolList from "@/components/pages/FacilitatorSchoolList"

const Facilitadores = () => {
    return (
        <div>
            <div className="mb-5">
                <h2 className="text-xl font-bold">Lista de centros escolares</h2>
                <p>Control de accesos de docentes</p>
            </div>

            <FacilitatorSchoolList />
            
        </div>
    )
}

export default Facilitadores