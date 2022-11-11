import SearchIcon from "@mui/icons-material/SearchOutlined";
import TuneIcon from "@mui/icons-material/TuneOutlined";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import IconButton from "../global/IconButton";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Types {
  setSearchToggler: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const Search = ({ setSearchToggler, className }: Types) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      className={`px-3 rounded-md flex items-center transition-all duration-300 justify-between ${className} ${
        isFocused ? `bg-white shadow-lg` : `bg-search`
      }`}
    >
      <IconButton
        Icon={SearchIcon}
        label="Search"
        labelClassName="-left-2"
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
          labelClassName="-left-7"
          handleClick={() => setSearchValue("")}
        />
      )}
      <IconButton
        Icon={TuneIcon}
        label="Show search options"
        className="hover:bg-[#DCE3EC]"
        labelClassName={searchValue === "" ? `-left-12` : `right-0`}
      />
      {searchValue === "" && (
        <IconButton
          Icon={ClearIcon}
          label="Close"
          className="hover:bg-[#DCE3EC] md:hidden"
          labelClassName="right-0"
          handleClick={() => setSearchToggler(false)}
        />
      )}
    </div>
  );
};

export default Search;
