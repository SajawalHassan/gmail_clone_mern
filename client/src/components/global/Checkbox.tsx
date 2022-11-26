import { Dispatch, SetStateAction } from "react";

import DoneIcon from "@mui/icons-material/Done";

interface Types {
  className: string;
  isSelected: boolean;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
}

const Checkbox = ({ className, isSelected, setIsSelected }: Types) => {
  return (
    <button
      className="icon-btn group relative p-2"
      onClick={() => setIsSelected(!isSelected)}
    >
      <div
        className={`h-4 w-4 cursor-pointer grid place-content-center ${className} ${
          isSelected ? `bg-blue-500` : `bg-transparent border-2 border-zinc-500`
        }`}
      >
        {isSelected && <DoneIcon className="text-white !text-[16px]" />}
      </div>
      <h1 className="absolute hidden group-hover:block top-10 py-1 px-2 bg-gray-600 text-white text-[10px] font-bold rounded-[4px] w-max -left-[4px]">
        Select
      </h1>
    </button>
  );
};

export default Checkbox;
