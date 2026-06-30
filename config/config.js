import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Yeh line aapke internet ke block ko bypass karegi


const connectDB = async () => {
  
    try{
          await mongoose.connect(process.env.MONGO_URI);
          console.log("MONGODB Connected...");
    }
    catch (err){
                console.log("DB Connection Error: ", err.message);

    }

};


export default connectDB;