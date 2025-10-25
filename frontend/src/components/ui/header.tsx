import { Link, useNavigate } from "react-router";

import { useEffect, useState } from "react";

import { useAppSelector } from "@/hooks/use-app-selector";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { AppPath } from "@/common/common";
import { authActions } from "@/store/actions";
import { Button } from "./button";

const navNotShowPages: string[] = [AppPath.LOGIN, AppPath.REGISTER];

export const Header = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);

  const hideNavigation = navNotShowPages.includes(location.pathname);
  const userData = useAppSelector((state) => state.auth.userInfo);
  const status = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedOut && userData === null) {
      navigate(AppPath.LOGIN);
    }
  }, [status, userData]);

  const handleSignOut = () => {
    dispatch(authActions.signOut());
    setIsSignedOut(true);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link
          data-test-id="header-logo"
          to={AppPath.ROOT}
          className="text-lg font-bold text-amber-600 hover:text-amber-800 transition-colors"
        >
          Todos
        </Link>
        {!hideNavigation && (
          <Button
            onClick={handleSignOut}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Sign Out
          </Button>
        )}
      </div>
    </header>
  );
};
