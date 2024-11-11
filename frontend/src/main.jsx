import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router/Router.jsx";
import OrderProvider from "./ContextAPIs/OrderProvider.jsx";
import BasicProvider from "./ContextAPIs/BasicProvider.jsx";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { Slide, ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
    <BasicProvider>
      <OrderProvider>
        <RouterProvider router={Router} />
      </OrderProvider>
    </BasicProvider>
  </QueryClientProvider>
);
