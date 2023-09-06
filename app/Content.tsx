import React from "react";
import { Map } from "./Map";
import { SideBar } from "./SideBar";

export const Content = () => {
  return (
    <div className="content-container">
      <div className="side-bar-container">
        <SideBar />
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};
