import { useLocation } from "react-router";

function BaseFormRemediation() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <h1>Base Form Remediation</h1>
        </div>
    );
}

export default BaseFormRemediation;