import type { UserType } from "@/types/auth.types"

type TutorshipTutorType = {
    user: UserType
}

function TutorshipTutor({ user }: TutorshipTutorType) {
    console.log(user)
    return (
        <>
            <h2 className="font-bold text-indigo-700 text-2xl">Lista de docentes</h2>
        </>
    )
}

export default TutorshipTutor