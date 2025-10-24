import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { actions } from "../../../store/auth/auth";
import {
  AppPath,
  DataStatus,
  StorageKey,
  type LoginUserDto,
} from "../../../common/common";
import { useEffect } from "react";

export function useLogin(reset?: () => void) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const token = useAppSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (token && status === DataStatus.FULFILLED) {
      localStorage.setItem(StorageKey.ACCESS_TOKEN, token.accessToken);
      sessionStorage.setItem(StorageKey.REFRESH_TOKEN, token.accessToken);
      navigate(AppPath.ROOT);
      reset?.();
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
