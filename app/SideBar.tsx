import { barbershopArray } from "./lib/data";

export const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="side-title">바버샵 리스트</div>
      <div className="side-filter">
        <div className="search-result">총 109개의 검색 결과</div>
        <div className="filter-blank"></div>
        <select className="filter-select">
          <option value="open">개점일 오름차순</option>
          <option value="open-reverse">개점일 내림차순</option>
          <option value="name">상호명 오름차순</option>
          <option value="name-reverse">상호명 내림차순</option>
        </select>
      </div>
      {barbershopArray.map((data, index) => {
        return (
          <div className="barbershop-list" key={index}>
            <div className="barbershop-image"></div>
            <div className="barbershop-info">
              <div className="barbershop-info-header">
                <div className="barbershop-name">{data.name}</div>
                <div className="barbershop-hashtag">
                  {data.hashtag.map((tag, index) => {
                    return <span key={index} style={{ paddingRight: "5px" }}>{`#${tag}`}</span>;
                  })}
                </div>
              </div>
              <div className="barbershop-location">{data.location}</div>
              <div className="barbershop-introduce">{data.notice}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
