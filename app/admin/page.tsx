"use client";
import AdminHome from "@/components/SideBarAdmin";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Page = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="flex overflow-hidden bg-gray-100">
      <main className="flex-1 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome, Admin</h1>
      </main>
    </div>
  );
};

export default Page;
