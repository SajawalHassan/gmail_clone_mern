import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

import axios from "../../../api/axios";
import MailCard from "./MailCard";
import MailTab from "./MailTab";
import BorderAllIcon from "@mui/icons-material/BorderAllRounded";
import SellIcon from "@mui/icons-material/SellOutlined";
import Person2Icon from "@mui/icons-material/Person2Outlined";
import RefreshIcon from "@mui/icons-material/RefreshOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Checkbox from "../../global/Checkbox";
import IconButton from "../../global/IconButton";

const Mails = () => {
  const [mails, setMails] = useState<Array<any>>();
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [tabsAreShown, setTabsAreShown] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("primary");

  const { socket } = useSelector((state: RootState) => state.socket);

  useEffect(() => {
    const getMails = async () => {
      try {
        const { data } = await axios.get(`/mails/${activeTab}`);

        setMails(data.mails);
      } catch (error: any) {
        console.log(error.response?.data);
      }
    };

    getMails();
  }, [activeTab]);

  useEffect(() => {
    socket &&
      socket.on("recieveMessage", ({ mail }: any) => {
        if (mails && mail.mailType === activeTab) {
          setMails([...mails, mail]);
        }
      });
  }, [mails, socket, activeTab]);

  return (
    <div className="bg-header p-3 flex-auto overflow-hidden">
      <div className="bg-white rounded-3xl h-full p-3 overflow-scroll">
        <div className="flex items-center space-x-3">
          <Checkbox
            isSelected={allSelected}
            setIsSelected={setAllSelected}
            className="group-hover:border-gray-600"
          />
          <IconButton
            Icon={RefreshIcon}
            label="Refresh"
            labelClassName="-left-2"
            iconClassName="!text-xl"
          />
          {tabsAreShown ? (
            <IconButton
              Icon={ArrowUpwardIcon}
              label="Hide tabs"
              className="sm:hidden"
              labelClassName="-left-3.5"
              handleClick={() => setTabsAreShown(false)}
            />
          ) : (
            <IconButton
              Icon={ArrowDownwardIcon}
              label="Show tabs"
              className="sm:hidden"
              labelClassName="-left-3.5"
              handleClick={() => setTabsAreShown(true)}
            />
          )}
        </div>
        <div
          className={`sm:flex sm:items-center mt-3 ${
            !tabsAreShown && `hidden sm:flex`
          }`}
        >
          <MailTab
            Icon={BorderAllIcon}
            label="Primary"
            active={activeTab === "primary" ? true : false}
            onClick={() => setActiveTab("primary")}
          />
          <MailTab
            Icon={SellIcon}
            label="Promotions"
            active={activeTab === "promotions" ? true : false}
            onClick={() => setActiveTab("promotions")}
          />
          <MailTab
            Icon={Person2Icon}
            label="Socials"
            active={activeTab === "social" ? true : false}
            onClick={() => setActiveTab("social")}
          />
        </div>
        <div className="mt-3">
          {mails?.length !== 0 ? (
            mails?.map((mail: any) => <MailCard mail={mail} key={mail._id} />)
          ) : (
            <h1 className="text-center font-bold text-3xl">
              Theres nothing to see here. /:
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mails;
