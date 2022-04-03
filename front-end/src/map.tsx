import { Tensor } from "@tensorflow/tfjs";
import React, { useEffect, useRef, useState } from "react";
import { getCellCount, getDevices } from "./utils/devices";

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

interface IMarker {
  latitude: number;
  longitude: number;
}

export interface NamedLatLng {
  name: string;
  position: GoogleLatLng;
  color?: number;
}

interface NamedMarker {
  name: string;
  marker: GoogleMarker;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Circle;

const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  let markers: NamedMarker[] = [];
  let namedLatLng: NamedLatLng[] = [];
  const startMap = (): void => {
    if (!map) {
      defaultStartMap();
    }

    getDevices().then((namedMarkers) => {
      if (namedMarkers) {
        namedLatLng = namedMarkers;
        for (let i = 0; i < namedLatLng.length; i++) {
          console.log(namedLatLng[i].name);
          getCellCount(namedLatLng[i].name).then((cellCount) => {
            if (cellCount) {
              const cellCountTen: Tensor = cellCount as Tensor;
              const cellCountArr: Float32Array =
                cellCountTen.dataSync() as Float32Array;
              const algaeRiskLevel = cellCountArr.reduce(
                (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
                0
              );
              console.log("Risk: " + algaeRiskLevel);
              namedLatLng[i].color = (255 / 5) * algaeRiskLevel;
            }
          });
          addMarker(namedLatLng[i]);
        }
      }
    });
  };
  useEffect(startMap, [map]);

  // setInterval(async () => {
  //   for(let i = 0; i< markers.length; i ++){

  //   }
  // }, 1000);

  const defaultStartMap = (): void => {
    const defaultAddress = new google.maps.LatLng(28.212625, -82.5203862);
    initMap(6.5, defaultAddress);
  };

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const addMarker = (namedLL: NamedLatLng): void => {
    const marker: GoogleMarker = new google.maps.Circle({
      strokeColor: rgbToHex(namedLL.color || 0, 0, 0),
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: rgbToHex(namedLL.color || 0, 0, 0),
      fillOpacity: 0.35,
      map,
      center: namedLL.position,
      radius: 15000,
    });

    // Marker({
    //   position: namedLL.position,
    //   map: map,
    //   icon: getIconAttributes("#000000"),
    // });

    markers.push({ name: namedLL.name, marker: marker });
  };

  const getIconAttributes = (iconColor: string) => {
    return {
      path: 2 * google.maps.SymbolPath.CIRCLE, //"M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 3,
      anchor: new google.maps.Point(15, 30),
    };
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          zoomControl: true,
          mapTypeId: mapType,
        })
      );
    }
  };

  return (
    <div className="map-container">
      <div ref={ref} className="map"></div>
    </div>
  );
};

export default Map;
