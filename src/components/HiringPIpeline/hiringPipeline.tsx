import "./Pipeline.scss";

const HiringPipeline = (props: any) => {
  const { hiringList, handleHiringProcess, hiringProcessStatusList } = props;
  const handleClick = (pipeline: string) => {
    handleHiringProcess(pipeline);
  };
  return (
    <div className="pipeline-wrapper">
      {hiringProcessStatusList.map((item: any) => (
        <div
          style={{
            backgroundColor: hiringList.includes(item?.title)
              ? item?.title === "rejected"
                ? "#E95060"
                : "#363565"
              : "#D2D6DC",
            color: hiringList.includes(item?.title) ? "#fff" : "",
          }}
          className={`pipline-content capitalize flex justify-center items-center`}
          onClick={() => handleClick(item.title)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default HiringPipeline;
