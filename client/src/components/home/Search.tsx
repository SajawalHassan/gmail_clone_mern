import SearchIcon from "@mui/icons-material/SearchOutlined";
import TuneIcon from "@mui/icons-material/TuneOutlined";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import IconButton from "../global/IconButton";

import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

interface Types {
  setSearchToggler: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const Search = ({ setSearchToggler, className }: Types) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const searchRef = useRef() as MutableRefObject<HTMLDivElement>;
  useOutsideAlerter(searchRef, setSearchToggler);

  return (
    <div
      className={`px-3 rounded-md flex items-center transition-all duration-300 justify-between ${className} ${
        isFocused ? `bg-white shadow-lg` : `bg-search`
      }`}
      ref={searchRef}
    >
      <IconButton
        Icon={SearchIcon}
        label="Search"
        className="hover:bg-[#DCE3EC]"
      />
      <input
        type="text"
        placeholder="Search mail"
        className="bg-transparent flex-grow py-2 outline-none ml-0.5"
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchValue !== "" && (
        <IconButton
          Icon={ClearIcon}
          label="Clear search"
          className="hover:bg-[#DCE3EC]"
          handleClick={() => setSearchValue("")}
        />
      )}
      <IconButton
        Icon={TuneIcon}
        label="Show search options"
        className="hover:bg-[#DCE3EC]"
      />
    </div>
  );
};

export default Search;
