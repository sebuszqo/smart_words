import mongoose, { ConnectOptions, Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async (): Promise<mongoose.Connection> => {
  try {
    console.log(process.env.MONGODB_URI);
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "SmartWords",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to MongoDB Atlas - SmartWords");
    return connection.connection;
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas - SmartWords", err);
  }
};
