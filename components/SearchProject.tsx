"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { debounce } from "lodash";

interface SearchProps {
  setProjects: (projects: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ setProjects }) => {
  const [query, setQuery] = useState("");

  // Debounce search function to optimize API calls
  const handleSearch = debounce(async (searchQuery: string) => {
    try {
      const res = await fetch(`/api/project/search?query=${searchQuery}`);
      const data = await res.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  }, 300);

  // Handle input change
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
};

export default Search;
