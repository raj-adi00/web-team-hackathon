"use client";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Blog } from "@/app/blog/page";

interface SearchInputProps {
  setBlogs: (blogs: Blog[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ setBlogs }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Define debounced function ONCE using useCallback
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      try {
        const res = await fetch(`/api/blog/search?query=${query}`);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }, 500), // 500ms debounce delay
    []
  );
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetch("/api/blog")
        .then((res) => res.json())
        .then((data) => setBlogs(data))
        .catch((err) => console.error("Error fetching all blogs:", err));
    } else {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search blogs..."
      className="px-2 py-1 rounded border-black border-2 fixed top-28 right-0 w-1/6 text-black"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchInput;
