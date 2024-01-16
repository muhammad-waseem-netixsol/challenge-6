"use client"
import AddSlots from '@/components/AddSlots'
import Slots from '@/components/Slots'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'

const AppointmentList = () => {
  return (
    <div className='lg:ml-64 ml-20 overflow-hidden p-6'>
      <Sidebar />
      <AddSlots />
      <Slots />
    </div>
  )    
}

export default AppointmentList