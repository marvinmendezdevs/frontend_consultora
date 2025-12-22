import type { ReactNode } from "react"

type NavLinksVerificatorType = {
    children: ReactNode,
    allowedRoles: string[],
    userRole: string
}

function NavLinksVerificator({ children, allowedRoles, userRole }: NavLinksVerificatorType) {
    const verifyRole = allowedRoles.includes(userRole);
    if(!verifyRole) return null;
    return <>{children}</>
}

export default NavLinksVerificator