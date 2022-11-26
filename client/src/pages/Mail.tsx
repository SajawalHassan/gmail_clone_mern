import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { deleteMail } from "../requests/mailReq";

import axios from "../api/axios";
import Header from "../components/home/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBackOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ArchiveIcon from "@mui/icons-material/ArchiveOutlined";
import IconButton from "../components/global/IconButton";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturnOutlined";
import ShortcutIcon from "@mui/icons-material/Shortcut";

const Mail = () => {
  const [mail, setMail] = useState<any>();

  // let changableMail = mail;
  const { mailId } = useParams();
  const { primaryMails, promotionMails, socialMails } = useSelector(
    (state: RootState) => state.mails
  );

  const mails: any[] = primaryMails.concat(promotionMails, socialMails);
  const navigate: NavigateFunction = useNavigate();
  let createdAt: any = new Date(mail?.createdAt);
  createdAt = createdAt.toLocaleString("default");

  useEffect(() => {
    const filterdMail = mails.filter((mail: any) => mail?._id === mailId);
    setMail(filterdMail[0]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getMail = async () => {
      if (mail && Object.keys(mail).length !== 0) return;

      try {
        const { data } = await axios.get(`/mails/${mailId}`);

        setMail(data.mail);
      } catch (error: any) {
        console.log(error.response?.data);
      }
    };

    getMail();
  }, [mail, mailId]);

  const handleDelete = async () => {
    await deleteMail(mail?._id);
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-auto section-outer">
        <div className="section-inner px-3 space-y-8">
          <div className="flex items-center space-x-5">
            <IconButton
              Icon={ArrowBackIcon}
              label="Back"
              handleClick={() => navigate("/")}
            />
            <div className="flex items-center space-x-2">
              <IconButton
                Icon={DeleteIcon}
                label="Delete"
                handleClick={handleDelete}
              />
              <IconButton Icon={ArchiveIcon} label="Archive" />
            </div>
          </div>

          <h1 className="sm:ml-5 font-light text-4xl sm:text-5xl">
            {mail?.subject}
          </h1>

          <div>
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src={mail?.sender.profilePic}
                  alt="Profile"
                  className="h-12 rounded-full cursor-pointer border border-transparent active:border-blue-500"
                  referrerPolicy="no-referrer"
                />
                <div className="ml-2 truncate">
                  <div className="flex items-center space-x-1">
                    <p className="font-bold">{mail?.sender.username}</p>
                    <p className="text-xs text-gray-600 truncate">
                      &lt;{mail?.sender.email}&gt;
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600">to me</p>
                    <p className="text-gray-600 text-xs block sm:hidden">
                      {createdAt}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-xs hidden mt-1 sm:block">
                {createdAt}
              </p>
            </div>
            <p className="text-sm mt-4">{mail?.body}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="mail-btn">
              <ShortcutIcon className="rotate-180 mr-1" />
              Reply
            </button>
            <button className="mail-btn">
              <ShortcutIcon className="mr-1" />
              Forward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
