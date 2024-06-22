import mongoose from "mongoose";

/**
 * Asynchronously connects to the MongoDB database using the provided
 * environment variables.
 *
 * @return {Promise<void>} This function does not return anything directly,
 * but logs connection status or errors.
 */
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DB_NAME,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error(`Mongo database error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;