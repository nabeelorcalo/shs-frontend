import { useEffect, useState } from "react";
import { Emoji1st, Emoji3rd, Emoji4th, EmojiGray1st, EmojiGray3rd, EmojiGray4th } from "../../../assets/images";
const ManagerRemarks = ({ managerRemarks, id, handleManagerRemarks, remarksStatus }: any) => {
  const [remark, setRemark] = useState("");
  const handleRemarks = (value: string) => {
    setRemark(remark === value ? "" : value);
    handleManagerRemarks(id, remark === value ? "" : value);
  };

  useEffect(() => {
    setRemark(managerRemarks);
  }, []);

  const managerRemarksList: any = [
    {
      icon: (
        <div className="assessment-form-image-container">
          <span> {remark === "Does not meet expectations" ? <Emoji1st /> : <EmojiGray1st />} </span>
        </div>
      ),
      content: "Does not meet expectations",
    },
    {
      icon: (
        <div className="assessment-form-image-container">
          <span> {remark === "Meets expectations" ? <Emoji3rd /> : <EmojiGray3rd />} </span>
        </div>
      ),
      content: "Meets expectations",
    },
    {
      icon: (
        <div className="assessment-form-image-container">
          <span> {remark === "Exceeds expectations" ? <Emoji4th /> : <EmojiGray4th />} </span>
        </div>
      ),
      content: "Exceeds expectations",
    },
  ];

  //for approved status
  const remarksObj =
    remarksStatus?.toLowerCase() === "approved" &&
    managerRemarksList?.find((data: any) => data?.content === managerRemarks && <>t</>);
  return (
    <div className="flex xs:flex-col sm:flex-row justify-between">
      {remarksStatus?.toLowerCase() === "approved" ? (
        <div className="flex gap-3 items-center">
          <span className="text-center font-normal">{remarksObj?.icon}</span>
          <span className=" text-sm text-center font-normal ">{remarksObj?.content}</span>
        </div>
      ) : (
        managerRemarksList?.map((data: any) => {
          return (
            <div
              key={data?.content}
              onClick={() => handleRemarks(data?.content)}
              className="flex xs:flex-row sm:flex-col xs:gap-1 sm-gap-0 xs:my-1 sm:my-0"
            >
              <span className="text-center font-normal">{data.icon}</span>
              <span className=" text-sm text-center font-normal ">{data.content}</span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ManagerRemarks;
