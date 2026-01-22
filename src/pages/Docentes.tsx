import Director from "@/components/pages/Director";
import Subdirector from "@/components/pages/Subdirector";
import useAuth from "@/hooks/useAuth.hooks";
import { Navigate } from "react-router";

function Docentes() {
        const { data: user } = useAuth();

        if(!user) return <Navigate replace to="/login" />
        if(user.role.name === 'Director') return <Director/>
        if(user.role.name === 'Director') return <Subdirector/>
}

export default Docentes
