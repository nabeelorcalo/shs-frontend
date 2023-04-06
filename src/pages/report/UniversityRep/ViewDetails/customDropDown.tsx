import React, { useState } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LocationMore } from '../../../../assets/images';
import {  Emoji1st, Emoji3rd, Emoji4th, } from '../../../../assets/images';
import ManagerRemarks from '../assessmentForm/manageRemarksforUni';
import useCustomHookforAssment from '../assessmentForm/actionHandler';

const tableData = [
  {
    learningCategories: "Technical Skills",
    learningObjectives: "For accuracy and completeness, developed and rewrote technical documentation known as Market Research Description and Product Requirement Document, which included instructions, broachers, product catalogues, and website resources.",
    evidenceOfProgress: "Collected and documented information on integration issues and vulnerabilities, as well as suggestions for improvement. Using Visual Studio, created accurate and efficient test scripts for automated testing of certain products and features.",
    managerRemarks: <ManagerRemarks image={<Emoji3rd/>}  content="Meets expectations" />,
    content:"Meets expectations"
  },
  {
    learningCategories: "Working with Others",
    learningObjectives: `Working as part of a team can assist build abilities such as leadership and task skills, which can be improved or increased through it on learning. Process skills include things like "effectiveness skills," "team functioning skills," and "systems thinking abilities."`,
    evidenceOfProgress: "Since we started working in the office. This has exposed me to a working atmosphere, which is the first stage in my personal development. And I'm transitioning from a teaching setting to an office setting.",
   managerRemarks: <ManagerRemarks image={<Emoji1st/>}  content="Does not meet expectations" />,
   content:"Meets expectations"
  },
  {
    learningCategories: "Working with Others",
    learningObjectives: `Being presentable includes more than just conveying ideas; it also necessitates appearing balanced, and body language plays a vital role in being regarded as worthy.`,
    evidenceOfProgress: "Being proactive about the duties and accomplishing them on time was difficult at first, but with practice and superior performance, it is possible.",
   managerRemarks: <ManagerRemarks image={<Emoji4th/>}  content="Exceeds expectations" />,
   content:"Meets expectations"
  },
  {
    learningCategories: "Commercial Awareness",
    learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
    evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
   managerRemarks: <ManagerRemarks image={<Emoji4th/>}  content="Exceeds expectations" />,
   content:"Meets expectations"
  },
  {
    learningCategories: "Personal and Professional Development",
    learningObjectives: `To be well-versed in all project and database databases linked to organizational activities.`,
    evidenceOfProgress: "Developed and wrote Market Research Description and Product Requirement Document, for our Confluence page for different bases for our projects which comprised instructions, broachers, product catalogues, and website resources, was developed and rewritten for correctness and completeness.",
   managerRemarks: <ManagerRemarks image={<Emoji4th/>}  content="Exceeds expectations" />,
   content:"Exceeds expectations"
  },

]
const TableColumn = ['Learning Categories', ' Learning Objectives', 'Evidence of Progress', "Manager's Remarks"]

const CustomDropDownReport = (props:any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const action = useCustomHookforAssment();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={() => navigate(`/report/view-details/assement-form/${props.data}`)}>
        View</span>
      ),
    },
    {
      key: '2',
      label: (
        <span onClick={()=>{props.dewnload, setVisible(false), action.downloadPdfOrCsv(event, TableColumn, tableData, "Mino Marina - September 2022 ")}}>
        Download
      </span>
      ),
    },
  ];
 
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  return (
    <Dropdown
    className=""
    menu={{ items }}
    open={visible}
    onOpenChange={handleVisibleChange}
    trigger={["click"]}
  >
    <div style={{ cursor: "pointer" }}>
      <LocationMore width="24px" />
    </div>
  </Dropdown>
  )
}

export default CustomDropDownReport