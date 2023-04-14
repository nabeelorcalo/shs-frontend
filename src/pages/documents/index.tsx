import { useState } from "react";
import "./style.scss";
import { Divider } from "antd";
import InternDocumentHeader from "./internDocument/internDocumentHeader";
import InterCards from "./internDocument/InternCards/interCards";
import { ToggleButton } from "../../components";
import { CardViewIcon, TableViewIcon } from "../../assets/images";
const Documents = () => {
  const [isToggle, setIsToggle] = useState(false);

  const togglerClick = (event: any) => {
    setIsToggle((prevState: any) => ({
      ...prevState,
      isToggle: !isToggle,
    }));
  };

  return (
    <>
      <p className="font-medium text-3xl primary-color ">Documents</p>
      <Divider />
      <ToggleButton
        isToggle={isToggle}
        onTogglerClick={togglerClick}
        FirstIcon={CardViewIcon}
        LastIcon={TableViewIcon}
        className="w-[88px]"
      />
      {isToggle ? (
        <InterCards />
      ) : (
        <InternDocumentHeader isToggle={isToggle} setIsToggle={setIsToggle} />
      )}
    </>
  );
};

export default Documents;
