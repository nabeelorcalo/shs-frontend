/// <reference path="../../../jspdf.d.ts" />
import { useState } from "react";
import { useRecoilState } from "recoil";
import { companyPaginationState, universityCompaniesState } from "../../store";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import csv from '../../helpers/csv';
import apiEndpints from "../../config/apiEndpoints";


// Chat operation and save into store
const useCustomHook = () => {
  const { GET_ALL_COMAPANIES } = apiEndpints
  const [allUniversityCompanies, setAllUniversityCompanies] = useRecoilState<any>(universityCompaniesState);
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<any>({});
  const [tableParams, setTableParams]: any = useRecoilState(companyPaginationState);

  const getAllCompaniesData = async (userId: any = null, args: any = null, setLoading: any = null) => {
    args.userUniversityId = userId
    await api.get(GET_ALL_COMAPANIES, args).then((res: any) => {
      setAllUniversityCompanies(res);
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

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;

    if (type === "Pdf" || type === "PDF")
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

    const body = data?.map(({ id, company, company_rep, email, phone_no, students_hired }: any) =>
      [id, company, company_rep, email, phone_no, students_hired]
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
    getAllCompaniesData,
    allUniversityCompanies,
    downloadPdfOrCsv,
    selectedProfile,
    isLoading,
    setSelectedProfile,
  };
};

export default useCustomHook;