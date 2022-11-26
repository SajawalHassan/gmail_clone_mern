import { useDispatch } from "react-redux";
import { setError } from "../features/mailSlice";

import CloseIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "../components/global/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Error = () => {
  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.mails);

  return (
    <div className="modal-outer z-50">
      <div className="modal-inner sm:min-w-[30rem] sm:min-h-[10rem] py-3 px-5 relative">
        <div className="flex items-center justify-between">
          <h1 className="font-[500] text-xl">Error</h1>
          <IconButton
            Icon={CloseIcon}
            label="Close"
            handleClick={() => dispatch(setError(false))}
          />
        </div>
        <p className="text-gray-600 mt-1">{error}</p>
        <button
          onClick={() => dispatch(setError(false))}
          className="py-1.5 px-7 rounded-md bg-blue-500 text-white font-[500] hover:shadow-lg hover:bg-opacity-70 absolute bottom-3 right-5"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Error;
