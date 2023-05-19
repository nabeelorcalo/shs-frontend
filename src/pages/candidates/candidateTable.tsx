import { GlobalTable, BoxWrapper } from "../../components";
import { StarOutlinedIcon, StarFilledIcon, ThreeDotsIcon } from "../../assets/images";
import DropDownNew from "../../components/Dropdown/DropDownNew";
import { Avatar } from "antd";
import dayjs from "dayjs";
import { ratingCount } from "./data";
import actionHandler from "./actionHandler";
import RejectModal from "./RejectModal";
import DetailDrawer from "./viewDetails";
const CandidateTable = (props: any) => {
  const {
    handleRating,
    getUserId,
    openDrawer,
    setOpenDrawer,
    openRejectModal,
    setOpenRejectModal,
    selectedCandidate,
    setSelectedCandidate,
  } = actionHandler();
  const { tableData = [] } = props;
  const data = tableData?.map((item: any, index: number) => ({
    id: item?.id,
    no: index + 1,
    avatar: item?.userDetail?.avatar,
    name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
    internship: item?.internship?.title ?? "",
    type: item?.internship?.departmentData?.name ?? "",
    appliedDate: dayjs(item?.createdAt).format("DD/MM/YYYY"),
    rating: item?.rating ?? 0,
    stage: item?.stage,
  }));

  const items: any = [
    {
      label: (
        <div>
          {ratingCount?.map((obj, i) => (
            <div
              key={obj.count}
              onClick={() => handleRating(data[i]?.id, obj.count)}
              className="flex items-center ratings "
            >
              <p className="title font-semibold text-base capitalize w-[120px] mb-[15px] ">{obj.title}</p>
              {Array.from(Array(obj.count).keys()).map((num) => (
                <StarFilledIcon key={num} className="icons mx-[2px] mb-[15px] " />
              ))}
            </div>
          ))}
        </div>
      ),
      key: "rating",
    },
  ];

  const columns = [
    {
      key: "no",
      dataIndex: "no",
      title: "No",
      render: (_: any, data: any) => <span>{data.no > 9 ? data.no : `0${data.no}`} </span>,
    },
    {
      key: "avatar",
      dataIndex: "avatar",
      title: "Avatar",
      render: (_: any, data: any) => (
        <Avatar
          className="h-[32px] w-[32px] rounded-full object-cover relative"
          src={data.avatar}
          alt={data.name}
          icon={
            <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              {`${data?.name[0]} ${data?.name?.split(" ")[1][0]}`}
            </span>
          }
        />
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
      render: (_: any, data: any) => <span className="capitalize">{data.name}</span>,
    },
    {
      key: "internship",
      dataIndex: "internship",
      title: "Internship",
      render: (_: any, data: any) => (
        <div className="capitalize ">
          <p>{data.internship}</p>
          <p className="text-sm clr">{data.type}</p>
        </div>
      ),
    },
    {
      key: "appliedDate",
      dataIndex: "appliedDate",
      title: "Applied Date",
    },
    {
      key: "rating",
      dataIndex: "rating",
      title: "Rating",
      width: "150px",
      align: "center",
      render: (_: any, data: any) => (
        <DropDownNew onClick={() => getUserId(data?.id)} items={items}>
          <div className="flex items-center justify-center gap-2 clr">
            {data.rating === 0 ? <StarOutlinedIcon cursor={"pointer"} /> : <StarFilledIcon cursor={"pointer"} />}
            <span className="">{data.rating}:0</span>
          </div>
        </DropDownNew>
      ),
    },
    {
      key: "stage",
      dataIndex: "stage",
      title: "Stage",
      width: "220px",
      render: (_: any, data: any) => (
        <div className="flex candidate-table-wrapper">
          <div className="flex flex-col">
            <p className="capitalize ">{data.stage}</p>
            <div className="flex items-center justify-center rounded-full overflow-hidden mt-[10px]">
              {[1, 2, 3, 4, 5, 6].map((val) => (
                <p key={val} className={`stage-apply ${data.stage}`}>
                  {val}
                </p>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "action",
      dataIndex: "",
      title: "Actions",
      render: (_: any, data: any) => (
        <DropDownNew
          items={[
            {
              label: (
                <p
                  onClick={() => {
                    setOpenDrawer(true);
                    setSelectedCandidate(tableData.find(({ id }: any) => id === data?.id));
                  }}
                >
                  View Details
                </p>
              ),
              key: "detail",
            },
            { label: <p onClick={() => setOpenRejectModal(true)}>Reject</p>, key: "reject" },
          ]}
        >
          <ThreeDotsIcon className="cursor-pointer" />
        </DropDownNew>
      ),
    },
  ];

  return (
    <>
      <BoxWrapper className="candidate-table-wrapper">
        <GlobalTable columns={columns} tableData={data} pagination />
      </BoxWrapper>
      {openRejectModal && <RejectModal open={openRejectModal} setOpen={setOpenRejectModal} />}
      {openDrawer && <DetailDrawer open={openDrawer} setOpen={setOpenDrawer} selectedCandidate={selectedCandidate} />}
    </>
  );
};

export default CandidateTable;
