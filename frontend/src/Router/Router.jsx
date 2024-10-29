import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layouts/Layout";
import AdminLogin from "../Pages/AdminPages/AdminAuth/AdminLogin";
import AdminRegistration from "../Pages/AdminPages/AdminAuth/AdminRegistration";
import ErrorPage from "../Utils/ErrorPage";
import Home from "@/Pages/Home/Home";
import Cart from "@/Pages/AllPages/Cart/Cart";
import Invoice from "@/Pages/AllPages/Invoice/Invoice";
import AllCategory from "@/Pages/AllPages/Category/AllCategory/AllCategory";

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
      {
        path: "/allCategory",
        element: <AllCategory />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
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
