// app/api/professor/about/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utility/dbConnect";
import Hero from "@/utility/models/Hero";

// **GET**: Fetch the About section
export async function GET() {
  try {
    await dbConnect();
    const professor = await Hero.findOne().select("about name title"); // Fetch only required fields

    if (!professor) {
      return NextResponse.json(
        { error: "Professor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(professor, { status: 200 });
  } catch (error) {
    console.error("GET /about error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// **PATCH**: Update the About section
export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const { about } = await req.json();

    if (!about || !about.trim()) {
      return NextResponse.json(
        { error: "About content cannot be empty" },
        { status: 400 }
      );
    }
   console.log(about)
    const professor = await Hero.findOneAndUpdate(
      {},
      { about },
      { new: true, projection: "about name title" } 
    );

    if (!professor) {
      return NextResponse.json(
        { error: "Professor not found" },
        { status: 404 }
      );
    }
//    console.log(professor)
    return NextResponse.json(
      {
        message: "About section updated successfully",
        ...professor.toObject(), 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /about error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
