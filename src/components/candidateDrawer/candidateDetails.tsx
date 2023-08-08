import { Avatar, Col, Row } from "antd";
import DropDownNew from "../Dropdown/DropDownNew";
import { SearchBar } from "../SearchBar/SearchBar";
import { ArrowDownDark } from "../../assets/images";

export const CandidateDetails = (props: any) => {
  const { detailsData, getCompanyManagerList, companyManagerList, handleSelectAssignee, assignee, userData } = props;
  return (
    <div className="details mt-7 ">
      <div className="heading">
        <p>Details</p>
      </div>
      <div className="mt-3">
        <Row gutter={[30, 35]}>
          {detailsData?.map((item: any) => (
            <Col xl={8} lg={8} md={8} sm={12} xs={24}>
              <div className="asignee-wrap">
                <h2 className="m-0 font-medium text-base title">{item.title}</h2>
                {item.title === "Assignee" ? (
                  <DropDownNew
                    placement={"bottomRight"}
                    value={""}
                    items={[
                      { label: <SearchBar handleChange={getCompanyManagerList?.companyManager} />, key: "search" },
                      {
                        label: (
                          <div className="max-h-[200px] overflow-y-scroll">
                            {companyManagerList?.map((item: any) => (
                              <div
                                key={item?.companyManager?.id}
                                className="flex justify-between mb-4"
                                onClick={() => handleSelectAssignee(item)}
                              >
                                <div className="flex">
                                  <div className="mr-2">
                                    <Avatar
                                      className="h-[32px] w-[32px] rounded-full object-cover relative"
                                      src={item?.companyManager?.avatar}
                                      alt={item?.companyManager?.firstName}
                                      icon={
                                        <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                          {item?.companyManager?.firstName[0]}
                                          {item?.companyManager?.lastName[0]}
                                        </span>
                                      }
                                    />
                                  </div>
                                  <div>{`${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ),
                        key: "users",
                      },
                    ]}
                  >
                    <div className="drop-down-with-imgs flex items-center gap-3 h-12">
                      {assignee ? (
                        <div className="flex items-center gap-3 mr-[40px]">
                          <Avatar
                            className="h-[32px] w-[32px] rounded-full object-cover relative"
                            src={assignee?.avatar}
                            alt={assignee?.firstName}
                            icon={
                              <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                {assignee?.firstName[0]}
                                {assignee?.lastName[0]}
                              </span>
                            }
                          />
                          <p>{`${assignee?.firstName} ${assignee?.lastName}`}</p>
                        </div>
                      ) : (
                        <p>Select</p>
                      )}
                      <ArrowDownDark />
                    </div>
                  </DropDownNew>
                ) : (
                  <div className={`flex ${item.title === "Owner" ? "gap-2" : ""}`}>
                    {item?.image ? (
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="h-[32px] w-[32px] rounded-full object-cover relative"
                          src={userData?.avatar}
                          alt={userData?.firstName}
                          icon={
                            <span className="uppercase text-base leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                              {userData?.firstName[0]}
                              {userData?.lastName[0]}
                            </span>
                          }
                        />
                        <p className="m-0 capitalize">{item.value}</p>
                      </div>
                    ) : (
                      <p className="capitalize">{item?.value}</p>
                    )}
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
