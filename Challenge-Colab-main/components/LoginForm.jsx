"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="bg-gray-100 flex h-screen items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="bg-white shadow-md rounded-md p-8">

          <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="Icon" />

          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>


          <form class="space-y-6 mt-4" onSubmit={handleSubmit}ob>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input name="email" type="email-address" autocomplete="email-address" required
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="password" required
                  class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>

            <div>
              <button type="submit"
                class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Sign
                In
              </button>
            </div>
            <Link className="text-sm mt-6 text-right" href={"/choices"}>
            Not Registered? <span className="underline">Register</span>
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
