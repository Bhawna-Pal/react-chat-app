import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    const conn = await mongoose.connect(uri);

    console.log("Database Connected:", conn.connection.host);

  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1); // ❗ stop server if DB fails
  }
};