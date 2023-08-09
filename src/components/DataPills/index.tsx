import { PlusOutlined } from "@ant-design/icons";
import { Input, InputRef, Space, Tag } from "antd";
import { useRef, useState } from "react";

interface Props {
  name?: string;
  initialValue?: string[];
  addInput?: boolean;
  onNewAddition?: Function;
}

const DataPill = ({
  name = "",
  initialValue = [],
  addInput = true,
  onNewAddition = (list: string[]) => console.log("New Data Added"),
}: Props) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<InputRef>(null);
  const [skillTags, setSkillTags] = useState<string[]>(initialValue);

  const showInputSkills = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && skillTags.indexOf(inputValue) === -1) {
      setSkillTags([...skillTags, inputValue]);
      onNewAddition(name, [...skillTags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  return (
    <Space size={[0, 8]} wrap>
      {addInput ? (
        <>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
              autoFocus
              placeholder="Add New"
              className="w-32 bg-[#e6f4f9]"
              // style={{ backgroundColor: "#e6f4f9"}}
            />
          ) : (
            <Tag
              onClick={showInputSkills}
              color="#e6f4f9"
              className="py-1 px-4 rounded-3xl"
            >
              <span className="text-gray-400">
                <PlusOutlined className="mr-1" /> Add
              </span>
            </Tag>
          )}
        </>
      ) : null}
      {skillTags.map((item: any) => (
        <Tag color="#e6f4f9" className="py-1 px-4 rounded-3xl" key={item}>
          <span className="text-black">{item}</span>
        </Tag>
      ))}
    </Space>
  );
};

export default DataPill;
