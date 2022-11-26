import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { RootState } from "../app/store";

const Mail = () => {
  const [mail, setMail] = useState<any>();

  const { mailId } = useParams();
  const { primaryMails, promotionMails, socialMails } = useSelector(
    (state: RootState) => state.mails
  );

  const mails: any[] = primaryMails.concat(promotionMails, socialMails);
  useEffect(() => {
    const filterdMail = mails.filter((mail: any) => mail._id === mailId);
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
  }, []);

  return <div>Mail</div>;
};

export default Mail;
