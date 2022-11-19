import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

import Checkbox from "../../global/Checkbox";
import IconButton from "../../global/IconButton";
import ArchiveIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import axios from "../../../api/axios";
import { useDispatch } from "react-redux";
import { filterMails } from "../../../features/mailSlice";

interface Types {
  mail: any;
}

const MailCard = ({ mail }: Types) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.auth);
  let { createdAt } = mail;

  createdAt = new Date().toLocaleDateString("en-US");
  const dispatch = useDispatch();

  const handleDelete = async (id: string) => {
    const mailDeleteArray = [`${id}`];

    try {
      await axios.delete("/mails/delete", {
        data: { mailsId: mailDeleteArray },
      });

      dispatch(filterMails(id));
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 sm:py-1.5 sm:hover:shadow-md sm:hover:shadow-gray-400 cursor-pointer sm:border-t group sm:max-h-[2.8rem] hover:bg-gray-50">
      <img
        src={mail.sender.profilePic}
        alt="Sender Profile"
        className="h-10 rounded-full sm:hidden"
        referrerPolicy="no-referrer"
      />

      <div className="w-full truncate sm:hidden">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold">
            {mail.sender.username === user.username
              ? `me`
              : mail.sender.username}
          </h1>
          <p className="text-xs font-[500] text-gray-600">{createdAt}</p>
        </div>
        <h1 className="truncate text-sm">{mail.subject}</h1>
        <p className="text-sm truncate text-gray-600 w-[80%]">{mail.body}</p>
      </div>

      <div className="w-full hidden sm:flex sm:items-center sm:justify-between sm:truncate sm:relative">
        <div className="flex items-center space-x-10">
          <div className="space-x-2 flex items-center">
            <Checkbox
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              className="group-hover:border-gray-600"
            />
            <p className="font-[500]">
              {" "}
              {mail.sender.username === user.username
                ? `me`
                : mail.sender.username}
            </p>
          </div>
        </div>
        <h1 className="truncate absolute left-[11rem] lg:left-[17rem] w-[65%] xl:w-[70%] 2xl:w-full 2xl:max-w-[85rem]">
          <span className="font-[500]">{mail.subject}</span> -{" "}
          <span className="text-sm text-gray-600">{mail.body}</span>
        </h1>
        <p className="text-xs font-[500] text-gray-600 mr-2 group-hover:hidden">
          {createdAt}
        </p>
        <div className="hidden group-hover:flex items-center space-x-2">
          <IconButton Icon={ArchiveIcon} label="Archive" />
          <IconButton
            Icon={DeleteIcon}
            label="Delete"
            handleClick={() => handleDelete(mail._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default MailCard;
