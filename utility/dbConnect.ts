import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      // console.log("Database is already connected");
      return {
        status: 200,
        data: {},
        message: "Database is already connected",
      };
    }

    const dbUri = process.env.MONGODB_URL;
    if (!dbUri) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(dbUri);

    // console.log("Connected to the database successfully");
    return {
      status: 200,
      data: {},
      message: "Successfully connected to the database",
    };
  } catch (err: any) {
    console.error("Error while connecting to the database:", err?.message);
    throw new Error("Failed to connect to Database");
  }
}
