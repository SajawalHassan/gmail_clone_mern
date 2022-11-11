import SearchIcon from "@mui/icons-material/SearchOutlined";
import TuneIcon from "@mui/icons-material/TuneOutlined";
import ClearIcon from "@mui/icons-material/ClearOutlined";
import IconButton from "../global/IconButton";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Types {
  setSearchToggler: Dispatch<SetStateAction<boolean>>;
}

const Search = ({ setSearchToggler }: Types) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="bg-search px-3 rounded-md flex items-center justify-between">
      <IconButton
        Icon={SearchIcon}
        label="Search"
        labelClassName="-left-2"
        className="hover:bg-[#DCE3EC]"
      />
      <input
        type="text"
        placeholder="Search mail"
        className="bg-transparent flex-grow py-3 outline-none ml-0.5"
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
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
          className="hover:bg-[#DCE3EC]"
          labelClassName="right-0"
          handleClick={() => setSearchToggler(false)}
        />
      )}
    </div>
  );
};

export default Search;
