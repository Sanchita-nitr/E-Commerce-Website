import mongoose from "mongoose";

const connectDB = async () => {
    try{
const conn = await mongoose.connect(process.env.MONGO_URL)
console.log(`Connect to the Mongodb Database ${conn.connection.host}`.bgWhite.black);
    }
    catch (error){
        console.log(`Error in Mongodb ${error}`.bgRed.white);

    }
}

export default connectDB;