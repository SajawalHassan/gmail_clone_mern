import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiURL: string =
      process.env.NODE_ENV === "production"
        ? "https://gmail_clone_api_1f12"
        : "http://localhost:5000";

    window.open(`${apiURL}/auth/google/callback`, "_self");
    dispatch(setAuthState(true));
  }, [dispatch]);

  return <div></div>;
};

export default Login;
