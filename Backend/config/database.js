const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in .env file");
        }
        await mongoose.connect(uri); // No need for deprecated options
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
};

module.exports = connectDB;
