import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Main from "../root/page/main";
import MainLayout from "../root/layout/layout";
import { AppPath } from "../../common/common";
import Login from "../auth/login/page";
import Register from "../auth/register/page";

const router = createBrowserRouter([
  {
    path: AppPath.ROOT,
    element: <MainLayout />,
    children: [
      {
        path: AppPath.ROOT,
        element: <Main />,
      },
      {
        path: AppPath.LOGIN,
        element: <Login />,
      },
      {
        path: AppPath.REGISTER,
        element: <Register />,
      },
      {
        path: AppPath.ANY,
        element: <Navigate to={AppPath.LOGIN} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
