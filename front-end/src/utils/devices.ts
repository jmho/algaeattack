import {
  EnvironmentVarEntry,
  LeanDevice,
} from "database/build/src/models/Device";
import { NamedLatLng } from "../map";
import * as tf from "@tensorflow/tfjs";
import { Environment } from "@tensorflow/tfjs";

interface SuccessResponseBody {
  success: true;
  data?: { [key: string]: any } | Array<any> | null;
}

export async function getDevices() {
  const response = await fetch(
    "http://localhost:8000/api/v1/dataProcessor/mapData",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.status);
  if (response.status === 200) {
    const body: SuccessResponseBody = await response.json();
    interface NLL {
      name: string;
      lat: number;
      lng: number;
    }
    const deviceList: NLL[] = (await body.data) as LeanDevice[];
    let markers: NamedLatLng[] = [];
    for (let i = 0; i < deviceList.length; i++) {
      const marker = {
        name: deviceList[i].name,
        position: new google.maps.LatLng(deviceList[i].lat, deviceList[i].lng),
      };
      markers.push(marker);
    }
    return markers;
  }
}

export async function getCellCount(name: string) {
  const response = await fetch(
    "http://localhost:8000/api/v1/dataProcessor/getLastEntry?name=" + name,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.status);
  if (response.status === 200) {
    const body: SuccessResponseBody = await response.json();

    const model = await tf.loadLayersModel("/tfjs_model/model.json");

    const deviceList: EnvironmentVarEntry =
      (await body.data) as EnvironmentVarEntry;

    if (
      deviceList &&
      deviceList.salinity != null &&
      deviceList.sampleDepth != null &&
      deviceList.waterTemp != null
    ) {
      const X = tf.tensor(
        [deviceList.salinity, deviceList.sampleDepth, deviceList.waterTemp],
        [1, 3]
      );
      return await model.predict(X);
    }
    return null;
  }
}
