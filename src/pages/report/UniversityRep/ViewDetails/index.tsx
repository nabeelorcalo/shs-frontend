import { DownloadIconLeave, ReportViewDetails } from "../../../../assets/images";
import { BoxWrapper, Breadcrumb, Loader, NoDataFound, SearchBar } from "../../../../components";
import { Typography, Row, Col, Avatar } from "antd";
import CustomDropDownReport from "./customDropDown";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import "./style.scss";
import { useEffect, useRef } from "react";
import useCustomHook from "../../actionHandler";
import { useLocation } from "react-router";
import dayjs from "dayjs";
import { getUserAvatar } from "../../../../helpers";

const index = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getSelectedUniversityReportsData({ internId: getParamId(pathname) });
    }
  }, []);

  const { selectedUniversityReportsData, downloadPdfOrCsv, getSelectedUniversityReportsData, isLoading, getParamId } =
    useCustomHook();
  const { pathname, search } = useLocation();
  const [, firstName, lastName] = search?.split("?");

  const overview = selectedUniversityReportsData?.map((obj: any) => ({
    id: obj?.id,
    assessmentName: obj?.title,
    date: dayjs(obj?.createdAt).format("MMMM YYYY"),
    // image: obj?.remarked?.avatar,
    name: `${obj?.remarked?.firstName} ${obj?.remarked?.lastName}`,
    avatar: getUserAvatar({ profileImage: obj?.remarked?.profileImage }),
  }));
  const TableColumn = ["No.", " Profile", "Assessment Name", "Name", "Date"];
  const breadcrumbArray = [
    { name: `${firstName?.split("=")[1]} ${lastName?.split("=")[1]}` },
    { name: "Report", onClickNavigateTo: `/${ROUTES_CONSTANTS.REPORT} ` },
  ];

  const handleChange = (value: any) => {
    getSelectedUniversityReportsData({ internId: getParamId(pathname), search: value });
  };

  const handleDownload = () => {
    const tableBody = overview?.map(({ assessmentName, date, name, avatar }: any, index: number) =>
      ({ no: index + 1, avatar: avatar || " ", assessmentName, name, date }))
    downloadPdfOrCsv("pdf", TableColumn, tableBody, "Performance Report ");
  }

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
            onClick={handleDownload}
          >
            <DownloadIconLeave />
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : (
        <Row gutter={[30, 20]} className="mt-5">
          {overview?.length > 0 ? (
            overview.map((data: any, index: any) => {
              return (
                <Col key={index} className="gutter-row" xs={24} md={24} lg={12} xl={8} xxl={6}>
                  <BoxWrapper>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-[15px]">
                          <ReportViewDetails />
                          <p className="capitalize text-[18px] leading-6 text-primary-color">{data?.assessmentName}</p>
                        </div>
                        <span className="text-xl lg:text-2xl font-semibold text-secondary-color">{data?.date}</span>
                        <div className="flex items-center gap-[10px]">
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
                          />
                          <span className="capitalize text-base text-secondary-color">{data?.name}</span>
                        </div>
                      </div>
                      <div className="float-right place-items-end cursor-pointer ">
                        <CustomDropDownReport viewDetailsId={getParamId(pathname)} assessmentFormID={data?.id} />
                      </div>
                    </div>
                  </BoxWrapper>
                </Col>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </Row>
      )}
    </div>
  );
};

export default index;
