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
      <div className="barbershop-list">
        <div className="barbershop-image"></div>
        <div className="barbershop-info">
          <div className="barbershop-info-header">
            <div className="barbershop-name">하프바버샵</div>
            <div className="barbershop-hashtag">#정통클래식 #을지로힙플</div>
          </div>
          <div className="barbershop-location">서울 중구 을지로18길 15 2층 205호</div>
          <div className="barbershop-introduce">
            을지로 3가와 4가 사이 인쇄 골목에 위치한 1인 바버샵입니다. 한 분 한 분 최선을
            다하겠습니다.
          </div>
        </div>
      </div>
    </div>
  );
};
