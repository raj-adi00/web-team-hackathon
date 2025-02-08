// // app/api/professor/route.ts
import { NextResponse } from "next/server";
import Hero, { IHero } from "@/utility/models/Hero";
import {
  deleteImageFromCloudinary,
  isCloudinaryImage,
} from "@/utility/cloudinary";
import dbConnect from "@/utility/dbConnect";

export const GET = async () => {
  try {
    await dbConnect();
    const professor = await Hero.findOne();
    if (!professor) {
      return NextResponse.json(
        { success: false, message: "Professor not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: professor },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching professor data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch professor data" },
      { status: 500 }
    );
  }
};
export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const body = await req.json();

    const requiredFields = [
      "name",
      "title",
      "credentials",
      "department",
      "university",
      "specialization",
      "tagline",
      "image",
      "linkedinUrl",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }
    const hero = new Hero(body);
    await hero.save();

    return NextResponse.json(
      {
        success: true,
        message: "Professor data created successfully",
        data: hero,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating professor data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create professor data" },
      { status: 500 }
    );
  }
};
export const PATCH = async (req: Request) => {
  try {
    await dbConnect();
    const body = await req.json();

    const professor = await Hero.findOne();
    if (!professor) {
      return NextResponse.json(
        { success: false, message: "Professor not found" },
        { status: 404 }
      );
    }

    const updatedFields: Partial<IHero> = {};
    const oldImage = professor.image;

    Object.keys(body).forEach((key) => {
      const typedKey = key as keyof IHero; // Ensure correct key type
      if (body[typedKey] !== professor[typedKey]) {
        updatedFields[typedKey] = body[typedKey];
      }
    });

    if (updatedFields.image && updatedFields.image !== oldImage) {
      if (isCloudinaryImage(oldImage)) {
        await deleteImageFromCloudinary(oldImage);
      }
    }

    Object.assign(professor, updatedFields);
    await professor.save();

    return NextResponse.json({
      success: true,
      message: "Professor data updated successfully",
      data: professor,
    },{status:201});
  } catch (error) {
    console.error("Error updating professor data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update professor data" },
      { status: 500 }
    );
  }
};
