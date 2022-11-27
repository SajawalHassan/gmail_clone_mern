import Header from "../components/home/header/Header";
import io from "socket.io-client";
import CreateMail from "../modals/CreateMail";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useDispatch } from "react-redux";
import { setSocket } from "../features/socketSlice";
import MailsHomeDisplayer from "../components/home/mails/MailsInboxDisplayer";
import Error from "../modals/Error";
import Sidebar from "../components/home/sidebar/Sidebar";

function App() {
  const socketIo = useRef(io("ws://localhost:8900"));
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { error, mailModalIsActive } = useSelector(
    (state: RootState) => state.mails
  );
  const { current: socket } = socketIo;

  useEffect(() => {
    dispatch(setSocket(socket));
  }, [dispatch, socket]);

  useEffect(() => {
    if (user._id) {
      socket.emit("addUser", user._id);
    }
  }, [socket, user._id]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <MailsHomeDisplayer />
      </div>
      {mailModalIsActive && <CreateMail />}
      {error && <Error />}
    </div>
  );
}

export default App;
