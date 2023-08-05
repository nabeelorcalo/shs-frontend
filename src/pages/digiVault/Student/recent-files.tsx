import { useState } from "react";
import { Alert, GlobalTable } from "../../../components";
import dayjs from "dayjs";
import { FileIcon, FolderIcon } from "../../../assets/images";
import { Menu, Space } from "antd";
import CustomDroupDown from "./dropDownCustom";
import PdfPreviewModal from "../../candidates/PdfPreviewModal";
import constants from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { byteToHumanSize } from "../../../helpers";

const RecentFiles = (props: any) => {
  const { studentVault, myStates, setState } = props;
  const [openPreview, setOpenPreview] = useState(false);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });
  const { deleteFolderFile }: any = useCustomHook();

  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "key",
      minWidth: 300,
    },
    {
      title: "Date Modified",
      dataIndex: "datemodified",
      key: "datemodified",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },

    {
      title: "Action",
      key: "Action",
      dataIndex: "Action",
      align: "center",
    },
  ];

  const menu1 = (item: any) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            setOpenPreview(true);
            setPreViewModal({
              extension: item.mimeType.split("/").pop(),
              url: `${constants?.MEDIA_URL}/${item?.mediaId}.${item.mimeType
                .split("/")
                .pop()}`,
            });
          }}
        >
          View
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            setState({
              ...myStates,
              isToggle: true,
              delId: item.id,
            });
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  const newTableData = studentVault?.recentFiles
    ?.slice(0, 3)
    ?.map((item: any, index: number) => {
      const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
      return {
        key: index,
        Title: (
          <p>
            <span>{item.mode === "file" ? <FileIcon /> : <FolderIcon />}</span>
            <span className="ml-2">{item.title}</span>
          </p>
        ),
        datemodified: modifiedDate,
        size: item.size ? byteToHumanSize(item.size) : "N/A",
        Action: (
          <Space>
            <CustomDroupDown menu1={menu1(item)} />
          </Space>
        ),
      };
    });

  return (
    <div className="recent-files">
      <div className="recent-files-title font-semibold text-lg pb-6">
        Recent Files
      </div>
      <div className="recent-files-tible">
        <GlobalTable
          pagination={false}
          columns={columns}
          tableData={newTableData}
        />
      </div>
      <Alert
        state={myStates.isToggle}
        setState={setState}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteFolderFile(myStates.delId)}
      />
      <PdfPreviewModal
        setOpen={setOpenPreview}
        open={openPreview}
        preViewModal={preViewModal}
      />
    </div>
  );
};

export default RecentFiles;
