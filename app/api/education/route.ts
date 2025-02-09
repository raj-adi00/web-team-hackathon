import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Education from "@/utility/models/Education";

// 📌 GET: Fetch all education records
export async function GET() {
  try {
    await dbConnect();
    const educationRecords = await Education.find();
    return NextResponse.json(educationRecords, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching education details" },
      { status: 500 }
    );
  }
}

// 📌 POST: Add a new education record
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { degree, fieldOfStudy, institution, yearOfCompletion } =
      await req.json();

    if (!degree || !institution || !yearOfCompletion) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newEducation = new Education({
      degree,
      fieldOfStudy,
      institution,
      yearOfCompletion,
    });
    await newEducation.save();

    return NextResponse.json(newEducation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding education record" },
      { status: 500 }
    );
  }
}
