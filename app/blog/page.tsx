"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

interface Blog {
  _id: string;
  heading: string;
  body: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-red-500 text-lg mt-8"
      >
        {error}
      </motion.p>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8 text-blue-950 text-center"
        >
          Blogs
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              variants={item}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group bg-gray-900 backdrop-blur-sm rounded-lg shadow-lg cursor-pointer border border-gray-700/50 gap-2 hover:border-blue-500/90 transition-all duration-300 p-6 text-center justify-center flex flex-col items-center"
              onClick={() => router.push(`/blog/${blog._id}`)}
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                {blog.heading}
              </h3>
              <div className="text-gray-400 text-sm">
                {blog.body.split(" ").slice(0, 10).join(" ")}
                {blog.body.split(" ").length > 10 && "..."}
              </div>

              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
                className="h-0.5 bg-blue-500/50 mt-3"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogList;
