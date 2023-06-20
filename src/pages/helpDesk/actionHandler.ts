/// <reference path="../../../jspdf.d.ts" />
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import csv from '../../helpers/csv';
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { helpDeskListDetail, helpDeskListState, getRoleBaseUsers } from '../../store';
import { Notifications } from '../../components';
import { useState } from 'react';
import constants from '../../config/constants';

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_HELP_DESK_LIST,
    HISTORY_HELP_DESK,
    EDIT_HELP_DESK,
    POST_HELP_DESK,
    GET_ROLEBASE_USERS } = endpoints

  const [helpDeskList, setHelpDeskList] = useRecoilState(helpDeskListState);
  const [helpDeskDetail, setHelpDeskDetail] = useRecoilState(helpDeskListDetail)
  const [roleBaseUsers, setRoleBaseUsers] = useRecoilState(getRoleBaseUsers)
  const [loading, setLoading] = useState(false)

  // get help desk list 
  const getHelpDeskList = async (activeLabel: any = null, state: any = null) => {
    setLoading(true)
    const { search, priority, issueType, date, status, selectedRole, assignedTo } = state;
    const params = {
      sort: 'ASC',
      search: search,
      assigned: activeLabel === 'RESOLVED' ? null : activeLabel,
      priority: priority ?? null,
      type: issueType ?? null,
      date: date ?? null,
      status: activeLabel === 'RESOLVED' ? 'RESOLVED' : status,
      roles: selectedRole ? selectedRole.replace(" ", "_") : null,
      assignedUsers: assignedTo
    }
    const { data } = await api.get(GET_HELP_DESK_LIST, params);
    setHelpDeskList(data.result);
    setLoading(false)
  };

  // get history details
  const getHistoryDetail = async (id: any) => {
    const { data } = await api.get(`${HISTORY_HELP_DESK}?helpdeskId=${id}`)
    setHelpDeskDetail(data)
  }

  // get rolse base users
  const getRoleBaseUser = async () => {
    const { data } = await api.get(GET_ROLEBASE_USERS, { role: constants.SYSTEM_ADMIN });
    setRoleBaseUsers(data?.result)
  }

  // post help desk
  const postHelpDesk = async (values: any) => {
    const url = `${POST_HELP_DESK}?subject=${values.subject}&description=${values.description}`
    const { data } = await api.post(url);
    getHelpDeskList()
    data && Notifications({ title: 'Success', description: 'Added Successfully', type: 'success' })
  }

  // update help desk details
  const EditHelpDeskDetails = async (id: any,
    priority?: any,
    status?: any,
    type?: any,
    assign?: any
  ) => {
    setLoading(true)
    const params = {
      sort: 'ASC',
      priority: priority?.toUpperCase(),
      status: status && status,
      type: type,
      assignedId: assign
    }
    const { data } = await api.patch(`${EDIT_HELP_DESK}?id=${id}`, params);
    setLoading(false)
    data && Notifications({ title: 'Success', description: 'Updated Successfully', type: 'success' })
  };

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;

    if (type === "pdf" || type === "Pdf")
      pdf(`${fileName}`, header, data);
    else
      csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
  }

  const pdf = (fileName: string, header: any, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;

    const body = data.map(({ ID, Subject, Type, ReportedBy, Role, Priority, Date, Assigned, Status }: any) =>
      [ID, Subject, Type, ReportedBy, Role, Priority, Date, Assigned, Status]
    );

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);

    doc.autoTable({
      head: [header],
      body: body,
      margin: { top: 50 },

      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'normal',
        fontSize: 12,
      },

      didParseCell: async (item: any) => {
        if (item.row.section === "head")
          item.cell.styles.fillColor = [230, 244, 249];
        else
          item.cell.styles.fillColor = false;
      },

      didDrawCell: async (item: any) => {
        if (item.column.dataKey === 2 && item.section === "body") {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          var dim = 20;

          // const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z";
          // doc.addImage(img, xPos+10, yPos, dim, dim);

          // doc.setFillColor(255, 0, 0);
          // doc.roundedRect(xPos,yPos+6, 100, 20, 5, 5, 'F'); //doc.roundedRect(xPos,yPos, width, height, radius, radius, 'F');

          // const img = new Image();
          // img.src = svg;
          // item.cell.padding('vertical', 0);
          // doc.addImage(img, 'PNG', xPos+10, yPos, 20, 20);
        }
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  return {
    loading,
    helpDeskList,
    helpDeskDetail,
    roleBaseUsers,
    getHelpDeskList,
    getRoleBaseUser,
    postHelpDesk,
    getHistoryDetail,
    EditHelpDeskDetails,
    downloadPdfOrCsv,
  };
};

export default useCustomHook;