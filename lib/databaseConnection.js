// lib/databaseConnection.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// global cache to avoid multiple connections in dev (HMR)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null; // allow retry
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
