import MainCarousel from "./MainCarousel";
import { barbershops } from "./lib/data";

interface MainTabProps {
  showSubTab: boolean;
}

export const MainTab = ({ showSubTab }: MainTabProps) => {
  return (
    !showSubTab && (
      <div className="tab">
        <div className="tab-title">바버샵 리스트</div>
        <div className="tab-filter">
          <div>{`총 ${barbershops.length}개의 검색 결과`}</div>
          <select className="tab-select">
            <option value="name-asc">이름 오름차순</option>
            <option value="name-desc">이름 내림차순</option>
            <option value="open-asc">개점일 오름차순</option>
            <option value="open-desc">개점일 내림차순</option>
          </select>
        </div>
        {barbershops.map((data, index) => {
          return (
            <div className="list-container" key={index}>
              <div className="carousel-container">
                <MainCarousel />
              </div>
              <div className="list-information">
                <div className="list-name">{data.name}</div>
                <div className="list-location">{data.location}</div>
                <div className="list-description">{data.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};
