import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import { RootState } from "../../app/store";
import Mail from "./Mail";

const Mails = () => {
  const [mails, setMails] = useState<any>();

  const { socket } = useSelector((state: RootState) => state.socket);

  useEffect(() => {
    const getMails = async () => {
      try {
        const { data } = await axios.get("/mails/current/user");

        setMails(data.data.mails);
      } catch (error) {
        console.log(error);
      }
    };

    getMails();
  }, []);

  useEffect(() => {
    socket &&
      socket.on("recieveMessage", (data: any) => {
        mails && setMails([...mails, data.mail]);
      });
  }, [mails, socket]);

  return (
    <div>
      {mails?.map((mail: any) => (
        <Mail mail={mail} key={mail._id} />
      ))}
    </div>
  );
};

export default Mails;
