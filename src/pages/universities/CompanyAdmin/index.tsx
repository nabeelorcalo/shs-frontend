import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Select, Avatar } from "antd";
import {
  BoxWrapper,
  DropDown,
  Notifications,
  PageHeader,
  SearchBar,
} from "../../../components";
import UniversityTable from "./universityTable";
import useCustomHook from "./actionHandler";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { ThreeDots } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilState } from "recoil";
import { ExternalChatUser } from "../../../store";
import "./style.scss";

const index: React.FC = () => {
  const [Country, setCountry] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);

  const TableColumn = [
    "No.",
    "University Name",
    "Univerity Rep",
    "Email",
    "Contact",
    "City",
  ];

  const action = useCustomHook();
  const navigate = useNavigate();
  const { getUniversities, universitiesData }: any = useCustomHook();
  const companiesData: any = useRef([]);

  useEffect(() => {
    getUniversities(Country, searchValue);
  }, [searchValue, Country]);

  const UniversityTableColumn = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
      dataIndex: "logo",
      key: "logo",
      title: "Logo",
    },
    {
      dataIndex: "universityName",
      key: "universityName",
      title: "University Name",
    },
    {
      dataIndex: "universityRep",
      key: "universityRep",
      title: "University Rep",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "contact",
      key: "contact",
      title: "Contact",
    },
    {
      dataIndex: "city",
      key: "city",
      title: "City",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  if (!companiesData.current.length) {
    companiesData.current = universitiesData?.map((item: any, index: any) => {
      return {
        key: index,
        value: `${item?.university?.city ? item?.university?.city : "N/A"}`,
        label: `${item?.university?.city ? item?.university?.city : "N/A"}`,
      };
    });
  }

  const univertyTableData = universitiesData?.map(
    (item: any, index: number) => {

      return {
        key: index,
        no: universitiesData?.length < 10 ? `0${index + 1}` : index + 1,
        id: item?.id,
        logo:
          <Avatar size={50}
            src={`${constants.MEDIA_URL}/${item?.university?.logo?.mediaId}.${item?.university?.logo?.metaData?.extension}`}
          >
            {item?.university?.name?.charAt(0)}{item?.university?.name?.charAt(0)}
          </Avatar>,
        universityName: item?.university?.name,
        universityRep: `${item?.contact?.firstName} ${item?.contact?.lastName}`,
        email: item?.university?.email ? item?.university?.email : "N/A",
        contact: item?.university?.phoneNumber
          ? item?.university?.phoneNumber
          : "N/A",
        city: item?.university?.city,
        action: (
          <DropDownNew
            placement={"bottomRight"}
            items={[
              {
                label: (
                  <p
                    onClick={() =>
                      navigate(
                        `/${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}/${item?.id}`,
                        { state: item }
                      )
                    }
                  >
                    View Interns
                  </p>
                ),
                key: "interns",
              },
              {
                label: (
                  <p
                    onClick={() =>
                      navigate(
                        `/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`,
                        { state: item }
                      )
                    }
                  >
                    profile
                  </p>
                ),
                key: "profile",
              },
              {
                label: (
                  <p
                    onClick={() => {
                      setChatUser(item?.contact);
                      navigate(`${ROUTES_CONSTANTS.CHAT}/${item?.contact?.id}`);
                    }}
                  >
                    Chat
                  </p>
                ),
                key: "chat",
              },
            ]}
          >
            <ThreeDots className="cursor-pointer" />
          </DropDownNew>
        ),
      };
    }
  );

  const downloadCSVFile = universitiesData?.map(
    (item: any, index: number) => {
      return {
        no: universitiesData?.length < 10 ? `0${index + 1}` : index + 1,
        universityName: item?.university?.name,
        universityRep: `${item?.contact?.firstName} ${item?.contact?.lastName}`,
        email: item?.university?.email ? item?.university?.email : "N/A",
        contact: item?.university?.phoneNumber
          ? item?.university?.phoneNumber
          : "N/A",
        city: item?.university?.city,
      };
    }
  );

  const handleChangeSearch = (e: any) => {
    setSearchValue(e);
  };

  return (
    <div className="company-university">
      <PageHeader title="Universities" actions bordered />
      <Row className="mt-8" gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleChangeSearch} placeholder="Search by name" />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col gap-4 justify-end"
        >
          <Select
            allowClear
            value={Country}
            placeholder="City"
            className="w-[200px]"
            options={companiesData.current}
            onChange={(e: any) => setCountry(e)}
          />
          <DropDown
            requiredDownloadIcon
            options={["PDF", "Excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(
                event,
                TableColumn,
                downloadCSVFile,
                "Universities"
              );
              Notifications({
                title: "Success",
                description: "University list downloaded",
                type: "success",
              });
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityTable
              UniversityTableColumn={UniversityTableColumn}
              univertyTableData={univertyTableData}
            />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};
export default index;
