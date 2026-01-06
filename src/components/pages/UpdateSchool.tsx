import type { SchoolInfo } from "@/types/schoolmanagement.type";

function UpdateSchool({ school }: { school: SchoolInfo }) {

  return (
    <div>
      <div>
        <div className="w-full bg-white rounded-xl p-5">
          <div className="flex flex-col space-y-3">
              <label className="text-sm">Nombre</label>
              <input
                className="w-full border border-gray-200 rounded p-2 font-light text-sm" defaultValue={school.name} disabled
              />

              <label className="text-sm">Código</label>
              <input
                className="w-full border border-gray-200 rounded p-2 font-light text-sm" defaultValue={school.code} disabled 
              />

              <label className="text-sm">Dirección</label>
              <input
                className="w-full border border-gray-200 rounded p-2 font-light text-sm" defaultValue={school.address} disabled
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateSchool;
