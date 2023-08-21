import { CloseCircleFilled } from "@ant-design/icons";
import { DocumentCardIcon, DocImage } from "../../assets/images";

const SelectedUploadCard = (props: any) => {
  const { filename, filesize, handleRemoveSelectedFile } = props;
  const extension = filename?.slice(-3);
  const handleDelete = () => {
    handleRemoveSelectedFile();
  };

  const readableBytes = (bytes: number) => {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const value: any = bytes / Math.pow(1024, i);
    return value.toFixed(2) * 1 + " " + sizes[i];
  };

  return (
    <div className="flex w-6/12 ">
      <div className=" flex flex-row justify-between items-center m-1 w-full px-2 py-2  rounded bg-[#E6F4F9]">
        <div className="flex flex-row gap-2 items-center">
          <div>
            {extension === "pdf" ? (
              <DocumentCardIcon style={{ fontSize: "42px" }} />
            ) : extension === "ocx" ? (
              <img src={DocImage} alt="" width="46px" />
            ) : null}
          </div>
          <div className="flex flex-col justify-evenly gap-2">
            <div className="text-md">{filename}</div>
            <div className="text-sm">{readableBytes(filesize)}</div>
          </div>
        </div>
        <div>
          <CloseCircleFilled onClick={() => handleDelete()} />
        </div>
      </div>
    </div>
  );
};

export default SelectedUploadCard;
