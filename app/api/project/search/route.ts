import Project from "@/utility/models/Project";
import dbConnect from "@/utility/dbConnect";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const techFilter = searchParams.get("tech") || "";
    const category = searchParams.get("category") || "";

    let filter: any = {};

    // Search by title, technologies, or collaborators (case insensitive)
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { technologies: { $regex: query, $options: "i" } },
        { collaborators: { $regex: query, $options: "i" } },
      ];
    }

    // Filter by technology (exact match inside array)
    if (techFilter) {
      filter.technologies = techFilter;
    }

    // Filter by category (case insensitive)
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error searching projects", error },
      { status: 500 }
    );
  }
}
