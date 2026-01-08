import { useLocation } from "react-router";

function RemediationForm() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <h1>Remediation Form</h1>
        </div>
    );
}

export default RemediationForm;