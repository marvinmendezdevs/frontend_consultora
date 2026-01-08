import { useQuery } from "@tanstack/react-query";
import { remediacionSchool } from "@/services/school.services";
import { useParams } from "react-router";
import TableRemediation from "./TableRemediation";

function Remediation() {

  const { schoolCode } = useParams();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["remediacion", schoolCode],
    queryFn: () => remediacionSchool(schoolCode as string),
  });

  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {isError}</p>;
  if (data) return (
    <div>
      <h1 className="text-xl font-semibold my-6">Remedicación y refuerzo</h1>
      <div>
        <TableRemediation data={data} />
      </div>
    </div>
  );
}

export default Remediation
