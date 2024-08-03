import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

export default function ConfirmationAlert({ setShowConfirmation }) {
  const handleCancelClick = () => {
    setShowConfirmation(false);
  };
  return (
    <div className="p-4 flex flex-col fixed z-[1] bg-white top-[25%] left-[35%] w-[500px] h-[150px] rounded-xl shadow-xl border-2">
      <div className="flex flex-row-reverse" onClick={handleCancelClick}>
        <MdOutlineCancel className="size-6" />
      </div>
      <div className="px-2 pt-2 pb-3 border-bottom flex gap-3 text-[#278e28] justify-center">
        <FaCheckCircle className="mt-1 size-6" />
        <div className="text-2xl font-bold">Réservation confirmée</div>
      </div>
    </div>
  );
}
