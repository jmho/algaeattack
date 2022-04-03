import mongoose from "mongoose";

export interface EnvironmentVarEntry {
  salinity: number;
  sampleDepth: number;
  waterTemp: number;
  windSpeed: number;
}

export interface LeanDevice {
  name: string;
  lat: Number;
  lng: Number;
  environmentVarList: [EnvironmentVarEntry];
}

const deviceSchema = new mongoose.Schema<LeanDevice>({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  environmentVarList: [
    {
      salinity: {
        type: Number,
        required: true,
      },
      sampleDepth: {
        type: Number,
        required: true,
      },
      waterTemp: {
        type: Number,
        required: true,
      },
      windSpeed: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model<LeanDevice>("Device", deviceSchema);
