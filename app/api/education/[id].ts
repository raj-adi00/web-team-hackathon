import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Education from "@/utility/models/Education";

// 📌 PATCH: Update an education record
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const updatedEducation = await Education.findByIdAndUpdate(params.id, await req.json(), { new: true });

    if (!updatedEducation) {
      return NextResponse.json({ message: "Education record not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEducation, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating education record" }, { status: 500 });
  }
}

// 📌 DELETE: Remove an education record
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const deletedEducation = await Education.findByIdAndDelete(params.id);

    if (!deletedEducation) {
      return NextResponse.json({ message: "Education record not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Education record deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting education record" }, { status: 500 });
  }
}
