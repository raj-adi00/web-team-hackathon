import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Project from "@/utility/models/Project";

export async function GET() {
  try {
    await dbConnect();
    const technologies = await Project.distinct("technologies");
    return NextResponse.json({ technologies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching technologies", error },
      { status: 500 }
    );
  }
}
