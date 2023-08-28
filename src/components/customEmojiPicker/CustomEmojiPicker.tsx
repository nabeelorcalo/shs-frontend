import { FC, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { EmojiIcon } from '../../assets/images';
import { Dropdown } from "antd"
interface ICustomEmojiPicker {
  text?: any,
  setText?: React.Dispatch<React.SetStateAction<string>>,
  textRef?: any
}
export const CustomEmojiPicker: FC<ICustomEmojiPicker> = (props) => {
  const { text, setText }: any = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiObject: any) => {
    const emoji = emojiObject.emoji;
    setText(text + emoji);
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={(open) => setOpen(open)}
      overlayClassName="custom-dropdown-menu"
      trigger={["click"]}
      menu={{
        items: [{
          key: 1,
          label:
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={280}
              height={400}
              searchDisabled
              previewConfig={{ showPreview: false }}
            />
        }]
      }}
      className="cursor-pointer">
      <EmojiIcon onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
    </Dropdown>
  );
};