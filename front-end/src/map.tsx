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
  color: string;
}

interface NamedMarker {
  name: string;
  marker: GoogleMarker;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

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
          getCellCount(namedLatLng[i].name).then((algaeRiskLevel) => {
            if (algaeRiskLevel) {
              console.log("Risk: " + algaeRiskLevel);
              const colorKey: { [key: number]: string } = {
                1: "#00ff00",
                2: "#9b0",
                3: "#ff0",
                4: "#fa0",
                5: "#f00",
              };

              namedLatLng[i].color = colorKey[algaeRiskLevel];
            }
            addMarker(namedLatLng[i]);
          });
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

  const addMarker = (namedLL: NamedLatLng): void => {
    const marker = new google.maps.Marker({
      position: namedLL.position,
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 20,
        fillColor: namedLL.color,
        fillOpacity: 0.4,
        strokeWeight: 0.4,
      },
    });
    const infoWindow = new google.maps.InfoWindow();
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(namedLL.name);
      infoWindow.open(marker.getMap(), marker);
    });

    markers.push({ name: namedLL.name, marker: marker });
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
