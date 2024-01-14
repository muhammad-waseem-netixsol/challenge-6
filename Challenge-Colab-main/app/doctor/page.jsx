"use client"
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
export default function DoctorForm (){
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [valueDoc, setValue] = useState({
        name: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
        specialz: "",
        qualification: "",
        experience: 0,
        amount: 0,
        address: "",
        isDoctor:true
    })
    const onSaveDoctorProfile = async e => {
        e.preventDefault();
        console.log(valueDoc)
        if(valueDoc.address.trim() === "" || valueDoc.name.trim() === "" || valueDoc.email.trim() === "" || valueDoc.password.trim() === "" || valueDoc.age.trim() === "" || valueDoc.qualification.trim() === "" || valueDoc.specialz.trim() === "" || valueDoc.gender.trim() === "" || valueDoc.experience.trim() === "" || valueDoc.amount.trim() === ""){
            return alert("Invalid credentials entered!")
        };
        setLoading(true);
        const data = await fetch("/api/register/doctor", {
            method: "POST",
            body: JSON.stringify({
                name: valueDoc.name,
                email:valueDoc.email,
                password: valueDoc.password,
                age: valueDoc.age,
                gender: valueDoc.gender,
                specialization: valueDoc.specialz,
                amount: valueDoc.experience,
                qualification: valueDoc.qualification,
                exp: valueDoc.experience,
                address: valueDoc.address,
                isDoctor:valueDoc.isDoctor
            })
        });
        const resp = await data.json();
        setLoading(false);
        router.push("/");
        console.log(resp)
    };
    const onClear = () => {
        setValue({
            name: "",
            email: "",
            password: "",
            age: 0,
            gender: "",
            specialz: "",
            qualification: "",
            experience: 0,
            amount: 0,
            address: "",
            isDoctor:false
        });
        router.push("/choice");
    };
    const onChangeState = event => {
        const { name, value } = event.target;
         setValue({
            ...valueDoc,
        [name]: value
        });
    };
    return <form className="sm:w-1/2 mx-auto px-2 xl:w-[700px]" onSubmit={onSaveDoctorProfile}>
    
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-gray-900 text-center">Doctor Profile</h2>
      <p class="mt-1 text-sm leading-6 text-gray-600 text-center">This information will be shown publically.</p>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div class="mt-2">
            <input onChange={onChangeState} name="name" type="text" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={valueDoc.name} />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input onChange={onChangeState} id="email" name="email" type="email" value={valueDoc.email} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="mt-2">
            <input value={valueDoc.password} onChange={onChangeState} id="email" name="password" type="password" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-4">
          <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Gender</label>
          <div class="mt-2 w-full">
            <select value={valueDoc.gender} onChange={onChangeState} id="country" name="gender" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
          <div class="mt-2">
            <input value={valueDoc.age} onChange={onChangeState} type="number" min="20" name="age" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="regions" class="block text-sm font-medium leading-6 text-gray-900">Specialization</label>
          <div class="mt-2">
            <input value={valueDoc.specialz} onChange={onChangeState} type="text" name="specialz" id="regions" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Qualification</label>
          <div class="mt-2">
            <input value={valueDoc.qualification} onChange={onChangeState} type="text" name="qualification" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2 sm:col-start-1">
          <label for="city" class="block text-sm font-medium leading-6 text-gray-900">Experience (years)</label>
          <div class="mt-2">
            <input value={valueDoc.experience} onChange={onChangeState} type="number" min="1" name="experience" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Consultency Fees (Pkr)</label>
          <div class="mt-2">
            <input value={valueDoc.amount} onChange={onChangeState} type="number" name="amount" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">Clinic Address</label>
          <div class="mt-2">
            <input value={valueDoc.address} onChange={onChangeState} type="text" name="address" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button onClick={onClear} type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex justify-center" disabled={loading}>Save {loading && <div className="lds-dual-ring"></div>}</button>
  </div>
</form>
};