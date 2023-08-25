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

  // const handleEmojiClick = (emojiObject: any, event: any) => {
  //   const emoji = emojiObject.emoji;
  //   const { selectionStart, selectionEnd }: any = textRef.current;
  //   const newText =
  //     text.substring(0, selectionStart) + emoji + text.substring(selectionEnd);
  //   setText(newText);
  //   // Move the cursor to the right of the inserted emoji
  //   textRef.current.selectionStart = selectionStart + emoji.length;
  //   textRef.current.selectionEnd = selectionStart + emoji.length;
  //   textRef.current.focus();
  // };

  // const handleEmojiClick = (emojiObject: any, event: any) => {
  //   const emoji = emojiObject.emoji;

  //   // Get the current state and update it with the new text
  //   setText((prevText: string) => {
  //     const { selectionStart }: any = textRef.current;
  //     const newText =
  //       prevText.substring(0, selectionStart) + emoji + prevText.substring(selectionStart);

  //     // Set the cursor position after the inserted emoji
  //     const newCursorPosition = selectionStart + emoji.length;

  //     // Update the state
  //     return newText;
  //   });

  //   // ... (same code as before to set the cursor position)
  // };

  // const handleEmojiClick = (emojiObject: any) => {
  //   const emoji = emojiObject.emoji;
  //   const quill = textRef.current.getEditor();

  //   const range = quill.getSelection();
  //   if (range) {
  //     quill.insertText(range.index, emoji);
  //     quill.setSelection(range.index + emoji.length);
  //     setText(quill)
  //   }
  // };

  console.log(text);
  const handleEmojiClick = (emojiObject: any) => {
    const emoji = emojiObject.emoji;
    
    setText(text + emoji); // Try updating the editor's content
  };

  // const handleEmojiClick = (emojiObject: any) => {
  //   const emoji = emojiObject.emoji;
  //   const quill = textRef.current.getEditor();

  //   const range = quill.getSelection();
  //   // console.log(emoji, quill, range);
  //   console.log("range", range);
  //   // console.log("quill", quill);

  //   const cursorPosition = range ? range.index : text.length;
  //   console.log("text.length", text.length);
  //   console.log("text", text);


  //   console.log("cursorPosition", cursorPosition);
  //   console.log("text.slice(0, cursorPosition)", text.slice(0, cursorPosition));

  //   const newContent = text.slice(0, cursorPosition) + emoji + text.slice(cursorPosition);
  //   setText(newContent);

  //   // Move cursor to the right of the inserted emoji
  //   quill.setSelection(cursorPosition + emoji.length);
  // };


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