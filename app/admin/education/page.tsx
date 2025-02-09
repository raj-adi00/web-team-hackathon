"use client";

import React, { useEffect, useState } from "react";

interface Education {
  _id?: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  yearOfCompletion: number;
}

const AdminEducation: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Education>({
    degree: "",
    fieldOfStudy: "",
    institution: "",
    yearOfCompletion: new Date().getFullYear(),
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔹 Fetch Education Data
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("/api/education");
        if (!response.ok) throw new Error("Failed to fetch education data");

        const data: Education[] = await response.json();
        setEducationList(data);
      } catch (err) {
        setError("Error loading education data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  // 🔹 Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add or Update Education
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId ? `/api/education/${editingId}` : "/api/education";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save education record");

      const updatedEducation = await response.json();
      if (editingId) {
        setEducationList((prev) =>
          prev.map((edu) => (edu._id === editingId ? updatedEducation : edu))
        );
      } else {
        setEducationList((prev) => [...prev, updatedEducation]);
      }

      setFormData({
        degree: "",
        fieldOfStudy: "",
        institution: "",
        yearOfCompletion: new Date().getFullYear(),
      });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving education record:", err);
    }
  };

  // 🔹 Handle Edit
  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu._id || null);
  };

  // 🔹 Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`/api/education/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete education record");

      setEducationList((prev) => prev.filter((edu) => edu._id !== id));
    } catch (err) {
      console.error("Error deleting education record:", err);
    }
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-[#09093d] p-8 mt-2 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Admin - Manage Education
      </h2>
      {editingId && (
        <button
          onClick={() => setEditingId(null)}
          className="border p-1 rounded-md my-2 bg-red-500"
        >
          Add new Data
        </button>
      )}
      {/* 📌 Education Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md mb-6 text-black"
      >
        <h3 className="text-lg font-bold mb-2 text-black">
          {editingId ? "Edit Education" : "Add New Education"}
        </h3>
        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="fieldOfStudy"
          placeholder="Field of Study"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          name="institution"
          placeholder="Institution"
          value={formData.institution}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="number"
          name="yearOfCompletion"
          placeholder="Year of Completion"
          value={formData.yearOfCompletion}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {editingId ? "Update" : "Add"} Education
        </button>
      </form>

      {/* 📌 Education List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationList.length > 0 ? (
          educationList.map((edu) => (
            <div
              key={edu._id}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700"
            >
              <h3 className="text-xl font-semibold">
                {edu.degree} in {edu.fieldOfStudy}
              </h3>
              <p className="text-gray-300">{edu.institution}</p>
              <p className="text-gray-400">Year: {edu.yearOfCompletion}</p>
              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => handleEdit(edu)}
                  className="px-3 py-1 bg-yellow-500 text-black rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id!)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No education records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminEducation;
