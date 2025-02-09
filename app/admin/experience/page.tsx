"use client";

import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";

interface Experience {
  _id?: string;
  instituteName: string;
  startDate: { month: string; year: number };
  endDate: { month: string; year: number };
  courses: string[];
  description?: string;
}

const AdminExperience: React.FC = () => {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience>({
    instituteName: "",
    startDate: { month: "", year: new Date().getFullYear() },
    endDate: { month: "", year: new Date().getFullYear() },
    courses: [],
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔹 Fetch Experience Data
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch("/api/experience");
        if (!response.ok) throw new Error("Failed to fetch experience data");

        const data: Experience[] = await response.json();
        setExperienceList(data);
      } catch (err) {
        setError("Error loading experience data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  // 🔹 Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Courses Change (Comma-separated to Array)
  const handleCoursesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const courses = e.target.value.split(",").map((course) => course.trim());
    setFormData({ ...formData, courses });
  };

  // 🔹 Handle Add or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PATCH" : "POST";
    const url = editingId ? `/api/experience/${editingId}` : "/api/experience";

    try {
      console.log(formData.courses);
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          courses: formData.courses,
        }),
      });

      if (!response.ok) throw new Error("Failed to save experience record");

      const updatedExperience = await response.json();
      //   setExperienceList((prev) =>
      //     editingId
      //       ? prev.map((exp) => (exp._id === editingId ? updatedExperience : exp))
      //       : [...prev, updatedExperience]
      //   );
      window.location.reload();
      setFormData({
        instituteName: "",
        startDate: { month: "", year: new Date().getFullYear() },
        endDate: { month: "", year: new Date().getFullYear() },
        courses: [],
        description: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving experience record:", err);
    }
  };

  // 🔹 Handle Edit
  const handleEdit = (exp: Experience) => {
    setFormData({ ...exp, courses: exp.courses });
    setEditingId(exp._id || null);
  };

  // 🔹 Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete experience record");
      setExperienceList((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Error deleting experience record:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-[#09093d] p-8 mt-2 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Admin - Manage Experience
      </h2>
      {editingId && (
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              instituteName: "",
              startDate: { month: "", year: new Date().getFullYear() },
              endDate: { month: "", year: new Date().getFullYear() },
              courses: [],
              description: "",
            });
          }}
          className="border p-1 rounded-md my-2 bg-red-500 text-white"
        >
          Add new Data
        </button>
      )}

      {/* 📌 Experience Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md mb-6 text-black"
      >
        <h3 className="text-lg font-bold mb-2 text-black">
          {editingId ? "Edit Experience" : "Add New Experience"}
        </h3>
        <input
          type="text"
          name="instituteName"
          placeholder="Institute Name"
          value={formData.instituteName}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <div className="flex space-x-2">
          <input
            type="text"
            name="startMonth"
            placeholder="Start Month"
            value={formData.startDate.month}
            onChange={(e) =>
              setFormData({
                ...formData,
                startDate: { ...formData.startDate, month: e.target.value },
              })
            }
            className="w-1/2 p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            name="startYear"
            placeholder="Start Year"
            value={formData.startDate.year}
            onChange={(e) =>
              setFormData({
                ...formData,
                startDate: {
                  ...formData.startDate,
                  year: Number(e.target.value),
                },
              })
            }
            className="w-1/2 p-2 mb-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            name="endMonth"
            placeholder="End Month"
            value={formData.endDate.month}
            onChange={(e) =>
              setFormData({
                ...formData,
                endDate: { ...formData.endDate, month: e.target.value },
              })
            }
            className="w-1/2 p-2 mb-2 border rounded"
            required
          />
          <input
            type="number"
            name="endYear"
            placeholder="End Year"
            value={formData.endDate.year}
            onChange={(e) =>
              setFormData({
                ...formData,
                endDate: { ...formData.endDate, year: Number(e.target.value) },
              })
            }
            className="w-1/2 p-2 mb-2 border rounded"
            required
          />
        </div>
        <input
          type="text"
          name="courses"
          placeholder="Courses (comma separated)"
          value={formData.courses}
          onChange={handleCoursesChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editingId ? "Update" : "Add"} Experience
        </button>
      </form>

      {/* 📌 Experience List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experienceList.length > 0 ? (
          experienceList.map((exp) => (
            <div
              key={exp._id}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-xl font-semibold">{exp.instituteName}</h3>
              <p className="text-gray-400">
                {exp.startDate.month} {exp.startDate.year} - {exp.endDate.month}{" "}
                {exp.endDate.year}
              </p>
              <p className="text-gray-300 italic">{exp.courses.map(course=>
                <span className="mr-2" key={course}>{course} | </span>
              )}</p>
              {exp.description && (
                <p className="text-gray-400 mt-2">{exp.description}</p>
              )}
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-3 py-1 bg-yellow-500 text-black rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id!)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No experience records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminExperience;
