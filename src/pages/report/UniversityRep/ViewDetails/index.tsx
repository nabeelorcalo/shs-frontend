import { DownloadIconLeave } from "../../../../assets/images";
import { BoxWrapper, Breadcrumb, Loader, Notifications, SearchBar } from "../../../../components";
import { Typography, Row, Col, Avatar } from "antd";
import CustomDropDownReport from "./customDropDown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import "./style.scss";
import { useEffect } from "react";
import useCustomHook from "../../actionHandler";
import { useLocation } from "react-router";
import dayjs from "dayjs";

const index = () => {
  useEffect(() => {
    getSelectedUniversityReportsData({ internId: getParamId(pathname) });
  }, []);

  const { selectedUniversityReportsData, downloadPdfOrCsv, getSelectedUniversityReportsData, isLoading, getParamId } =
    useCustomHook();

  const { pathname } = useLocation();
  const overview = selectedUniversityReportsData?.map((obj: any) => ({
    id: obj?.id,
    assessmentName: obj?.title,
    date: dayjs(obj?.createdAt).format("MMMM YYYY"),
    image: obj?.remarked?.avatar,
    name: `${obj?.remarked?.firstName} ${obj?.remarked?.lastName}`,
    profile: obj?.remarked?.avatar,
  }));
  const TableColumn = ["Assessment Name", " Profile", "Name", "Date"];
  const breadcrumbArray = [
    { name: "Mino Mrina" },
    { name: "Report", onClickNavigateTo: `/${ROUTES_CONSTANTS.REPORT} ` },
  ];

  const handleChange = (value: any) => {
    getSelectedUniversityReportsData({ internId: getParamId(pathname), search: value });
  };

  return (
    <div className="view-details-university-rep">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Row gutter={[20, 20]}>
        <Col xl={7} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xl={17} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
          <div
            className="drop-down-wrapper"
            onClick={() => {
              downloadPdfOrCsv(event, TableColumn, overview, "Performance Report ");
              Notifications({ title: "Success", description: "Assessment Form list downloaded ", type: "success" });
            }}
          >
            <DownloadIconLeave />
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : (
        <Row gutter={[30, 20]} className="mt-5">
          {overview.map((data: any, index: any) => {
            return (
              <Col key={index} className="gutter-row" xs={24} md={24} lg={12} xl={8} xxl={6}>
                <BoxWrapper>
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="flex">
                        <span> {data.image}</span>
                        <Typography className="pt-3 pl-2 m-0 capitalize">{data.assessmentName}</Typography>
                      </div>
                      <span className="text-xl lg:text-2xl font-semibold py-2">{data.date}</span>
                      <div>
                        <Avatar
                          className="h-[32px] w-[32px] rounded-full object-cover relative"
                          src={data?.avatar}
                          alt={data?.name}
                          icon={
                            <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                              {data?.name[0]}
                              {data?.name && data?.name?.split(" ")[1][0]}
                            </span>
                          }
                        />{" "}
                        <span className="capitalize">{data?.name}</span>
                      </div>
                    </div>
                    <div className="float-right place-items-end cursor-pointer ">
                      <CustomDropDownReport viewDetailsId={getParamId(pathname)} assessmentFormID={data.id} />
                    </div>
                  </div>
                </BoxWrapper>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default index;
