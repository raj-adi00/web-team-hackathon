import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Project from "@/utility/models/Project";

export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const { id, ...updateData } = await req.json();
    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!project)
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Project updated successfully", project },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating project", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  try {
    const { id } = await req.json();
    const project = await Project.findByIdAndDelete(id);

    if (!project)
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting project", error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // console.log(id)
    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching project", error },
      { status: 500 }
    );
  }
}
