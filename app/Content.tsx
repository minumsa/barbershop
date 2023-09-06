import React from "react";
import { Map } from "./Map";
import NoSSR from "./lib/NoSSR";

export const Content = () => {
  return (
    <div className="content-container">
      <div className="side-bar"></div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};
