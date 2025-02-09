"use client";

import { useEffect, useState } from "react";

interface FilterProps {
  setProjects: (projects: any[]) => void;
}

const Filter: React.FC<FilterProps> = ({ setProjects }) => {
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch all unique technologies
    const fetchTechnologies = async () => {
      try {
        const res = await fetch("/api/project/technologies");
        const data = await res.json();
        setTechnologies(data.technologies);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/project/categories");
        const data = await res.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    fetchTechnologies();
  }, []);

  const applyFilter = async () => {
    let query = "/api/project/search?";
    if (selectedTech) query += `tech=${selectedTech}&`;
    if (selectedCategory) query += `category=${selectedCategory}&`;

    try {
      const res = await fetch(query);
      const data = await res.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error filtering projects:", error);
    }
  };

  return (
    <div className="mx-auto mt-4 flex flex-row space-x-3 gap-3 flex-wrap w-screen justify-center items-center">
      {/* Technology Filter */}
      <select
        value={selectedTech}
        onChange={(e) => setSelectedTech(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="">All Technologies</option>
        {technologies.map((tech) => (
          <option key={tech} value={tech}>
            {tech}
          </option>
        ))}
      </select>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Apply Filter Button */}
      <button
        onClick={applyFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
