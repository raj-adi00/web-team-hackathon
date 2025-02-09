"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "@/components/Loader";

const AboutPage = () => {
  const router = useRouter();
  const [aboutContent, setAboutContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch About Content from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        if (!response.ok) throw new Error("Failed to fetch About content");

        const data = await response.json();
        setAboutContent(data.about);
      } catch (error) {
        console.error("Error fetching About section:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, [router]);

  // Handle Update
  const handleUpdate = async () => {
    if (!aboutContent) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ about: aboutContent }),
      });

      if (!response.ok) throw new Error("Failed to update About section");

      alert("About section updated successfully!");
    } catch (error) {
      console.error("Error updating About section:", error);
      alert("Failed to update the About section. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto bg-[#09093d] p-8 mt-2 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Admin Dashboard - About Section
      </h2>

      {/* Current Content Preview */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-bold mb-2 text-black">
          Current About Section
        </h3>
        <div className="prose max-w-none dark:prose-invert text-black">
          {aboutContent && (
            <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
          )}
        </div>
      </div>

      {/* TinyMCE Editor */}
      <div className="bg-white p-4 rounded-lg shadow-md text-black">
        <h3 className="text-lg font-bold mb-2">Edit About Section</h3>
        <Editor
          apiKey="slud29o0b1xa9wx0gntgbx4rbdbxgd2v2o7rp3spoweiaoks" // Optional, TinyMCE requires an API key for cloud services
          value={aboutContent}
          onEditorChange={(content) => setAboutContent(content)}
          init={{
            height: 300,
            menubar: false,
            plugins: "lists link image table code help wordcount",
            toolbar:
              "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | code",
          }}
        />
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdate}
        disabled={updating}
        className="w-full mt-6 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
      >
        {updating ? "Updating..." : "Update About Section"}
      </button>
    </div>
  );
};

export default AboutPage;
