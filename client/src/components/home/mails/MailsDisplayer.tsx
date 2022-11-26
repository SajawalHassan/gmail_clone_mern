import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

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
import { useDispatch } from "react-redux";
import {
  addMail,
  setActiveTab,
  setIsLoading,
} from "../../../features/mailSlice";
import Loader from "../../global/Loader";
import { getAllMails } from "../../../requests/mailReq";

const Mails = () => {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [tabsAreShown, setTabsAreShown] = useState<boolean>(false);

  const { socket } = useSelector((state: RootState) => state.socket);
  let { primaryMails, promotionMails, socialMails } = useSelector(
    (state: RootState) => state.mails
  );
  const { isLoading, activeTab } = useSelector(
    (state: RootState) => state.mails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getMails = async () => {
      if (activeTab === "primary" && primaryMails?.length !== 0) return;
      if (activeTab === "promotions" && promotionMails?.length !== 0) return;
      if (activeTab === "social" && socialMails?.length !== 0) return;

      dispatch(setIsLoading(true));
      await getAllMails();
      dispatch(setIsLoading(false));
    };

    getMails();
    // eslint-disable-next-line
  }, [activeTab]);

  useEffect(() => {
    socket &&
      socket.on("recieveMail", ({ mail }: any) => {
        const localActiveTab = activeTab;
        if (mail.mailType === localActiveTab) {
          dispatch(addMail(mail));
        }
      });
  }, [socket, dispatch, activeTab]);

  return (
    <div className="section-outer flex-auto overflow-hidden">
      <div className="section-inner overflow-scroll">
        <div className="flex items-center space-x-3 px-3">
          <Checkbox
            isSelected={allSelected}
            setIsSelected={setAllSelected}
            className="group-hover:border-gray-600"
          />
          <IconButton
            Icon={RefreshIcon}
            label="Refresh"
            iconClassName="!text-xl"
          />
          {tabsAreShown ? (
            <IconButton
              Icon={ArrowUpwardIcon}
              label="Hide tabs"
              className="sm:hidden"
              handleClick={() => setTabsAreShown(false)}
            />
          ) : (
            <IconButton
              Icon={ArrowDownwardIcon}
              label="Show tabs"
              className="sm:hidden"
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
            onClick={() => dispatch(setActiveTab("primary"))}
          />
          <MailTab
            Icon={SellIcon}
            label="Promotions"
            active={activeTab === "promotions" ? true : false}
            onClick={() => dispatch(setActiveTab("promotions"))}
          />
          <MailTab
            Icon={Person2Icon}
            label="Social"
            active={activeTab === "social" ? true : false}
            onClick={() => dispatch(setActiveTab("social"))}
          />
        </div>
        {isLoading ? (
          <Loader className="m-auto mt-20" />
        ) : (
          <div className="w-full">
            {activeTab === "primary" &&
              (primaryMails?.length !== 0 ? (
                primaryMails?.map((mail: any) => (
                  <div className="sm:last:border-b">
                    <MailCard mail={mail} key={mail._id} />
                  </div>
                ))
              ) : (
                <h1 className="text-center font-bold text-3xl">
                  Theres nothing to see here. /:
                </h1>
              ))}
            {activeTab === "promotions" &&
              (promotionMails?.length !== 0 ? (
                promotionMails?.map((mail: any) => (
                  <div className="sm:last:border-b">
                    <MailCard mail={mail} key={mail._id} />
                  </div>
                ))
              ) : (
                <h1 className="text-center font-bold text-3xl">
                  Theres nothing to see here. /:
                </h1>
              ))}
            {activeTab === "social" &&
              (socialMails?.length !== 0 ? (
                socialMails?.map((mail: any) => (
                  <div className="sm:last:border-b">
                    <MailCard mail={mail} key={mail._id} />
                  </div>
                ))
              ) : (
                <h1 className="text-center font-bold text-3xl">
                  Theres nothing to see here. /:
                </h1>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mails;
