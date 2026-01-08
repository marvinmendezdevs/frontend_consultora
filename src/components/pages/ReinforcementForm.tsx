import { useLocation } from "react-router";

function ReinforcementForm() {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <h1>Reinforcement Form</h1>
        </div>
    );
}

export default ReinforcementForm;