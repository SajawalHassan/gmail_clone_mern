import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Types {
  handleClick?: () => void;
}

const ProfilePicture = ({ handleClick }: Types) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <img
        src={user?.profilePic}
        alt="Profile"
        className="h-8 rounded-full cursor-pointer border border-transparent active:border-blue-500"
        onClick={handleClick}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default ProfilePicture;
