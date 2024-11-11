/* eslint-disable react/prop-types */
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useRef, useState } from "react";

export const BasicContext = createContext(null);

const BasicProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const [cartBar, setCartBar] = useState(false);
  // filter state
  const [categoryId, setCategoryId] = useState(null);

  // fetch product based on category Id
  const {data:catBasedProduct, isLoading, refetch} = useQuery({
    queryKey: ["get-cat-data"],
    queryFn: async () => {
      const res = await axiosPublic.post(`/api/get-products-by-cat`, {categoryId})
      return res.data
    }
  })

  useEffect(() => {
    refetch();
  }, [categoryId])

  const info = {
    sidebarOpen,
    setSideBarOpen,
    open,
    setOpen,
    sidebarRef,
    cartBar,
    setCartBar,
    categoryId,
    setCategoryId,
    catBasedProduct,
    isLoading
  };
  return <BasicContext.Provider value={info}>{children}</BasicContext.Provider>;
};

export default BasicProvider;
