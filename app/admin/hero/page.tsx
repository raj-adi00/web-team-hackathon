"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Page = () => {
  const router = useRouter();
  const [professor, setProfessor] = useState({
    name: "",
    title: "",
    credentials: "",
    department: "",
    university: "",
    specialization: "",
    tagline: "",
    image: "",
    linkedinUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfessorData = async () => {
      try {
        const response = await fetch("/api/hero");
        if (!response.ok) throw new Error("Failed to fetch professor data");

        const data = await response.json();
        setProfessor(data.data);
      } catch (error) {
        console.error("Error fetching professor data:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessorData();
  }, []);

  const handleImageUpload = async () => {
    if (!newImage) return professor.image; // If no new image, return previous URL

    const formData = new FormData();
    formData.append("file", newImage);
    formData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET as string
    ); // Cloudinary preset

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      return data.secure_url; // Return Cloudinary image URL
    } catch (error) {
      console.error("Image upload failed:", error);
      return professor.image; // Keep previous image if upload fails
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);

    try {
      const imageUrl = await handleImageUpload();
      const response = await fetch("/api/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...professor, image: imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to update professor data");

      const updatedData = await response.json();
      setProfessor(updatedData.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating professor data:", error);
      alert("Update failed!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <AdminHome /> */}
      <div className="max-w-4xl mx-auto bg-[#09093d] p-8 mt-2 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Admin Dashboard - Hero Section
        </h2>
        <div className="flex justify-center mb-6">
          <img
            src={professor.image}
            alt="Professor"
            className="w-32 h-32 rounded-full border-2 shadow-md object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={professor.name}
              onChange={(e) =>
                setProfessor({ ...professor, name: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={professor.title}
              onChange={(e) =>
                setProfessor({ ...professor, title: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Credentials</label>
            <input
              type="text"
              value={professor.credentials}
              onChange={(e) =>
                setProfessor({ ...professor, credentials: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Department</label>
            <input
              type="text"
              value={professor.department}
              onChange={(e) =>
                setProfessor({ ...professor, department: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">University</label>
            <input
              type="text"
              value={professor.university}
              onChange={(e) =>
                setProfessor({ ...professor, university: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Specialization</label>
            <input
              type="text"
              value={professor.specialization}
              onChange={(e) =>
                setProfessor({ ...professor, specialization: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">Tagline</label>
            <input
              type="text"
              value={professor.tagline}
              onChange={(e) =>
                setProfessor({ ...professor, tagline: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">LinkedIn URL</label>
            <input
              type="text"
              value={professor.linkedinUrl}
              onChange={(e) =>
                setProfessor({ ...professor, linkedinUrl: e.target.value })
              }
              className="w-full border p-2 rounded mt-1 text-black"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium">Update Image</label>
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <button
          onClick={handleUpdate}
          disabled={updating}
          className="w-full mt-6 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </div>
    </>
  );
};

export default Page;
