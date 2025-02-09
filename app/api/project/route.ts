import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Project from "@/utility/models/Project";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(body)
    const project = new Project(body);
    await project.save();

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating project", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ createdAt: -1 }); // Fetch latest first
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching projects", error },
      { status: 500 }
    );
  }
}
