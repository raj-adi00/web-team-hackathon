import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Blog from "@/utility/models/Blog";
import mongoose from "mongoose";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract ID from the path

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Blog ID" }, { status: 400 });
    }

    const updates = await req.json();

    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedBlog)
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });

    return NextResponse.json({ message: "Blog updated", blog: updatedBlog });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating blog" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Blog ID" }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: "Error fetching blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extract ID from the path

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Blog ID" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog)
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });

    return NextResponse.json({ message: "Blog deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting blog" },
      { status: 500 }
    );
  }
}
