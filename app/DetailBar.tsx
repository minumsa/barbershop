interface ContentProps {
  showDetailBar: boolean;
  setShowDetailBar: any;
}

export const DetailBar = ({ showDetailBar, setShowDetailBar }: ContentProps) => {
  return (
    showDetailBar && (
      <div className="side-bar">
        <div className="detail-first-line">
          <div
            className="side-title"
            style={{
              display: "flex",
              width: "100%",
              height: "50px",
              justifyContent: "space-between",
            }}
          >
            <div>바버샵 상세 정보</div>
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
      </div>
    )
  );
};
