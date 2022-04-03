import { useEffect, useState } from "react";
import { GoMarkGithub } from "react-icons/go";
import { loadMapApi } from "../utils/googleMapsUtils";
import { AiFillHome } from "react-icons/ai";
import Map from "../map";

export default function Main() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <div>
      <div className = "Center">
        <div className="Header">
            <div className="HeaderText">
              <h1><AiFillHome size="25px" className="HomeIcon"/>Home</h1>
            </div>
        </div>
      </div>
      <div className = "Center">
        <div  className = "Title">
        <h1>Algae Attack</h1>
        </div>
      </div>
      <div className = "Center">
        <h3>balls balls balls balls balls
        balls balls balls balls balls
        balls balls balls balls balls
        </h3>
      </div>
      <div className = "FlexRow">
        <div className="About">
          <h3 className="AboutHeader">About </h3>
          <p className="AboutParagraph">
            {" "}
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
          </p>
        </div>
        <div className="Resources">
        <h3 className="AboutHeader">Resources </h3>
          <p className="AboutParagraph">
            {" "}
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
            balls balls balls balls balls
          </p>
        </div>
      </div>
        {scriptLoaded && (
        <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
          )}
      <div className = "Center">
        <div className="FooterDiv">
            <GoMarkGithub />
            <a target="_blank" href="https://github.com/jmho/algaeattack">
              GitHub
            </a>
        </div>
      </div>
    </div>
  );
}
