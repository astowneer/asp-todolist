import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { AppPath } from "../../common/common";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const token = useAppSelector((state) => state.auth.tokens?.accessToken);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(AppPath.LOGIN);
    }
  }, [dispatch, token]);

  return <>{children}</>;
};
