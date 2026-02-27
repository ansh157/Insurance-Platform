import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@insurance.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Admin created successfully:");
    console.log({
      email: admin.email,
      password: "admin123",
    });

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedAdmin();