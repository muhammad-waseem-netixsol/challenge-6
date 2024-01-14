"use client";

import { SessionProvider } from "next-auth/react";
import { useClinicContext } from "@/context/clinicContext";
import { useEffect, useState } from "react";
import io from "socket.io-client";
// let socket = io("http://localhost:3001");


export const AuthProvider = ({ children }) => {
  const [refetch, setRefetch] = useState()
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Additional event listeners and configurations can be added here

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);


  const updateSlot = () => {
    setRefetch("Refetch");
    console.log("update");
  };
  return (<SessionProvider>
    <useClinicContext.Provider value={{ updateSlot: updateSlot, refetchSlot: refetch, socket: socket }}>
      {children}
    </useClinicContext.Provider>
  </SessionProvider>);
};
