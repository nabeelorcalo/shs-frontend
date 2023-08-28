import { useState } from "react";
import { Alert, GlobalTable, PdfPreviewModal } from "../../../components";
import dayjs from "dayjs";
import { FileIcon, FolderIcon, More } from "../../../assets/images";
import { Dropdown, Menu, MenuProps, Space } from "antd";
import CustomDroupDown from "./dropDownCustom";
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

  const PopOver = (props: any) => {
    const { item } = props
    let items: MenuProps['items'] = [
      {
        key: "1",
        label: <a onClick={() => {
          setOpenPreview(true);
          setPreViewModal({
            extension: item.mimeType.split("/").pop(),
            url: `${constants?.MEDIA_URL}/${item?.mediaId}.${item.mimeType
              .split("/")
              .pop()}`,
          });
        }} >View</a>
      },
      {
        key: '2',
        label: <a onClick={() => {
              setState({
            ...myStates,
            isToggle: true,
            delId: item.id,
          });
        }}>Delete</a>
      }
    ];

    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More className="cursor-pointer" />
      </Dropdown>
    )
  }

  const newTableData = studentVault?.recentFiles
    ?.slice(0, 3)
    ?.map((item: any) => {
      const modifiedDate = dayjs(item.createdAt).format("YYYY-MM-DD");
      return {
        key: item.id,
        Title: (
          <p>
            <span>{item.mode === "file" ? <FileIcon /> : <FolderIcon />}</span>
            <span className="ml-2">{item.title}</span>
          </p>
        ),
        datemodified: modifiedDate,
        size: item.size ? byteToHumanSize(parseFloat(item.size)) : 'N/A',
        Action: <PopOver item={item} />
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
