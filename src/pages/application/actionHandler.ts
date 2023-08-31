/// <reference path="../../../jspdf.d.ts" />
import { useRecoilState } from "recoil";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { applicationDataState, applicationDetailState, applicationPaginationState } from "../../store";
import csv from '../../helpers/csv';
import dayjs from "dayjs";


// Chat operation and save into store
const useCustomHook = () => {
  const { GET_APPLICATIONS, GET_APPLICATIONS_DETAILS } = apiEndpints;
  const [allApplicationsData, setAllApplicationsData] = useRecoilState(applicationDataState);
  const [applicationDetailsState, setapplicationDetailsState] = useRecoilState(applicationDetailState);
  const [tableParams, setTableParams]: any = useRecoilState(applicationPaginationState);


  const getApplicationsData = async (args: any = null, setLoading: any = null, filterType: any = null,
    startDate: any = null, endDate: any = null) => {
    args.locationType = args.locationType && args.locationType === 'ALL' ? null : args.locationType;
    args.stage = args.stage && args.stage === 'ALL' ? null : args.stage;
    args.workType = args.workType && args.workType === 'ALL' ? null : args.workType;
    args.filterType = args.filterType === 'ALL' ? null : filterType;
    args.startDate = startDate;
    args.endDate = endDate && dayjs(endDate).format('YYYY-MM-DD');

    await api.get(GET_APPLICATIONS, args).then((res) => {
      setAllApplicationsData(res);
      setLoading(true);
      const { pagination } = res
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: pagination?.totalResult,
        },
      });
      setLoading(false)
    })
  }

  // get application details list 
  const getApplicationsDetails = async (val: any) => {
    const { data } = await api.get(GET_APPLICATIONS_DETAILS, { id: val });
    setapplicationDetailsState(data)
  };

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;

    if (type === "pdf" || type === "PDF")
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

    const body = data?.map(({ no, date_applied, company, type_of_work, internship_type, nature_of_work, position, status }: any) =>
      [no, date_applied, company, type_of_work, internship_type, nature_of_work, position, status]
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
        }
      },
    });

    doc.save(`${fileName}.pdf`);
  };


  return {
    applicationDetailsState,
    getApplicationsDetails,
    getApplicationsData,
    allApplicationsData,
    downloadPdfOrCsv,
  };
};

export default useCustomHook;