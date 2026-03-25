const mongoose = require("mongoose");

const connectDB = async () => {

    const mongoUri = "mongodb+srv://adminUser:2qikHNntOv7ChzAP@cluster0.kqexqlk.mongodb.net/?appName=Cluster0";

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected successfully!");

};

module.exports = { connectDB };