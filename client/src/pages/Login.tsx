import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../features/authSlice";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const apiURL: string =
      process.env.NODE_ENV === "production"
        ? "https://gmail_clone_api_1f12"
        : "http://localhost:5000";

    window.open(`${apiURL}/auth/google/callback`, "_self");
    dispatch(setAuthState(true));
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return <div>loading...</div>;

  return <div></div>;
};

export default Login;
