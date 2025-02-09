import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Blog from "@/utility/models/Blog";

// 🔹 Get All Blog Posts
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 });
  }
}

// 🔹 Create a Blog Post
export async function POST(req: NextRequest) {
    try {
      await dbConnect();
      const { heading, body, imageUrl, videoUrl } = await req.json();
  
      if (!heading || !body) {
        return NextResponse.json({ message: "Heading and body are required" }, { status: 400 });
      }
  
      // Ensure missing URLs are explicitly set to null
      const newBlog = new Blog({
        heading,
        body,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
      });
  
      await newBlog.save();
  
      return NextResponse.json({ message: "Blog created", blog: newBlog }, { status: 201 });
    } catch (error) {
      console.error("Error creating blog:", error);
      return NextResponse.json({ message: "Error creating blog" }, { status: 500 });
    }
  }
  