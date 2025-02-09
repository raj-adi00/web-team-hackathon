import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Education from "@/utility/models/Education";

// 📌 PATCH: Update an education record
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    
    // Ensure ID exists
    if (!params || !params.id) {
      return NextResponse.json({ message: "Missing education ID" }, { status: 400 });
    }

    // Parse request body
    const data = await req.json();
    
    // Update record
    const updatedEducation = await Education.findByIdAndUpdate(params.id, data, { new: true });

    if (!updatedEducation) {
      return NextResponse.json({ message: "Education record not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEducation, { status: 200 });
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json({ message: "Error updating education record" }, { status: 500 });
  }
}

// 📌 DELETE: Remove an education record
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    // Ensure ID exists
    if (!params || !params.id) {
      return NextResponse.json({ message: "Missing education ID" }, { status: 400 });
    }

    // Delete record
    const deletedEducation = await Education.findByIdAndDelete(params.id);

    if (!deletedEducation) {
      return NextResponse.json({ message: "Education record not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Education record deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json({ message: "Error deleting education record" }, { status: 500 });
  }
}
