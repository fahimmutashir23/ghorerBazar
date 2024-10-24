/* eslint-disable react/prop-types */
import { createContext, useRef, useState } from "react";

export const BasicContext = createContext(null);

const BasicProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);
  const [sidebarOpen, setSideBarOpen] = useState(true);


  const info = {
    sidebarOpen,
    setSideBarOpen,
    open,
    setOpen,
    sidebarRef,
  };
  return <BasicContext.Provider value={info}>{children}</BasicContext.Provider>;
};

export default BasicProvider;
