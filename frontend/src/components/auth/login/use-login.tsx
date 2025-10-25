import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { actions } from "../../../store/auth/auth";
import {
  AppPath,
  DataStatus,
  StorageKey,
  ToastNotifications,
  type LoginUserDto,
} from "../../../common/common";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useLogin(reset?: () => void) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const token = useAppSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (token && status === DataStatus.FULFILLED) {
      localStorage.setItem(StorageKey.ACCESS_TOKEN, token.accessToken);
      sessionStorage.setItem(StorageKey.REFRESH_TOKEN, token.accessToken);

      toast.success(ToastNotifications.AUTHENTICATION_SUCCESS);

      navigate(AppPath.ROOT);
      reset?.();
    } else if (status === DataStatus.REJECTED) {
      dispatch(actions.signOut());
      toast.error(ToastNotifications.AUTHENTICATION_FAILED);
    }
  }, [token, status]);

  const handleLogin = async (data: LoginUserDto) => {
    await dispatch(actions.login(data));
  };

  return {
    handleLogin,
    isPending: status === DataStatus.PENDING,
  };
}
