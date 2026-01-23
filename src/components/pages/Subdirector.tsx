import FuncionamientoCe from "./FuncionamientoCe"

function Subdirector() {
  const currentDate = new Date()
      const formattedDate = currentDate.toLocaleString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
  return (
    <div>
        <div className="mb-5">
            <p><span className="font-semibold text-sm">Fecha:</span><span className="text-xs"> {formattedDate}</span></p>
        </div>
       <FuncionamientoCe/>
    </div>
  )
}

export default Subdirector
