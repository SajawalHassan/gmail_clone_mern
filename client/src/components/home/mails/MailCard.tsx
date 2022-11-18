import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface Types {
  mail: any;
}

const MailCard = ({ mail }: Types) => {
  const { user } = useSelector((state: RootState) => state.auth);

  let { createdAt } = mail;

  createdAt = new Date().toLocaleDateString("en-US");

  return (
    <div className="flex items-center space-x-2 p-2">
      <img
        src={mail.sender.profilePic}
        alt="Sender Profile"
        className="h-10 rounded-full"
        referrerPolicy="no-referrer"
      />

      <div className="w-full truncate">
        <div className="flex items-center justify-between w-full">
          <h1 className="font-bold">
            {mail.sender.username === user.username
              ? `me`
              : mail.sender.username}
          </h1>
          <p className="trucate text-xs font-[500] text-gray-600">
            {createdAt}
          </p>
        </div>
        <h1 className="truncate text-sm">{mail.subject}</h1>
        <p className="text-sm truncate text-gray-600">{mail.body}</p>
      </div>
    </div>
  );
};

export default MailCard;
