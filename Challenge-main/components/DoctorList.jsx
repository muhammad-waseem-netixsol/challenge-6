"use client"
import React, {useEffect, useState} from 'react';
import Doctor from './Doctor';

export default function DoctorList({ doctorList }) {
    
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light  text-white">
                            <thead className="border-b font-medium bg-[#181717]">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Qualification</th>
                                    <th scope="col" className="px-6 py-4">Exprience</th>
                                    <th scope="col" className="px-6 py-4">Fee</th>
                                    <th scope="col" className="px-6 py-4">Slots</th>
                                    <th scope="col" className="px-6 py-4">Book</th>
                                </tr>
                            </thead>
                            <tbody >
                               {doctorList?.Doctors?.map((d, i) => <Doctor index={i} key={d._id} doctor={d} />)} 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}