import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import AdminLogin from "../Pages/AdminPages/AdminAuth/AdminLogin";
import AdminRegistration from "../Pages/AdminPages/AdminAuth/AdminRegistration";
import ErrorPage from "../Utils/ErrorPage";
import Home from "@/Pages/Home/Home";
import Cart from "@/Pages/AllPages/Cart/Cart";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
          <Layout />
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/register",
    element: <AdminRegistration />,
  },
]);

export default Router;
