import DetailImageSlider from "./DetailImageSlider";
import ImageSlider from "./DetailImageSlider";
import { barbershopArray } from "./lib/data";

interface ContentProps {
  showDetailBar: boolean;
  setShowDetailBar: any;
}

export const DetailBar = ({ showDetailBar, setShowDetailBar }: ContentProps) => {
  return (
    showDetailBar && (
      <div className="side-bar">
        <div className="detail-first-line">
          <div className="side-title" style={showDetailBar ? { marginBottom: "15px" } : undefined}>
            <div style={{ fontWeight: "500" }}>{barbershopArray[0].name}</div>
            <div
              className="close"
              onClick={() => {
                setShowDetailBar(false);
              }}
            >
              ×
            </div>
          </div>
        </div>
        <div className="detail-image-container">
          <DetailImageSlider />
        </div>
        <div className="detail-info-container">
          <div className="detail-flexbox">
            <div className="detail-title">소개</div>
            <div className="detail-info">{barbershopArray[0].notice}</div>
          </div>
          <div className="detail-flexbox">
            <div className="detail-title">바버</div>
            {/* TODO: 2인 이상일 때 쉼표 넣기 */}
            <div className="detail-info">{`${
              barbershopArray[0].barber?.length
            }인 - ${barbershopArray[0].barber?.map((data, index) => {
              return data;
            })}`}</div>
          </div>
          <div className="detail-flexbox">
            <div className="detail-title">주소</div>
            <div className="detail-info">{barbershopArray[0].location}</div>
          </div>
          <div className="detail-flexbox">
            <div className="detail-title">운영시간</div>
            <div className="detail-info">{barbershopArray[0].operatingTime}</div>
          </div>
          <div className="detail-flexbox">
            <div className="detail-title">휴무일</div>
            <div className="detail-info">{barbershopArray[0].closedDays}</div>
          </div>
          <div className="detail-flexbox">
            <div className="detail-title">연락처</div>
            <div className="detail-info">{barbershopArray[0].contact}</div>
          </div>
          <div className="detail-flexbox">
            <div className="detail-title">인스타그램</div>
            <div className="detail-info">
              <a href={barbershopArray[0].instagram} target="_blank">
                {barbershopArray[0].instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
