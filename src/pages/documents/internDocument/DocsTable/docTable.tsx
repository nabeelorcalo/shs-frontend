import React, { useState } from "react";
import { Dropdown, MenuProps, Rate } from "antd";
import { GlobalTable, Notifications } from "../../../../components";
import { DocImage, Dots, Pdf, ThreeDotsIcon } from "../../../../assets/images";
import DropDownNew from "../../../../components/Dropdown/DropDownNew";
import { byteToHumanSize } from "../../../../helpers";
import dayjs from "dayjs";
import useCustomHook from "../../actionHandler";
import PdfPreviewModal from "../../../candidates/PdfPreviewModal";
import constants from "../../../../config/constants";

const items = [
  {
    label: "View",
    value: "View",
    key: "VIEW",
  },
  {
    label: "Download",
    value: "Download",
    key: "DOWNLOAD",
  },
  {
    label: "Hide",
    value: "Hide",
    key: "HIDE",
  },
  {
    label: "Delete",
    value: "Delete",
    key: "DELETE",
  },
];

const DocTable = ({ docs, setDocumentsData, user }: any) => {
  const { starOrHideDocument, deleteDocument } = useCustomHook();
  const [actionId, setActionId] = useState<any>();
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });

  const changeState = async ({ id, action }: any) => {
    try {
      let response: any;

      if (action == "delete") {
        response = await deleteDocument({ id });
      } else {
        response = await starOrHideDocument({ id, action });
      }

      const { data } = response;

      setDocumentsData((prev: any) => {
        const index = docs.indexOf(docs.find((a: any) => a.id == id));
        if (action == "star") prev[index].starredBy = data.starredBy;
        if (action == "hide") prev[index].hide = data.hide;
        if (action == "delete") prev.splice(index, 1);
        return [...prev];
      });

      Notifications({
        title: "Success",
        description: `Success`,
      });
      return;
    } catch (error) {
      console.log(error);
      Notifications({
        title: "Error",
        description: `Something went wrong`,
        type: "error",
      });
      return;
    }
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "HIDE") {
      changeState({ id: actionId, action: "hide" });
    } else if (key === "DELETE") {
      changeState({ id: actionId, action: "delete" });
    } else if (key === "VIEW") {
      const data = docs.find((item: any) => item.id == actionId);
      setPreViewModal({
        extension: data?.file?.metaData?.extension,
        url: `${constants?.MEDIA_URL}/${data?.file?.mediaId}.${data?.file?.metaData.extension}`,
      });
      setOpenPreview(true);
    } else if (key === "DOWNLOAD") {
      const data = docs.find((item: any) => item.id == actionId);
      let url = `${constants?.MEDIA_URL}/${data?.file?.mediaId}.${data?.file?.metaData.extension}`;

      const link: any = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);

      link.click();
      link.parentNode.removeChild(link);
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Preview",
      dataIndex: "preview",
      render: (_: any, obj: any) => (
        // obj.name.includes(".pdf") ? (
        // <img src={DocImage} />
        // ) : (
        <img src={Pdf} alt="" />
      ),
      // ),
    },
    {
      title: "Name",
      dataIndex: "file",
      render: (file: any) => file?.filename || "N/A",
    },
    {
      title: "Favourite",
      dataIndex: "id",
      render: (id: any) => (
        <Rate
          defaultValue={
            docs
              .find((item: any) => (item.id = id))
              .starredBy.includes(String(user.id))
              ? 1
              : 0
          }
          onChange={(val) => changeState({ id, action: "star" })}
          count={1}
        />
      ),
    },
    {
      title: "Date",
      dataIndex: "Date",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "File Size",
      dataIndex: "file",
      render: (file: any) => byteToHumanSize(file.mediaSize),
    },
    {
      title: "Action",
      key: "id",
      render: (_: any, data: any) => (
        <DropDownNew
          items={
            user.id == data.uploadedById
              ? items
              : items.filter((a: any) => a.key == "VIEW" || a.key == "DOWNLOAD")
          }
          onClick={onClick}
        >
          <img
            className="cursor-pointer intern-document-model"
            src={Dots}
            onClick={() => setActionId(data.id)}
            alt=""
          />
        </DropDownNew>
      ),
    },
  ];

  return (
    <div>
      <GlobalTable tableData={docs} columns={columns} pagination={false} />
      <PdfPreviewModal
        setOpen={setOpenPreview}
        open={openPreview}
        preViewModal={preViewModal}
      />
    </div>
  );
};

export default DocTable;
