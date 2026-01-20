import type { SchoolInfoWithUsers } from "@/types/schoolmanagement.type"
import AddSectionsTeacher from "./AddSectionsTeacher"
import type { UserType } from "@/types/auth.types"

type sections = SchoolInfoWithUsers['sections']

interface ModalAddSectionsProps {
    user?: UserType,
    sections: sections
    onClose: () => void
}

function ModalAddSectionsSubdirector({user, sections, onClose}: ModalAddSectionsProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur p-5">
      <div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow transform transition-all m-5">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-normal text-gray-900">
            Agregar secciones al subdirector
            </h3>
            <button onClick={onClose} className="px-3 py-1 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg active:scale-95 transition-all cursor-pointer">
                X
            </button>
        </div>
        <div className="overflow-y-auto max-h-[500px] mt-5">
            <AddSectionsTeacher
                user={user}
                sections={sections}
            />
        </div>
      </div>
    </div>
  )
}

export default ModalAddSectionsSubdirector
