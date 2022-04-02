import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from 'react';
import { GoMarkGithub } from "react-icons/go";
import image from "./images/algae.jpg"; 

export default function Main() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <div className = "Main">
      <div className = "Header">
        <h1>Algae Attack</h1>
      </div>
      <div className="About">
        <h3 className = "AboutHeader">About </h3>
        <p className = "AboutParagraph"> Algae attack is a terrible website developed by dustin a
           s s s sasssssssssssssss s s s s ss s s s s it simulates justin aaaa  a   sasdas das
           dasdasdasdasdasdd sad as das das dasd asd asdsa asdasdasssssssssssssssssssssssssss
           sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdasd</p>
      </div>
      {scriptLoaded && (
        <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />
      )}
      <div className = "FooterDiv">
        <footer>
          <GoMarkGithub />
            <a target="_blank" href="https://github.com/jmho/algaeattack">GitHub</a>
        </footer>
      </div>
    </div>
  );
}
