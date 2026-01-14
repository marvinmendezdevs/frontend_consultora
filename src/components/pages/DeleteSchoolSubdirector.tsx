import { useState } from "react"
import UpdateSubdirector from "./UpdateSubdirector"

interface deleteUserProps{
  userId: number,
  schoolCode: number,
}

function DeleteSchoolSubdirector({userId, schoolCode}: deleteUserProps) {

  const [closeModal, setCloseModal] = useState<number>()
  console.log(userId, schoolCode, closeModal)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl transform transition-all">
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ¿Eliminar usuario?
        </h3>
        
        <p className="text-gray-500 mb-6">
          Esta acción eliminará al usuario permanentemente de la escuela. No podrás deshacer este cambio.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={() => setCloseModal(0)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
      <UpdateSubdirector
        closeModal={closeModal}
      />
    </div>
  )
}

export default DeleteSchoolSubdirector
