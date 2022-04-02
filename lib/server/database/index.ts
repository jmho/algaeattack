import mongoose from "mongoose";

export async function connectToDb() {

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect("mongodb://localhost:27017/algaeAttack_db");
    }

}