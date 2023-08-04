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
  const { text, setText, textRef }: any = props;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiObject: any, event: any) => {
    const emoji = emojiObject.emoji;
    const { selectionStart, selectionEnd }: any = textRef.current;
    const newText =
      text.substring(0, selectionStart) + emoji + text.substring(selectionEnd);
    setText(newText);
    // Move the cursor to the right of the inserted emoji
    textRef.current.selectionStart = selectionStart + emoji.length;
    textRef.current.selectionEnd = selectionStart + emoji.length;
    textRef.current.focus();
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