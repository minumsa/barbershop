import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";

interface ContentProps {
  showSubTab: boolean;
  setSubTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Content = ({ showSubTab, setSubTab }: ContentProps) => {
  return (
    <div className="content-container">
      <div className="tab-container">
        <MainTab showSubTab={showSubTab} />
        <SubTab showSubTab={showSubTab} setSubTab={setSubTab} />
      </div>
      <div className="map-container">
        <Map setSubTab={setSubTab} />
      </div>
    </div>
  );
};
