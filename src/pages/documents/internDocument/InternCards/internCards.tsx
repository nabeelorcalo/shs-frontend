import React, { useEffect, useState } from "react";
import { Col, Row, Rate, Divider, Empty, MenuProps } from "antd";
import { BoxWrapper, Notifications } from "../../../../components";
import { Dots, DoucmentCard1 } from "../../../../assets/images";
import DropDownNew from "../../../../components/Dropdown/DropDownNew";
import "./Styles.scss";
import dayjs from "dayjs";
import { byteToHumanSize } from "../../../../helpers";
import useCustomHook from "../../actionHandler";
import PdfPreviewModal from "../../../candidates/PdfPreviewModal";
import constants from "../../../../config/constants";
import { LockOutlined } from "@ant-design/icons";

const InternCards = ({ docs, setDocumentsData, user }: any) => {
  let items = [
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

  const { starOrHideDocument, deleteDocument } = useCustomHook();
  const [actionId, setActionId] = useState<any>();
  const [actionList, setActionList] = useState(items);
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });

  useEffect(() => {
    if (!openPreview) {
      setPreViewModal({
        extension: "",
        url: "",
      });
    }
  }, [openPreview]);

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

  const filterActionItems = (doc: any) => {
    if (doc.hide) {
      let newItem = items;
      newItem[2].label = "Unhide";
      setActionList(newItem);
    } else {
      setActionList(
        user.id == doc.uploadedById
          ? items
          : items.filter((a: any) => a.key == "VIEW" || a.key == "DOWNLOAD")
      );
    }
  };

  return (
    <>
      {docs.length > 0 ? (
        <Row gutter={[40, 40]}>
          {docs.map((data: any) => (
            <Col lg={6} md={24} sm={24} xs={24} key={data.id}>
              <BoxWrapper box-shadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)">
                <div
                  className="flex justify-between"
                  onClick={() => setActionId(data.id)}
                >
                  <Rate
                    count={1}
                    defaultValue={
                      data.starredBy.includes(String(user.id)) ? 1 : 0
                    }
                    onChange={() =>
                      changeState({ id: data.id, action: "star" })
                    }
                  />
                  <DropDownNew items={actionList} onClick={onClick}>
                    <img
                      className="cursor-pointer"
                      onClick={() => filterActionItems(data)}
                      src={Dots}
                      alt="icon"
                    />
                  </DropDownNew>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="my-1 docuemnt-card">
                    <img src={DoucmentCard1} alt="" />
                  </div>
                  <p>
                    {data?.hide ? (
                      <span className="mr-2">
                        <LockOutlined />
                      </span>
                    ) : null}
                    {data.file.filename || "N/A"}
                  </p>
                  <p>
                    {data?.user != null
                      ? `${data?.user?.firstName} ${data?.user?.lastName}`
                      : `${data?.uploadedBy?.firstName} ${data?.uploadedBy?.lastName}`}
                  </p>
                </div>
                <Divider />
                <div className="flex justify-around">
                  <div className="text-sm">
                    <p className="text-primary-color ">Date</p>
                    <p className="text-success-placeholder-color">
                      {dayjs(data?.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <Divider className="h-[40px]" type={"vertical"} />
                  <div className="text-sm">
                    <p className="text-primary-color ">File Size</p>
                    <p className="text-success-placeholder-color">
                      {byteToHumanSize(data?.file?.mediaSize)}
                    </p>
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <div className="flex justify-center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        </>
      )}
      {openPreview ? (
        <PdfPreviewModal
          setOpen={setOpenPreview}
          open={openPreview}
          preViewModal={preViewModal}
        />
      ) : null}
    </>
  );
};
export default InternCards;
