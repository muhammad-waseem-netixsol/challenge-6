"use client"
import React, { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import io from "socket.io-client";
import { useClinicContext } from '@/context/clinicContext';
// let socket = io("http://localhost:3001");
// import socket from '@/context/socket';

function Doctor({ doctor, index }) {
    const { data: session } = useSession();
    const [value, setValue] = useState("0");

    const { socket } = useContext(useClinicContext);
    const onSelectSlot = e => {

        setValue(e.target.value);
    };
    const onReserveSlot = async () => {
        if (value === "0") {
            return alert("invalid");
        };


        const reserve = await fetch("/api/register/patient/" + session?.user?.loggedUser?._id, {
            method: "PUT",
            body: JSON.stringify({
                appointmentId: value,
            }),
        });
        let roomId = 12
        socket.emit("abc", roomId);

        const resp = await reserve.json();
        console.log(resp)
    };

    const notReserved = doctor?.Appointments?.filter(a => a.status === "Not Reserved");

    return (
        <tr className="bg-[#1f1d1d] border-b border-purple-500" key={doctor._id}>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">{doctor.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{doctor.qualification}</td>
            <td className="whitespace-nowrap px-6 py-4">{doctor.exp} years</td>
            <td className="whitespace-nowrap px-6 py-4">{doctor.amount} Rs</td>
            <td className="whitespace-nowrap px-6 py-4">
                <select className='bg-purple-500 cursor-pointer' value={value} onChange={onSelectSlot} name="slot" id="slot">
                    <option className='cursor-pointer'>Select Slot</option>
                    {notReserved?.map(a => <option className='cursor-pointer' value={a._id} key={a._id}>{a.startTime} - {a.endTime}</option>)}
                    {doctor?.Appointments?.length === 0 && <option disabled={true} value="0">No Slot</option>}
                </select>
            </td>
            <td>
                <button onClick={onReserveSlot} className='px-4 py-2 bg-green-500'>Reserve</button>
            </td>
        </tr>

    )
}

export default Doctor