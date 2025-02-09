"use client";

import { useState, useEffect } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  collaborators?: string[];
  startDate: string;
  endDate?: string;
  link?: string;
  imageUrl?: string;
  category?: string;
}

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    collaborators: "",
    startDate: "",
    endDate: "",
    link: "",
    imageUrl: "",
    category: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/project");
      const data = await res.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      "laucqcos"
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dof4ydubf/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
      collaborators: formData.collaborators.split(",").map((c) => c.trim()),
    };

    try {
      const res = await fetch(editingId ? "/api/project/id" : "/api/project", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { id: editingId, ...dataToSend } : dataToSend
        ),
      });

      const result = await res.json();
      if (res.ok) {
        fetchProjects();
        setEditingId(null);
        setFormData({
          title: "",
          description: "",
          technologies: "",
          collaborators: "",
          startDate: "",
          endDate: "",
          link: "",
          imageUrl: "",
          category: "",
        });
      } else {
        console.error("Error saving project:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      collaborators: project.collaborators?.join(", ") || "",
      startDate: project.startDate,
      endDate: project.endDate || "",
      link: project.link || "",
      imageUrl: project.imageUrl || "",
      category: project.category || "",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/project/id", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-blue-950">
      <h1 className="text-2xl font-bold text-center mb-4">
        Admin - Manage Projects
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded-md shadow mb-6 text-black"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          name="technologies"
          value={formData.technologies}
          onChange={handleInputChange}
          placeholder="Technologies (comma separated)"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="collaborators"
          value={formData.collaborators}
          onChange={handleInputChange}
          placeholder="Collaborators (comma separated)"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          placeholder="Project Link"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="w-full p-2 border rounded mb-2"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded mb-2"
        />
        {formData.imageUrl && (
          <img
            src={formData.imageUrl}
            alt="Uploaded"
            className="w-full h-32 object-cover rounded mb-2"
          />
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Display Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="p-4 border rounded shadow">
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <button
              onClick={() => handleEdit(project)}
              className="mr-2 p-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(project._id)}
              className="p-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjectsPage;
