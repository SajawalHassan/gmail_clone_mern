import CloseIcon from "@mui/icons-material/CloseOutlined";
import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import { RootState } from "../app/store";
import IconButton from "../components/global/IconButton";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

interface Types {
  setCreateMailValue: Dispatch<SetStateAction<boolean>>;
}

const CreateMail = ({ setCreateMailValue }: Types) => {
  const [recieverEmail, setRecieverEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { socket } = useSelector((state: RootState) => state.socket);

  const dialogeRef = useRef() as MutableRefObject<HTMLDivElement>;
  useOutsideAlerter(dialogeRef, setCreateMailValue);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/mails/create", {
        recieverEmail,
        subject,
        body,
      });

      socket.emit("sendMail", data.data);
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div className="fixed h-screen w-screen bg-black bg-opacity-50 top-0 sm:grid sm:place-content-center">
      <div
        className="h-full w-full sm:w-[95vw] sm:h-[85vh] bg-white sm:rounded-md relative"
        ref={dialogeRef}
      >
        <header className="bg-search w-full flex items-center justify-between px-3 py-2 rounded-t-md">
          <h1 className="text-sm font-[500]">New Message</h1>
          <IconButton
            Icon={CloseIcon}
            label="Close"
            className="rounded-none p-0"
            labelClassName="right-0 top-7"
            handleClick={() => setCreateMailValue(false)}
          />
        </header>
        <form onSubmit={(e: SyntheticEvent) => handleSubmit(e)}>
          <section className="p-2">
            <div className="flex items-center space-x-2 border-b p-2">
              <p className="text-gray-500">To</p>
              <input
                type="text"
                className="bg-transparent flex-grow outline-none"
                value={recieverEmail}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRecieverEmail(e.target.value)
                }
              />
            </div>
            <input
              type="text"
              className="bg-transparent outline-none border-b p-2 w-full"
              placeholder="Subject"
              value={subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSubject(e.target.value)
              }
            />
            <textarea
              className="w-full mt-2 bg-transparent resize-none outline-none h-[40rem] sm:h-[33rem]"
              value={body}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBody(e.target.value)
              }
            />
          </section>
          <footer className="absolute bottom-0 p-3">
            <button
              type="submit"
              className="bg-blue-600 rounded-full py-2 px-5 font-[500] text-white"
            >
              Send
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CreateMail;
