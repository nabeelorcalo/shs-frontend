import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
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
import { NavLink, useNavigate } from "react-router-dom";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import UserSelector from "../../../components/UserSelector";
import { useRecoilState } from "recoil";
import { ExternalChatUser } from "../../../store";

const index: React.FC = () => {
  const [Country, setCountry] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);

  const TableColumn = [
    "No.",
    "Avater",
    "University Name",
    "Univerity Rep",
    "Email",
    "Contact",
    "City",
  ];
  // const dropdownValue = ["London", "Bristol", "Manchester", "Oxford", "Belfast"]
  const action = useCustomHook();
  const navigate = useNavigate();
  const { getUniversities, universitiesData, debouncedSearch }: any =
    useCustomHook();

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
      dataIndex: "",
      key: "",
      title: "Logo",
      render: (logo: any) => {
        return {
          children: (
            // <img src={logo} alt="logo" />
            // <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{logo.universityName}</Avatar>
            <img
              src={`https://ui-avatars.com/api/${logo.universityName}`}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
          ),
        };
      },
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

  const univertyTableData = universitiesData?.map(
    (item: any, index: number) => {
      return {
        key: index,
        no: universitiesData?.length < 10 && `0${index + 1}`,
        id: item?.id,
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
                        `/${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}/${item.id}`,
                        { state: item?.id }
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
                  <NavLink to={`/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`}>
                    Profile
                  </NavLink>
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

  const handleChangeSearch = (e: any) => {
    setSearchValue(e);
  };
  let companiesData = universitiesData?.map((item: any, index: any) => {
    return {
      key: index,
      value: `${item.university.city}`,
      label: `${item.university.city}`,
    };
  });

  return (
    <div className="company-university">
      <PageHeader title="Universities" actions bordered />
      <Row className="mt-8" gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleChangeSearch} />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col gap-4 justify-end"
        >
          <UserSelector
            placeholder="City"
            className="w-[200px]"
            value={Country}
            onChange={(e: any) => setCountry(e)}
            options={companiesData}
          />
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(
                event,
                TableColumn,
                univertyTableData,
                "Report"
              );
              Notifications({
                title: "Success",
                description: "University list downloaded ",
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
