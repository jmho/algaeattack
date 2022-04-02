import { useEffect, useState } from "react";
import { loadMapApi } from "../utils/googleMapsUtils";
import Map from "../Map/map";

function Header() {
  return (
    <div className="header">
      <h1 className="title">Algae Attack</h1>
      <h1 className="title">Algae 2</h1>
    </div>
  );
}

export default function Main() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <div className="page">
      {scriptLoaded && (
        <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
      )}
    </div>
  );
}
