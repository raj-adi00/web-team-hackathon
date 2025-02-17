"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa"; // Icon for sidebar

const AdminHome = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="flex overflow-hidden bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-[14vw] min-w-40 bg-gray-900 text-white flex flex-col p-5 fixed min-h-screen top-0">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "home" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              setActiveSection("home");
              router.push("/admin");
            }}
          >
            <FaUserShield className="mr-3" /> Home
          </button>
          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "hero" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              router.push("/admin/hero");
              setActiveSection("hero");
            }}
          >
            <FaUserShield className="mr-3" /> Hero
          </button>
          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "about" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              router.push("/admin/about");
              setActiveSection("about");
            }}
          >
            <FaUserShield className="mr-3" /> About
          </button>
          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "education" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              router.push("/admin/education");
              setActiveSection("education");
            }}
          >
            <FaUserShield className="mr-3" /> Education
          </button>
          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "experience" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              router.push("/admin/experience");
              setActiveSection("experience");
            }}
          >
            <FaUserShield className="mr-3" /> Experience
          </button>
          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "awards" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              router.push("/admin/awards");
              setActiveSection("awards");
            }}
          >
            <FaUserShield className="mr-3" /> Awards
          </button>
          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "blog" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              router.push("/admin/blog");
              setActiveSection("blog");
            }}
          >
            <FaUserShield className="mr-3" /> Blogs
          </button>

          <button
            className={`flex items-center p-3 rounded-lg transition ${
              activeSection === "project" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
            onClick={() => {
              router.push("/admin/project");
              setActiveSection("project");
            }}
          >
            <FaUserShield className="mr-3" /> Projects
          </button>
        </nav>
      </aside>

      {/* Main Content */}
    </div>
  );
};

export default AdminHome;
