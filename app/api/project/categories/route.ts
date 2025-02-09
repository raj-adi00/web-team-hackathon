import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Project from "@/utility/models/Project";

export async function GET() {
    
    try {
      await dbConnect();
    const categories = await Project.distinct("category");
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching categories", error }, { status: 500 });
  }
}
