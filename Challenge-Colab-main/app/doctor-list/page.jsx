/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import DoctorList from '@/components/DoctorList'
import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar';
import { useClinicContext } from '@/context/clinicContext';
function doctorList() {
    const [doctorList, setdoctorList] = useState([]);
    const { socket } = useContext(useClinicContext);

    useEffect(() => {

        getAllDoctors();
    }, []);
    const getAllDoctors = async () => {
        const res = await fetch('/api/register/doctor');
        const data = await res.json();
        setdoctorList(data);
    }

    
        useEffect(() => {
            if (socket) {
              socket.on("refetch", (roomId) => {
                getAllDoctors();
              });
            }
          }, []);
    return (
        <div className='lg:ml-64 sm:ml-44 space-y-2 p-3 overflow-hidden'>
            <Sidebar />
            <DoctorList doctorList={doctorList}  />
        </div>
    )
}

export default doctorList;
