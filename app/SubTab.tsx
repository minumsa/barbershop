import SubCarousel from "./SubCarousel";
import ImageSlider from "./SubCarousel";
import { barbershops } from "./lib/data";

interface ContentProps {
  showSubTab: boolean;
  setSubTab: any;
}

export const SubTab = ({ showSubTab, setSubTab }: ContentProps) => {
  return (
    showSubTab && (
      <div className="tab">
        <div className="sub-title-container">
          <div className="tab-title" style={showSubTab ? { marginBottom: "15px" } : undefined}>
            <div style={{ fontWeight: "500" }}>{barbershops[0].name}</div>
            <div
              className="close"
              onClick={() => {
                setSubTab(false);
              }}
            >
              ×
            </div>
          </div>
        </div>
        <div className="sub-carousel-container">
          <SubCarousel />
        </div>
        <div className="sub-information-container">
          <div className="sub-flexbox">
            <div className="sub-title">소개</div>
            <div className="sub-information">{barbershops[0].description}</div>
          </div>
          <div className="sub-flexbox">
            <div className="sub-title">바버</div>
            {/* TODO: 2인 이상일 때 쉼표 넣기 */}
            <div className="sub-information">{`${
              barbershops[0].barber?.length
            }인 - ${barbershops[0].barber?.map((data, index) => {
              return data;
            })}`}</div>
          </div>
          <div className="sub-flexbox">
            <div className="sub-title">주소</div>
            <div className="sub-information">{barbershops[0].location}</div>
          </div>
          <div className="sub-flexbox">
            <div className="sub-title">운영시간</div>
            <div className="sub-information">{barbershops[0].operatingTime}</div>
          </div>
          <div className="sub-flexbox">
            <div className="sub-title">휴무일</div>
            <div className="sub-information">{barbershops[0].closedDays}</div>
          </div>
          <div className="sub-flexbox">
            <div className="sub-title">연락처</div>
            <div className="sub-information">{barbershops[0].contact}</div>
          </div>
          <div className="sub-flexbox">
            <div className="sub-title">인스타그램</div>
            <div className="sub-information">
              <a href={barbershops[0].instagram} target="_blank">
                {barbershops[0].instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
