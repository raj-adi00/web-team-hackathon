"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  heading: string;
  body: string;
  imageUrl?: string;
  videoUrl?: string;
}

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Blog not found");

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError("Error fetching blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Loader className="animate-spin mx-auto mt-10" />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!blog) return <p className="text-center text-gray-500">No blog found</p>;

  // Split heading into words instead of characters
  const words = blog.heading.split(" ");

  return (
    <motion.div
      className="mx-auto p-6 bg-[#09091e] h-[80vh] w-[95vw] rounded-lg shadow-md overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-[#e06039] overflow-hidden flex flex-wrap gap-x-2">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <div className="flex gap-2 items-center justify-center">
        {blog.imageUrl && (
          <motion.img
            src={blog.imageUrl}
            alt="Blog"
            className="mt-6 rounded-lg shadow-lg w-1/3 max-h-96 object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          />
        )}

        {/* Display Image with animation (if available) */}

        {/* Display Video with animation (if available) */}
        {blog.videoUrl && (
          <motion.video
            controls
            className="mt-6 w-1/3 max-h-96 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <source src={blog.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}
      </div>
      <motion.p
        className="text-[#ececef] mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {blog.body}
      </motion.p>
    </motion.div>
  );
};

export default BlogDetails;
