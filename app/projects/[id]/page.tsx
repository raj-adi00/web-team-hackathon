"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

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
  createdAt: string;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/project/id?id=${id}`);
        const data = await res.json();
        if (data.project) {
          setProject(data.project);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <Loader />;
  if (!project)
    return <p className="text-center text-red-500">Project not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-60 object-cover rounded-md"
        />
      )}
      <h1 className="text-2xl font-bold mt-4">{project.title}</h1>
      <p className="text-gray-700 mt-2">{project.description}</p>

      <p className="text-sm text-gray-500 mt-4">
        <strong>Technologies:</strong> {project.technologies.join(", ")}
      </p>

      {project.collaborators && project.collaborators.length > 0 && (
        <p className="text-sm text-gray-500">
          <strong>Collaborators:</strong> {project.collaborators.join(", ")}
        </p>
      )}

      {project.category && (
        <p className="text-sm text-gray-500">
          <strong>Category:</strong> {project.category}
        </p>
      )}

      <p className="text-sm text-gray-500">
        <strong>Start Date:</strong>{" "}
        {new Date(project.startDate).toLocaleDateString()}
      </p>
      {project.endDate && (
        <p className="text-sm text-gray-500">
          <strong>End Date:</strong>{" "}
          {new Date(project.endDate).toLocaleDateString()}
        </p>
      )}

      {project.link && (
        <p className="text-sm text-blue-500 mt-2">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </p>
      )}
    </div>
  );
};

export default ProjectDetails;
