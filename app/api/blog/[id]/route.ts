import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Blog from "@/utility/models/Blog";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    if (!id)
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
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
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      await dbConnect();
      
      // Extract `id` from URL params
      if (!params || !params.id) {
        return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
      }
      const {id} = params;
      const blog = await Blog.findById(id);
      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      return NextResponse.json({ message: "Error fetching blog" }, { status: 500 });
    }
  }
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    if (!id)
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
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
