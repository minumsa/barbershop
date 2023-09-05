interface FilterProps {
  title: string;
  data: any;
}

export const FilterContent = ({ title, data }: FilterProps) => {
  return (
    <div style={{ marginBottom: "50px" }}>
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
