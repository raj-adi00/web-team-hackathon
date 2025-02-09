import { NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Blog from "@/utility/models/Blog";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (!query) {
      return NextResponse.json(
        { message: "No search term provided" },
        { status: 400 }
      );
    }

    const blogs = await Blog.find({
      heading: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: "Error searching blogs" },
      { status: 500 }
    );
  }
}
