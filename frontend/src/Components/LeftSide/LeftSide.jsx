import moment from "moment";
import { useEffect, useState } from "react";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Settings from "./Settings";
import useGetTotalAmount from "@/Hooks/useGetTotalAmount";
import Loader2 from "@/Utils/Loader2";
import logo from "@/assets/asset/about/logo2.png";
import useUser from "@/Security/useUser";
import { space } from "postcss/lib/list";

const LeftSide = () => {
  const [totalSum, isLoading] = useGetTotalAmount();
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = moment().format("DD-MM-YYYY");
  const currentTime = moment().format("hh:mm:ss");
  const [styleClock, setStyleClock] = useState(currentTime);
  const [pathName, setPathName] = useState("/");
  const [userData] = useUser();
  const path = window.location.pathname;
  const year = moment().format("YYYY");

  useEffect(() => {
    setPathName(path);
  }, [path]);

  const calculateTimeLeft = (targetDate) => {
    let timeLeft = {};
    timeLeft = {
      hours: targetDate.slice(0, 2),
      minutes: targetDate.slice(3, 5),
      seconds: targetDate.slice(6, 8),
    };

    return timeLeft;
  };

  const distractDate = (currentDate) => {
    let distractDate = {};
    distractDate = {
      day: currentDate.slice(0, 2),
      month: currentDate.slice(3, 5),
      year: currentDate.slice(8, 10),
    };

    return distractDate;
  };

  const date = distractDate(currentDate);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStyleClock(calculateTimeLeft(currentTime));
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentTime]);

  if (isLoading) return <Loader2 />;

  const profit =
    totalSum.totalIncome < totalSum.totalExpense
      ? totalSum.totalExpense - totalSum.totalIncome
      : 0;

  const loss =
    totalSum.totalIncome > totalSum.totalExpense
      ? totalSum.totalIncome - totalSum.totalExpense
      : 0;

  const expenseShort =
    totalSum.totalBudget > totalSum.totalExpense
      ? totalSum.totalBudget - totalSum.totalExpense
      : 0;

  const extra =
    totalSum.totalBudget < totalSum.totalExpense
      ? totalSum.totalExpense - totalSum.totalBudget
      : 0;

  return (
    <div className="flex flex-col space-y-5 lg:space-y-10 items-center justify-center h-screen relative px-2">
      <div className="absolute top-0 bg-blue-500 text-white px-4 py-0.5 flex justify-between w-full items-center">
        <span>&#9400; {year}</span>{" "}
        <span className="text-sm lg:text-base">
          Design & Developed by Md. Fahim Muntashir
        </span>
      </div>
      <div className="z-10 flex justify-center">
        <img src={logo} alt="" className="w-2/5 lg:w-3/5" />
      </div>
      <div className="flex flex-col z-10">
        <div className="bg-gray-700 text-white">
          <h3 className="py-1 text-center bg-blue-400 text-black font-semibold">
            Budget
          </h3>
          <h3 className="py-1 text-center font-semibold text-2xl">
            {totalSum.totalBudget}/-
          </h3>
        </div>
        <div className="flex w-full gap-1 mt-1">
          <div className="bg-gray-700 text-white w-full">
            <h3 className="px-10 py-1 bg-blue-400 text-black font-semibold text-center">
              Income
            </h3>
            <h3 className="px-10 py-1 text-center font-semibold">
              {totalSum.totalExpense}/-
            </h3>
          </div>
          <div className="bg-gray-700 text-white w-full">
            <h3 className="px-10 py-1 bg-blue-400 text-black font-semibold text-center">
              Expense
            </h3>
            <h3 className="px-10 py-1 text-center font-semibold">
              {totalSum.totalIncome}/-
            </h3>
          </div>
        </div>
        <div className="flex gap-1 mt-1">
          <div className="bg-gray-700 text-white">
            <h3 className="px-4 lg:px-8 py-1 text-center font-semibold">
              <span className="text-xs lg:text-base">Short: {expenseShort}/-</span>
            </h3>
          </div>
          <div className="bg-gray-700 text-white">
            <h3 className="px-4 lg:px-8 py-1 text-center font-semibold">
              {profit === 0
                ? <span className="text-xs lg:text-base">Loss: {loss}/-</span>
                : <span className="text-xs lg:text-base">Current Amount: {profit}/-</span>
              }
            </h3>
          </div>
          <div className="bg-gray-700 text-white">
            <h3 className="px-4 lg:px-8 py-1 text-center font-semibold">
            <span className="text-xs lg:text-base">Extra: {extra}/-</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="w-full space-y-10 z-10">
        <div className="grid grid-cols-3 gap-2">
          <Link
            to="/"
            className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
              pathName === "/" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
            } text-center`}
          >
            Income / Expense
          </Link>
          <Link
            to="/analytics"
            className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
              pathName === "/analytics" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
            } text-center`}
          >
            Analytics
          </Link>
          <Link
            to="/makeBudget"
            className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
              pathName === "/makeBudget" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
            } text-center`}
          >
            Make Budget
          </Link>
          <Link
            to="/prevBudget"
            className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
              pathName === "/prevBudget" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
            } text-center`}
          >
            Previous
          </Link>
          <Link
            to="/report"
            className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
              pathName === "/report" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
            } text-center`}
          >
            Report
          </Link>
          <Link
            to="/savings"
            className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
              pathName === "/savings" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
            } text-center`}
          >
            Savings
          </Link>
          <Link
            to="/loan"
            className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
              pathName === "/loan" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
            } text-center`}
          >
            Your Loan
          </Link>
          {userData?.email === "mdfahim.muntashir28@gmail.com" && (
            <Link
              to="/users"
              className={`bg-[#46375a] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#60A5FA] duration-300 hover:cursor-pointer flex items-center justify-center ${
                pathName === "/users" && "bg-[#60A5FA] text-white text-xs lg:text-base font-medium py-1 lg:py-2 hover:bg-[#46375a] duration-300 hover:cursor-pointer"
              } text-center`}
            >
              All Users
            </Link>
          )}
        </div>
        <button onClick={() => setIsOpen(true)} className="absolute bottom-4">
          <FaGear className="text-2xl text-white relative" />
          <Settings isOpen={isOpen} setIsOpen={setIsOpen} />
        </button>
      </div>

      <div className="hidden absolute bottom-0 lg:right-0 font-bold text-white lg:flex flex-col items-stretch border-[2px] border-b-0 rounded-t-lg overflow-hidden z-20">
        <div className="flex gap-1 items-center bg-gray-800 text-yellow-300">
          <span className="text-xl font-sans px-3 bg-gray-600">{date.day}</span>
          -
          <span className="text-xl font-sans px-3 bg-gray-600">
            {date.month}
          </span>
          -
          <span className="text-xl font-sans px-3 bg-gray-600">
            {date.year}
          </span>
        </div>
        <div className="flex gap-1 text-xl justify-center font-bold text-white bg-gray-600">
          <div className="bg-gray-800 text-yellow-400 px-3">
            <span className="countdown font-sans text-xl">
              <span style={{ "--value": styleClock.hours }}></span>
            </span>
          </div>
          :
          <div className="bg-gray-800 text-yellow-400 px-3">
            <span className="countdown font-sans text-xl">
              <span style={{ "--value": styleClock.minutes }}></span>
            </span>
          </div>
          :
          <div className="bg-gray-800 text-yellow-400 px-3">
            <span className="countdown font-sans text-xl">
              <span style={{ "--value": styleClock.seconds }}></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
