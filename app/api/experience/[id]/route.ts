import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Experience from "@/utility/models/Experience";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } =params;
    const data = await req.json();

    if (!id) return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });

    const experience = await Experience.findById(id);
    if (!experience) return NextResponse.json({ error: "Experience not found" }, { status: 404 });

    Object.assign(experience, data);
    await experience.save();

    return NextResponse.json({ message: "Experience updated successfully", experience }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    if(!params || !params.id){
        return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }
    const { id } = params;

    if (!id) return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });

    const deletedExperience = await Experience.findByIdAndDelete(id);
    if (!deletedExperience) return NextResponse.json({ error: "Experience not found" }, { status: 404 });

    return NextResponse.json({ message: "Experience deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
