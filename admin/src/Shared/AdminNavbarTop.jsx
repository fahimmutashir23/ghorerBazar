import { MdMenu } from "react-icons/md";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { BasicContext } from "../ContextAPIs/BasicProvider";
import useSmallScreen from "../Hooks/useSmallScreen";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useUser from "../Security/useUser";
import { url } from "../../connection";
import { TfiWorld } from "react-icons/tfi";

const AdminNavbarTop = () => {
  const { open, setOpen, sidebarRef } = useContext(BasicContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, ,refetch] = useUser();
  const imgUrl = `${url}/upload/profile/images/`
  

  const handleLogout = async () => {
    try {
      const res = await axiosSecure('/api/logout')
    if(res.data.success){
      navigate('/')
      localStorage.setItem('token', res.data.token)
      toast.success('Logout Successfully')
      refetch()
      localStorage.removeItem('token')
    }
    } catch (err) {
      toast.error(err.response.data)
    }
  }

 
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
  if(isSmallScreen){
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if(isSmallScreen){
      setOpen(false)
    } else{
      setOpen(true)
    }
  }, [isSmallScreen, setOpen])

  return (
    <div className="bg-white py-2 w-full shadow-md border-b-1 ">
      <ul className="flex gap-gap_primary justify-between px-p_secondary ">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold  ">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black lg:hidden"
          />
          <a href="/" data-tip="go to website" target="_blank" className="text-black tooltip tooltip-right">
          <TfiWorld className="text-2xl text-gray-500" />
          </a>
        </div>
        <div className="hidden lg:block"></div>

        <div
          className="flex flex-col items-center justify-center text-text_sm font-semibold relative group"
        >
          <div className="flex items-center gap-8">
          <h1 className="text-blue-500 text-xl font-medium">{userData?.name}</h1>
         {userData?.image ? 
         <img
            className="w-[40px] h-[40px] rounded-full"
            src={`${imgUrl}${userData?.image}`}
            alt=""
          /> : 
          <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black" />}
          </div>

          <div className="absolute top-10 right-3 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 group-hover:scale-100 transition-transform duration-300 transform origin-top-right scale-0">
            {userData && <Link
              to="/admin/profile"
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Profile
            </Link>}
            {userData ? 
            <button
            onClick={handleLogout}
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white w-full text-sm text-left"
            >
              Logout
            </button> : 
            <Link
            to='/admin/login'
              className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
            >
              Login
              
            </Link>}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default AdminNavbarTop;
