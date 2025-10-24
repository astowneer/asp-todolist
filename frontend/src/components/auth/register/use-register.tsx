import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { actions } from "../../../store/auth/auth";
import {
  AppPath,
  DataStatus,
  ToastNotifications,
  type RegisterUserDto,
} from "../../../common/common";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useRegister(reset?: () => void) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (status === DataStatus.FULFILLED) {
      navigate(AppPath.LOGIN);
      reset?.();
    } else if (status === DataStatus.REJECTED) {
      toast.error(ToastNotifications.AUTHENTICATION_FAILED);
    }
  }, [status]);

  const handleRegister = async (data: RegisterUserDto) => {
    await dispatch(actions.register(data));
  };

  return {
    handleRegister,
    isPending: status === DataStatus.PENDING,
  };
}
