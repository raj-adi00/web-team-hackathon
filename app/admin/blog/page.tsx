"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

interface Blog {
  _id: string;
  heading: string;
  body: string;
  imageUrl?: string;
  videoUrl?: string;
}

const AdminBlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [formData, setFormData] = useState({
    heading: "",
    body: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  // 🔹 Upload to Cloudinary
  const uploadToCloudinary = async (file: File, type: "image" | "video") => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "laucqcos");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dof4ydubf/${type}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      return data.secure_url;
    } catch (error) {
      setError("Failed to upload image");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Blog Submission (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingId ? "PATCH" : "POST";
      const url = editingId ? `/api/blog/${editingId}` : "/api/blog";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        alert("Error saving blog");
        return;
      }

      setFormData({ heading: "", body: "", imageUrl: "", videoUrl: "" });
      setEditingId(null);
      await fetchBlogs(); // Refresh list
    } catch (error) {
      setError("failed to submit form");
      console.error("error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      if (!confirm("Are you sure you want to delete this blog?")) return;

      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Error deleting blog");
        return;
      }

      await fetchBlogs(); // Refresh list
    } catch (error) {
      setError("Failed to delete");
      console.error("Error deleting blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-[#09093d] p-8 mt-2 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Admin - Manage Blogs
      </h2>

      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 bg-gray-800 rounded-lg shadow-md"
      >
        <input
          type="text"
          placeholder="Heading"
          value={formData.heading}
          onChange={(e) =>
            setFormData({ ...formData, heading: e.target.value })
          }
          required
          className="w-full p-2 mb-2 rounded text-black"
        />
        <textarea
          placeholder="Body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          required
          className="w-full p-2 mb-2 rounded text-black"
        />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (!e.target.files?.[0]) return;

            try {
              setLoading(true);
              console.log("Uploading image...");
              const url = await uploadToCloudinary(e.target.files[0], "image");
              console.log("Upload successful:", url);
              setFormData((prev) => ({ ...prev, imageUrl: url }));
            } catch (error) {
              console.error("Image upload failed:", error);
              alert("Image upload failed. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
          className="w-full p-2 mb-2"
        />

        <input
          type="file"
          accept="video/*"
          className="w-full p-2 mb-2"
          onChange={async (e) => {
            if (!e.target.files?.[0]) return;

            try {
              setLoading(true);
              console.log("Uploading video...");
              const url = await uploadToCloudinary(e.target.files[0], "video");
              console.log("Upload successful:", url);
              setFormData((prev) => ({ ...prev, videoUrl: url }));
            } catch (error) {
              console.error("Upload failed:", error);
              alert("Video upload failed. Please try again.");
            } finally {
              setLoading(false);
            }
          }}
        />
        <div className="flex gap-2 my-2 flex-wrap">
          {formData.videoUrl && editingId && (
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => setFormData((prev) => ({ ...prev, videoUrl: "" }))}
            >
              Remove existing Video
            </button>
          )}
          {formData.imageUrl && editingId && (
            <button
              type="button"
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => setFormData((prev) => ({ ...prev, imageUrl: "" }))}
            >
              Remove existing Image
            </button>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      {loading && <Loader />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 bg-gray-800 rounded-lg shadow-md">
            <p className="text-black font-semibold text-sm">ID: {blog._id}</p>
            <h3 className="text-xl font-bold text-white">{blog.heading}</h3>
            <p className="text-gray-300 mt-2">{blog.body}</p>
            {blog.imageUrl && (
              <p className="text-gray-400 mt-1">Image: {blog.imageUrl}</p>
            )}

            {blog.videoUrl && (
              <p className="text-gray-400 mt-1"> Video: {blog.videoUrl}</p>
            )}

            <div className="flex space-x-2 mt-4">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setFormData({
                    heading: blog.heading,
                    body: blog.body,
                    imageUrl: blog.imageUrl || "",
                    videoUrl: blog.videoUrl || "",
                  });
                  setEditingId(blog._id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogPage;
