import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../features/authSlice";

import axios from "../../api/axios";

const ProtectedRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      if (Object.keys(user).length !== 0) return;

      try {
        const { data } = await axios.get("/auth/login/success");

        dispatch(setAuthState(data.user));
      } catch (error: any) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    getUser();
  }, [dispatch, navigate, user]);

  return <Outlet />;
};

export default ProtectedRoute;
