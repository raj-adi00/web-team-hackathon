import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import { Award } from "@/utility/models/Awards";

// PATCH - Update award
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await req.json();
    const updatedAward = await Award.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(updatedAward);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating award" },
      { status: 500 }
    );
  }
}

// DELETE - Remove award
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    await Award.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Award deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting award" },
      { status: 500 }
    );
  }
}
