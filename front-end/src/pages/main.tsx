import { useEffect, useState } from "react";
import { GoMarkGithub } from "react-icons/go";
import { MdOutlineReportProblem } from "react-icons/md"
import { AiFillHome } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai"
import { AiFillAlert } from "react-icons/ai"
import { loadMapApi } from "../utils/googleMapsUtils";
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
      <div className = "center">
        <div className="header">
            <div className="header-text">
              <h1><AiFillAlert size="25px" className="home-icon"/>Algae Boom Busters</h1>
            </div>
        </div>
      </div>
      <div className = "center">
        <div  className = "title">
        <h1>Algae Attack</h1>
        </div>
      </div>
      <div className = "center">
        <h3>
          A tool to help identify and stop the spread of HABs in Florida
        </h3>
      </div>
      <div className = "flex-row">
        <div className="problem">
          <h3 className="problem-header">Problem <MdOutlineReportProblem size="45px" className = "problem-icon" /></h3>
          <p className="problem-paragraph">
            {" "}
            Algae are important to the ecosystem in Florida as they are an essential component of the food chain
            and release oxygen into the water. However, algae have the ability to quickly grow and overpopulate
            under the right conditions. Such blooms are referred to as HABs, or harmful algae blooms, which releases
            toxins into the environment which can make animals and people sick. HABs usually happen in late summer
            or early fall and last a few months. 
          </p>
        </div>
        <div className="solution">
        <h3 className="problem-header">Solution <AiOutlineCheckCircle size="45px" className = "solution-icon" /></h3>
          <p className="problem-paragraph">
            {" "}
            Algae Attack uses machine learning to predict the spread of HABs.
            This solves the problem of understaffed workers unable to properly track
            and manage the spread of HABs. Combined with the development of robots that are placed
            in lakes and rivers to control HABs, Algae Attack can completely automate the process
            of controlling HABs and reducing the contamination of Florida's water and ecosystems.

          </p>
        </div>
      </div>
        {scriptLoaded && (
        <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
          )}
      <div className = "center">
      <div className="resources">
          <h3 className="resources-header">Resources </h3>
          <p className="resources-paragraph">
            <a target="_blank" href="https://www.floridahealth.gov/environmental-health/aquatic-toxins/harmful-algae-blooms/index.html">
              Harmful Algae Blooms
            </a>
            <div>
              <a target="_blank" href="https://hab.whoi.edu/response/control-and-treatment/">
                Control and Treatment of HABs
              </a>
            </div>
            <div>
              <a target="_blank" href="https://www.ehn.org/a-remedy-for-harmful-algal-blooms-scientist-thinks-hes-found-one-2644268978.html">
                Potential Solution to Controlling HABs Using Robots
              </a>
            </div>
          </p>
        </div>
      </div>
      <div className = "center">
        <div className="footer-container">
            <GoMarkGithub />
            <a target="_blank" href="https://github.com/jmho/algaeattack">
              GitHub
            </a>
        </div>
      </div>
    </div>
  );
}
