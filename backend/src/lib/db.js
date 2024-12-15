import moongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const conn = await moongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);    
    }
};