/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../connection";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const CheckNotLogin = ({ children }) => {
  const [go, setGo] = useState(false);
  const [userData] = useUser();
  const token = localStorage.getItem("token");
  const baseUrl = url;
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure('/api/get-check-login')
   .then(res => {
    if(res.data.status){
      return toast.error("You are Already login") && navigate('/')
    }
   })

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
    } else{
      return setGo(true)
    }
  }, [token]);

  return go && children;

};

export default CheckNotLogin;
