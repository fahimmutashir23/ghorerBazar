/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../connection";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";

const CheckNotLogin = ({ children }) => {
  const [go, setGo] = useState(false);
  const [userData] = useUser();
  const token = localStorage.getItem("token");
  const baseUrl = url;
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      return toast.error("you are already login") && navigate('/admin');
    }

    if (token) {
      axios(`${baseUrl}/api/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.data.userId === userData._id) {
            setGo(true);
          } else {
            return toast.error("You are Already login");
          }
        })
        .catch(() => {
          return setGo(true);
        });
    }
  }, [token]);

  return go && children;

};

export default CheckNotLogin;
