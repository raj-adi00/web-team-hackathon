"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/SearchProject";
import Filter from "@/components/ProjectFilter";

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

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-950">
        Projects
      </h1>
      <div className="flex flex-wrap">
        <Search setProjects={setProjects} />
        <Filter setProjects={setProjects} />
      </div>

      {/* Projects List */}
      <div className="mt-6 space-y-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="p-4 border rounded-md cursor-pointer hover:shadow-lg transition shadow-lg bg-gray-200"
              onClick={() => router.push(`/projects/${project._id}`)}
            >
              <h2 className="text-lg mt-2 text-black font-bold">
                {project.title}
              </h2>
              <p className="text-gray-700">{project.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
              {project.collaborators && project.collaborators.length > 0 && (
                <p className="text-sm text-gray-500">
                  <strong>Collaborators:</strong>{" "}
                  {project.collaborators.join(", ")}
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
                <p className="text-sm text-blue-500">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Project Link
                  </a>
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
