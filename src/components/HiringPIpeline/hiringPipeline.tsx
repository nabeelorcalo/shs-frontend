import "./Pipeline.scss";

const Array = [
  {
    title: "applied",
    value: "0",
    color: "#363565",
  },
  {
    title: "interviewed",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "recommended",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "offer letter",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "contract",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "hired",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "rejected",
    value: "0",
    color: "#D2D6DC",
  },
];
const HiringPipeline = (props: any) => {
  const { hiringList, handleHiringProcess } = props;
  const handleClick = (pipeline: string) => {
    handleHiringProcess(pipeline);
  };
  return (
    <div className="pipeline-wrapper">
      {Array.filter((item) => (hiringList?.includes("hired") && item?.title === "rejected" ? null : item)).map(
        (item: any) => (
          <div
            style={{
              backgroundColor: hiringList.includes(item?.title) ? "#363565" : "#D2D6DC",
              color: hiringList.includes(item?.title) ? "#fff" : "",
            }}
            className={`pipline-content capitalize flex justify-center items-center`}
            onClick={() => handleClick(item.title)}
          >
            {item.title}
          </div>
        )
      )}
    </div>
  );
};

export default HiringPipeline;
