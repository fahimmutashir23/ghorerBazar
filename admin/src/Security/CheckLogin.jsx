/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../connection";
import useUser from "./useUser";
import Loader2 from "../Utils/Loader2";

const CheckLogin = ({ children }) => {
  const [go, setGo] = useState(false);
  const [userData, isLoading] = useUser();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const baseUrl = url;

  useEffect(() => {
    if (!token) {
      return navigate("/admin/login");
    } else {
      axios(`${baseUrl}/api/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (isLoading) return setLoader(true);
          if (res.data.userId === userData._doc._id) {
            setGo(true);
            setLoader(false);
          } else {
            return navigate("/admin/login");
          }
        })
        .catch(() => {
          return navigate("/admin/login");
        });
    }
  }, [token, isLoading]);

  if (loader) {
    return <Loader2 />;
  }

  return go && children;
};

export default CheckLogin;
