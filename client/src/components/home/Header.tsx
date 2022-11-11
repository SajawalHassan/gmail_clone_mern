import MenuIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import HelpIcon from "@mui/icons-material/HelpOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import AppsIcon from "@mui/icons-material/AppsOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAltOutlined";
import IconButton from "../global/IconButton";
import Search from "./Search";
import MenuOption from "../global/MenuOption";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

import { Link } from "react-router-dom";
import { MutableRefObject, useRef, useState } from "react";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const apiURL: string =
  process.env.NODE_ENV === "production"
    ? "https://gmail_clone_api_1f12"
    : "http://localhost:5000";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchToggler, setSearchToggler] = useState<boolean>(false);
  const [helpMenu, setHelpMenu] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);

  const helpMenuRef = useRef() as MutableRefObject<HTMLDivElement>;
  const profileMenuRef = useRef() as MutableRefObject<HTMLDivElement>;
  useOutsideAlerter(helpMenuRef, setHelpMenu);
  useOutsideAlerter(profileMenuRef, setProfileMenu);

  return (
    <header className="p-2 bg-header">
      {!searchToggler && (
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-grow">
            <div className="p-2 icon-btn">
              <MenuIcon />
            </div>
            <Link to="/" className="ml-1">
              <img
                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
                alt=""
              />
            </Link>
            <Search
              className="hidden md:flex ml-20 max-w-[40rem] md:flex-grow"
              setSearchToggler={setSearchToggler}
            />
          </div>
          <div className="flex items-center space-x-2">
            <IconButton
              Icon={SearchIcon}
              label="Search"
              labelClassName="-left-2"
              className="md:hidden"
              handleClick={() => setSearchToggler(true)}
            />
            <IconButton
              Icon={HelpIcon}
              label="Support"
              labelClassName="-left-2.5"
              handleClick={() => setHelpMenu(true)}
            />
            <IconButton
              Icon={SettingsIcon}
              label="Settings"
              labelClassName="-left-2.5"
            />
            <IconButton
              Icon={AppsIcon}
              label="Google Apps"
              labelClassName="-left-[19px]"
            />
            <div className="group relative">
              <img
                src={user.profilePic}
                alt="Profile"
                className="h-8 rounded-full cursor-pointer border border-transparent active:border-blue-500"
                onClick={() => setProfileMenu(true)}
              />
              <div className="group-hover:opacity-100 opacity-0 absolute transition-opacity group-hover:delay-1000 top-10 py-1 px-2 bg-zinc-700  text-white text-[10px] font-bold rounded-[4px] w-max right-0 delay-200">
                <p>Google Account</p>
                <p className="text-gray-400">{user.username}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {searchToggler && <Search setSearchToggler={setSearchToggler} />}
      {helpMenu && (
        <div className="menu right-28 min-w-[15rem]" ref={helpMenuRef}>
          <MenuOption text="Help" />
          <MenuOption text="Training" />
          <MenuOption text="Updates" />
          <div className="border my-1" />
          <MenuOption text="Send feedback to Google" />
        </div>
      )}
      {profileMenu && (
        <div className="menu right-7 min-w-[20rem]" ref={profileMenuRef}>
          <div className="flex flex-col items-center text-center">
            <img
              src={user.profilePic}
              alt="Profile"
              className="rounded-full w-16 mt-4"
            />
            <h1 className="font-medium mt-2">{user.username}</h1>
            <p className="text-xs text-gray-600">{user.email}</p>
            <button
              onClick={() =>
                window.open(
                  "https://myaccount.google.com/?hl=en&utm_source=OGB&utm_medium=act",
                  "_blank"
                )
              }
              className="bg-transparent border rounded-full text-sm px-4 py-1.5 hover:bg-gray-100 active:shadow-md mt-4 text-gray-600 font-[500]"
            >
              Manage your Google Account
            </button>
          </div>
          <div className="cursor-pointer hover:bg-gray-100 mt-5">
            <div className="border" />
            <div className="py-2.5 pl-6 flex items-center space-x-4 text-sm">
              <PersonAddAltIcon className="text-gray-500 text-lg" />
              <h1 className="text-gray-700">Add another account</h1>
            </div>
            <div className="border" />
          </div>
          <div className="flex justify-center my-4">
            <button
              className="px-4 py-2 border rounded-md text-sm text-gray-600 font-[500] hover:bg-gray-100 active:shadow-md"
              onClick={() => window.open(`${apiURL}/auth/logout`, "_self")}
            >
              Sign out
            </button>
          </div>
          <div className="border" />
          <p className="py-2.5 text-xs text-gray-600 text-center">
            Privacy Policy • Terms of Service
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
