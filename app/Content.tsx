import React, { useState } from "react";
import { Map } from "./Map";
import { SideBar } from "./SideBar";
import { DetailBar } from "./DetailBar";

export const Content = () => {
  const [showDetailBar, setShowDetailBar] = useState<boolean>(false);

  return (
    <div className="content-container">
      <div className="side-bar-container">
        <DetailBar showDetailBar={showDetailBar} setShowDetailBar={setShowDetailBar} />
        <SideBar showDetailBar={showDetailBar} />
      </div>
      <div className="map-container">
        <Map setShowDetailBar={setShowDetailBar} />
      </div>
    </div>
  );
};
