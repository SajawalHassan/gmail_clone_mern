import Header from "./components/home/Header";
import io from "socket.io-client";
import CreateMail from "./modals/CreateMail";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { useDispatch } from "react-redux";
import { setSocket } from "./features/socketSlice";
import Mails from "./components/mails/Mails";

function App() {
  const [createMailValue, setCreateMailValue] = useState<boolean>(false);

  const socketIo = useRef(io("ws://localhost:8900"));
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
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
    <div>
      <Header />
      <button
        className="p-2 bg-search rounded-md"
        onClick={() => setCreateMailValue(true)}
      >
        Compose
      </button>
      {createMailValue && (
        <CreateMail setCreateMailValue={setCreateMailValue} />
      )}
      <Mails />
    </div>
  );
}

export default App;
