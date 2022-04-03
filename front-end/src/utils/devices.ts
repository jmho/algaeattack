import {
  EnvironmentVarEntry,
  LeanDevice,
} from "database/build/src/models/Device";
import { NamedLatLng } from "../map";

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
    "http://localhost:8000/api/v1/dataProcessor/getLastEntry?" +
      +new URLSearchParams({
        name: name,
      }),
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

    const deviceList: EnvironmentVarEntry =
      (await body.data) as EnvironmentVarEntry;
  }
}
