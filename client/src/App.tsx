import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log(user);

  return (
    <div>
      <h1>{user?.username}</h1>
      <img src={user?.profilePic} alt="" />
    </div>
  );
}

export default App;
