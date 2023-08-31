export default function Home() {
  return (
    <div className="container">
      <div className="nav-container">
        <div className="title">
          <div>마이바버</div>
        </div>
        <div className="search-container">
          <div className="search">
            <input className="search-input" placeholder="지역을 입력해주세요" />
            <div className="search-button">
              <div>검색</div>
            </div>
          </div>
        </div>
        <div className="category">
          <div className="category-content">지도 ▾</div>
          <div className="category-content">36,000원 이하 ▾</div>
        </div>
      </div>
      <div className="content-container"></div>
    </div>
  );
}
