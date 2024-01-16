"use client";
import { FaCircleUser } from "react-icons/fa6";
import { FaFileMedicalAlt } from "react-icons/fa";
import { useClinicContext } from "@/context/clinicContext";
import { useContext, useState, useEffect, use } from "react";
import Link from "next/link";

import { RiStethoscopeLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
export default function Dashboard() {
  const { socket } = useContext(useClinicContext);
  const [slots, setSlots] = useState([]);
  const [reRender, setReRender] = useState(false);
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState({
    reserved: 0,
    notReserved: 0,
    total: 0,
    resPercent: 0,
    notResPercent: 0,
  });
  console.log(session);
  useEffect(() => {
    getSlots();
  }, []);

  const getSlots = async () => {
    try {
      const response = await fetch(
        `/api/appointments/${session.user.loggedUser._id}`
      );
      const slotsData = await response.json();
      const reserved = slotsData.data?.filter(
        (app) => app.status === "Reserved"
      ).length;
      const notReserved = slotsData.data?.filter(
        (app) => app.status === "Not Reserved"
      ).length;
      const total = slotsData.data?.length;
      setSlots(slotsData.data);
      setAnalytics({
        reserved: reserved,
        notReserved: notReserved,
        total: total,
        resPercent: parseInt((reserved / total) * 100),
        notResPercent: parseInt((notReserved / total) * 100),
      });
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("refetch", (roomId) => {
        getSlots();
      });
    }
  }, []);

  console.log(analytics);
  return (
    <div className="lg:ml-64 sm:ml-14 p-5 lg:h-screen flex justify-between items-between flex-col">
      {session?.user?.isDoctor ? (
        <>
          <div className="flex justify-between opacity-90 items-center gap-5 bg-[#232222] py-2 rounded-md text-white font-semibold px-5 w-full h-1/6">
            <div className="flex gap-4">
              <FaCircleUser className="text-xl" /> Dr {session?.user?.name}
            </div>
            <RiStethoscopeLine className="text-purple-600 text-[60px] hidden lg:flex" />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3  py-5 gap-4 w-full h-[40%]">
            <div className="bg-[#232222] opacity-90 flex flex-col justify-between h-full rounded-xl text-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <FaFileMedicalAlt className="text-purple-800" /> Appointments
                </div>
              </div>
              <div className="font-black text-7xl text-end">
                {analytics.reserved}
              </div>
            </div>
            <div className="bg-[#232222] opacity-90 flex flex-col justify-between h-56 rounded-xl text-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <FaFileMedicalAlt className="text-yellow-300" /> Slots
                </div>
              </div>

              <div className="font-black text-7xl text-end">
                {analytics.notReserved}
              </div>
            </div>
            <div className="bg-[#232222] flex flex-col justify-between h-56 rounded-xl text-white p-5">
              <div>
                <div className="flex items-center gap-2">
                  <FaFileMedicalAlt className="text-green-800" /> Total
                </div>
              </div>

              <div className="font-black text-7xl text-end">
                {analytics.total}
              </div>
            </div>
          </div>
          <div className="bg-[#232222] opacity-90 bg-image p-5 h-[40%] rounded-xl flex justify-between w-full">
            <div className="min-h-full flex justify-start items-end gap-3 w-[300px] lg:w-[50%] px-3">
              <div className="w-[20%] border-purple-500 flex justify-end items-end p-1 h-full border transition">
                <div
                  className={`h-[${analytics.resPercent}%] w-full bg-purple-600 transition`}
                ></div>
              </div>

              <div className="w-[20%] border-yellow-300 flex justify-end items-end p-1 h-full border transition">
                <div
                  className={`h-[${analytics.notResPercent}%] w-full bg-yellow-300 transition`}
                ></div>
              </div>
              <div className="w-[20%] border-green-800 flex justify-end items-end p-1 h-full border transition">
                <div
                  className={`h-[100%] w-full bg-green-800 transition`}
                ></div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-5">
              <div className="flex items-center text-xl md:text-2xl gap-2 text-purple-800">
                <FaFileMedicalAlt className="" /> Appointments
              </div>

              <div>
                <div className="flex items-center text-xl md:text-2xl gap-2 text-yellow-300">
                  <FaFileMedicalAlt className="" /> Slots
                </div>
              </div>
              <div className="flex items-center text-xl md:text-2xl gap-2 text-green-800">
                <FaFileMedicalAlt /> Total
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        <div className="text-white text-start flex flex-col gap-4 justify-center items-center bg-[#232222] h-60 md:w-1/2 w-4/5 mx-auto rounded-xl">
          Welcome,
          <span className="text-3xl text-center">{session?.user?.name}</span>
          You are logged in as Patient{" "}
          <Link href="/doctor-list">
            <button className="bg-purple-500 w-[200px] py-3">
              See Doctors
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
