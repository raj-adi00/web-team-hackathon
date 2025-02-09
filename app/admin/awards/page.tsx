"use client";

import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";

interface Award {
  _id?: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
}

const AdminAwards: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Award>({
    title: "",
    organization: "",
    year: new Date().getFullYear(),
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔹 Fetch Awards Data
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch("/api/award");
        if (!response.ok) throw new Error("Failed to fetch awards");

        const data: Award[] = await response.json();
        setAwards(data);
      } catch (err) {
        setError("Error loading awards.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  // 🔹 Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Add or Update Award
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId ? `/api/award/${editingId}` : "/api/award";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save award");

      const updatedAward = await response.json();
      if (editingId) {
        setAwards((prev) => prev.map((award) => (award._id === editingId ? updatedAward : award)));
      } else {
        setAwards((prev) => [...prev, updatedAward]);
      }

      setFormData({ title: "", organization: "", year: new Date().getFullYear(), description: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving award:", err);
    }
  };

  // 🔹 Handle Edit
  const handleEdit = (award: Award) => {
    setFormData(award);
    setEditingId(award._id || null);
  };

  // 🔹 Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this award?")) return;

    try {
      const response = await fetch(`/api/award/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete award");

      setAwards((prev) => prev.filter((award) => award._id !== id));
    } catch (err) {
      console.error("Error deleting award:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-[#09093d] p-8 mt-2 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">Admin - Manage Awards</h2>
      
      {editingId && (
        <button onClick={() => setEditingId(null)} className="border p-1 rounded-md my-2 bg-red-500 text-white">
          Add New Award
        </button>
      )}

      {/* 📌 Award Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6 text-black">
        <h3 className="text-lg font-bold mb-2 text-black">
          {editingId ? "Edit Award" : "Add New Award"}
        </h3>
        <input type="text" name="title" placeholder="Award Title" value={formData.title} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input type="text" name="organization" placeholder="Organization" value={formData.organization} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <textarea name="description" placeholder="Description (optional)" value={formData.description} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
          {editingId ? "Update" : "Add"} Award
        </button>
      </form>

      {/* 📌 Awards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awards.length > 0 ? (
          awards.map((award) => (
            <div key={award._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
              <h3 className="text-xl font-semibold">{award.title}</h3>
              <p className="text-gray-400">{award.organization} • {award.year}</p>
              {award.description && <p className="text-gray-300 mt-1">{award.description}</p>}
              <div className="mt-3 flex justify-between">
                <button onClick={() => handleEdit(award)} className="px-3 py-1 bg-yellow-500 text-black rounded">Edit</button>
                <button onClick={() => handleDelete(award._id!)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No awards found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminAwards;
