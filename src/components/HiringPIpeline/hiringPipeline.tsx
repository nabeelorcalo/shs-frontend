import "./Pipeline.scss";
const pipelineColors: any = {
  rejected: "#E95060",
  hired: "#129252"
}
export const HiringPipeline = (props: any) => {
  const { hiringList, handleHiringProcess, hiringProcessStatusList } = props;
  const handleClick = (pipeline: string) => {
    handleHiringProcess(pipeline);
  };
  return (
    <div className="pipeline-wrapper">
      {hiringProcessStatusList.map((item: any, index: number) => (
        <div
          key={index}
          style={{
            backgroundColor: hiringList.includes(item?.title)
              ? pipelineColors[item?.title] || "#363565"
              : "#D2D6DC",
            color: hiringList.includes(item?.title) ? "#fff" : "",
          }}
          className={`pipline-content capitalize flex justify-center items-center`}
          onClick={() => handleClick(item.title)}
        >
          {item.title === "offerLetter" ? "Offer Letter" : item?.title}
        </div>
      ))}
    </div>
  );
};

export default HiringPipeline;
