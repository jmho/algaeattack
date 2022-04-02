import mongoose from "mongoose";

export interface Device {
    lat: Number,
    lng: Number;
};

const userSchema = new mongoose.Schema<Device>({
    lat: {
        type: Number,
        required: true
    },

    lng: {
        type: Number,
        required: true
    }
});

export default mongoose.model<Device>("User", userSchema);