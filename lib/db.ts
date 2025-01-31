import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Check your database connection string");
}

let cached = global.mongoose; // global is context ... it available to whole application

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  // one more case .. whwn sopmebody has tried to initiate the connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    // cached.promise = mongoose.connect(MONGODB_URI, opts) // this line gives error becoz its a promise so we have to use .then also..
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(()=>mongoose.connection)
  }

  try {
    cached.conn = await cached.promise
    
  } catch (error) {
    cached.promise = null
    
  }

  return cached.conn
}
