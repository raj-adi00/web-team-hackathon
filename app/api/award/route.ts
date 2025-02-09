import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import { Award } from "@/utility/models/Awards";

// GET all awards
export async function GET() {
  try {
    await dbConnect();
    const awards = await Award.find();
    return NextResponse.json(awards);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching awards" },
      { status: 500 }
    );
  }
}

// POST a new award
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const newAward = new Award(body);
    await newAward.save();
    return NextResponse.json(newAward, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding award" }, { status: 500 });
  }
}
