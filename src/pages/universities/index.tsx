import { useState } from "react";

import { Row, Col, Divider, Select, Space } from "antd";
import { DropDown, SearchBar } from "../../components";
import "./style.scss";
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper";
import {GlobalTable} from "../../components";


import { UniversitiesTableFlag } from "../../assets/images";
import { UniversitesTableData } from "./data";



const menu2 ={

}
const Universities = () => {
  const UniversitesTablecolumn = 
[
  {
    dataIndex: 'no',
    key: 'no',
    title: 'No'
  },
  {
    dataIndex: 'logo',
    key: 'logo',
    title: 'Logo',
    render: (_: any, data: any) => (
      <Space size="middle">
        <UniversitiesTableFlag/>
      </Space>
    ),
  },
  {
    dataIndex: 'universityName',
    key: 'universityName',
    title: 'University Name'
  },
  {
    dataIndex: 'universityRep',
    key: 'universityRep',
    title: 'UniversityRep'
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: 'Email'
  },
  {
    dataIndex: 'Contact',
    key: 'Contact',
    title: 'contact'
  },
  {
    dataIndex: 'city',
    key: 'city',
    title: 'City'
  },
  {
    title: "Action",
    key: "Action",
    render: (_: any, data: any) => (
      <Space size="middle">
        {/* <CustomDroupDown menu1={menu2} /> */}
      </Space>
    ),
  },
]
  const handleChange = () => {};
  return (
    <div className="universities">
      <div>
        <span className=" text-2xl font-semibold dashboard-primary-color">
          Universities
        </span>
        <Row>
        
          <Col span={12}>
            <Divider />
          </Col>
        </Row>

        <div className="flex justify-between">
          <div>
            <SearchBar size="middle" handleChange={handleChange} />
          </div>
          <div className="gap-2 flex items-center	">
            <Select
              className="select w-[200px] hover:bg-white "
              size="middle"
              placeholder="Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              options={[
                {
                  value: "1",
                  label: "Pakistan",
                },
                {
                  value: "2",
                  label: "India",
                },
                {
                  value: "3",
                  label: "France",
                },
                {
                  value: "4",
                  label: "Canada",
                },
              ]}
            />

            <DropDown
              options={["pdf", "excel"]}
              requiredDownloadIcon
              setValue={() => {}}
              value=""
            />
          </div>
        </div>

        <BoxWrapper className="mt-5">
          <GlobalTable
            columns={UniversitesTablecolumn}
            pagination
            tableData={UniversitesTableData}
          />
        </BoxWrapper>
      </div>
    </div>
  );
};

export default Universities;
