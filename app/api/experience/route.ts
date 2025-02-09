import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Experience from "@/utility/models/Experience";


const validateExperience = (data: any) => {
  if (!data.instituteName || typeof data.instituteName !== "string")
    return "Invalid institute name";
  if (!data.startDate || !data.startDate.month || !data.startDate.year)
    return "Invalid start date";
  if (!data.endDate || !data.endDate.month || !data.endDate.year)
    return "Invalid end date";
  if (!Array.isArray(data.courses) || data.courses.length === 0)
    return "Courses should be a non-empty array";
  return null;
};

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find().sort({ startDate: -1 });
    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();

    const error = validateExperience(data);
    // console.log(data)
    if (error) return NextResponse.json({ error }, { status: 400 });

    const experience = new Experience(data);
    await experience.save();

    return NextResponse.json(
      { message: "Experience added successfully", experience },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add experience" },
      { status: 500 }
    );
  }
}
