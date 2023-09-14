interface FilterProps {
  title: string;
  data: string[];
}

export const FilterWindow = ({ title, data }: FilterProps) => {
  return (
    <div className="filter-container">
      <div style={{ display: "flex" }}>
        <div>{title}</div>
        <div style={{ paddingLeft: "30px" }}>선택 안 함</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.map((text: string, index: number) => {
          return (
            <div key={index} style={{ paddingTop: "20px" }}>
              <input type="checkbox"></input>
              <label style={{ paddingLeft: "10px" }}>{text}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
