import { useEffect, useState } from "react";
import { Emoji1st, Emoji3rd, Emoji4th, EmojiGray1st, EmojiGray3rd, EmojiGray4th } from "../../../assets/images";
const ManagerRemarks = ({ managerRemarks, id, handleManagerRemarks }: any) => {
  const [remark, setRemark] = useState("");
  const handleRemarks = (value: string) => {
    setRemark(remark === value ? "" : value);
    handleManagerRemarks(id, remark === value ? "" : value);
  };

  useEffect(() => {
    setRemark(managerRemarks);
  }, []);

  const managerRemarksList = [
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
  return (
    <div className="flex xs:flex-col sm:flex-row justify-between">
      {managerRemarksList.map((data) => {
        return (
          <div
            onClick={() => handleRemarks(data?.content)}
            className="flex xs:flex-row sm:flex-col xs:gap-1 sm-gap-0 xs:my-1 sm:my-0"
          >
            <span className="text-center font-normal">{data.icon}</span>
            <span className=" text-sm text-center font-normal ">{data.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ManagerRemarks;
