import { Button } from "@heroui/react";
import { FiPlus, FiBriefcase } from "react-icons/fi";

export default function CompanyEmptyState({ setIsEditing }) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl p-12 text-center max-w-2xl mx-auto my-12 bg-black">
      <div className="p-4 bg-zinc-900 rounded-full text-zinc-400 mb-4">
        <FiBriefcase className="text-3xl" />
      </div>

      <h3 className="text-xl font-semibold text-zinc-200 mb-2">
        No Registered Company
      </h3>

      <p className="text-sm text-zinc-500 mb-6 max-w-sm">
        To start hiring on HireLoop, you need to set up your business details
        first.
      </p>

      <Button
        onPress={()=>{setIsEditing(true)}}
        className="bg-white text-black font-medium text-sm px-5 py-2.5 rounded-lg"
      >
        <FiPlus />
        Register Company
      </Button>
    </div>
  );
}