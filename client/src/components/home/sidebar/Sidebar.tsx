import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { setMailModalIsActive } from "../../../features/mailSlice";

import EditIcon from "@mui/icons-material/EditOutlined";
import SidebarOption from "./SidebarOption";
import InboxIcon from "@mui/icons-material/InboxOutlined";
import SendIcon from "@mui/icons-material/SendOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import ArchiveIcon from "@mui/icons-material/ArchiveOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "../../global/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import { setSidebarIsOpen } from "../../../features/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { sidebarIsOpen } = useSelector((state: RootState) => state.sidebar);
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  useOutsideAlerter(wrapperRef, setSidebarIsOpen, true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      className={`sm:block sm:static sm:bg-header sm:min-w-[5rem] lg:min-w-[15rem] ${
        sidebarIsOpen
          ? `bg-black bg-opacity-30 fixed h-screen w-screen top-0 z-50`
          : `hidden`
      }`}
    >
      <div className="bg-header w-[80%] sm:w-full h-full" ref={wrapperRef}>
        <button
          className="compose-btn p-1.5 lg:p-4 lg:flex lg:items-center lg:space-x-1 lg:rounded-xl rounded-full hidden sm:block mx-auto mt-2 lg:mx-0 lg:ml-2"
          onClick={() => dispatch(setMailModalIsActive(true))}
        >
          <EditIcon /> <span className="sm:hidden lg:block">Compose</span>
        </button>
        <div className="flex items-center justify-between pl-10 pr-3 pt-3 sm:hidden">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
            alt=""
            className=""
          />
          <IconButton
            Icon={CloseIcon}
            label="Close"
            handleClick={() => dispatch(setSidebarIsOpen(false))}
          />
        </div>
        <div className="mt-4">
          <SidebarOption Icon={InboxIcon} text="Inbox" isActive={true} />
          <SidebarOption Icon={SendIcon} text="Sent" />
          <SidebarOption Icon={EmailIcon} text="All mails" />
          <SidebarOption Icon={ArchiveIcon} text="Archived" />
        </div>
        <button
          className="sm:hidden compose-btn absolute bottom-5 left-2.5 ml-10 mt-5 py-4 px-6"
          onClick={() => dispatch(setMailModalIsActive(true))}
        >
          <EditIcon /> Compose
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
