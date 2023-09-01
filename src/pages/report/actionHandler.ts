/// <reference path="../../../jspdf.d.ts" />
import { useState } from "react";
import 'jspdf-autotable';
import type { TablePaginationConfig } from "antd/es/table";
import api from "../../api";
import csv from '../../helpers/csv';
import { useRecoilState } from "recoil";
import endpoints from '../../config/apiEndpoints';
import { universityReportsAPICallStatus, universityReportsFilterParam, universityReportsFiltersData, universityReportsTableData } from "../../store/univeristy-reports";
import constants from "../../config/constants";
import { Notifications } from "../../components";
import dayjs from "dayjs";
import { pdf } from "../../helpers";
const { UNIVERSITY_REPORTS, UNIVERSITY_USER_REPORTS, UNIVERSITY_REPORTS_FILTER } = endpoints;

const learningCategories: any = {
  TECHNICAL: "Technical Skills",
  WWO: "Working with Others",
  SM: "Self-Management",
  CA: "Commercial Awarenesss",
  PPD: "Personal and Professional Development",
}

const useCustomHook = () => {
  const [universityReports, setUniversityReports] = useRecoilState<any>(universityReportsTableData)
  const [selectedUniversityReportsData, setSelectedUniversityReportsData] = useState<any>([])
  const [selectedAsseessmentReport, setSelectedAsseessmentReport] = useState<any>([])
  const [universityReportsFilters, setuniversityReportsFilters] = useRecoilState<any>(universityReportsFiltersData)
  // loader
  const [isLoading, setISLoading] = useRecoilState(universityReportsAPICallStatus);
  // reports params
  let params: any = {
    limit: 10,
    page: 1,

  };
  // global set params for filter ans search
  const [filterParams, setFilterParams] = useRecoilState<any>(universityReportsFilterParam)
  // handle global filters params
  const handleFilterParams = (filter: any) => {
    params = { ...params, ...filter }
    setFilterParams({ ...params, ...filter })
  }
  // get case-studies table data
  const getData = async (query?: any) => {
    setISLoading(true)
    //search query check
    if (query?.search) {
      params.search = query?.search
    }
    if (filterParams?.intern || filterParams?.department || filterParams?.status || filterParams?.date) {
      params = { ...filterParams, ...params }
    }
    await api.get(UNIVERSITY_REPORTS, query === "resetFilter" ? { page: 1, limit: 10 } : params).then((
      { count, data, pagination }
    ): any => {
      setUniversityReports({
        count,
        data: data?.map((obj: any, index: number) => ({
          id: obj?.id,
          no: index + 1,
          avatar: `${constants?.MEDIA_URL}/${obj?.userDetail?.profileImage?.mediaId}.${obj?.userDetail?.profileImage?.metaData?.extension}`,
          firstName: obj?.userDetail?.firstName,
          lastName: obj?.userDetail?.lastName,
          department: obj?.company?.businessName ?? "",
          company: obj?.internship?.department?.name ?? "",
          reviewer: `${obj?.manager?.companyManager?.firstName} ${obj?.manager?.companyManager?.lastName}`,
        })),
        pagination: {
          current: pagination?.page,
          pageSize: 10,
          showSizeChanger: false,
          total: pagination?.totalResult,
        }
      })
      setISLoading(false)
    });
  };
  // handle pagination
  const handleTableChange = (pagination: TablePaginationConfig) => {
    params.page = pagination?.current
    getData(params)
  };

  // get params id
  const getParamId = (value: string) => {
    return value?.substring(value?.lastIndexOf("/") + 1, value?.length);
  };

  // get single case-study object
  const getSelectedUniversityReportsData = async (params: any) => {
    setISLoading(true)
    await api.get(`${UNIVERSITY_USER_REPORTS}`, params).then(({ data }) => {
      setSelectedUniversityReportsData(data)
      setISLoading(false)
    })
  }

  // get single assessment report object
  const getSelectedAsseessmentReport = async (id: any, isDownloadPDF?: boolean) => {
    !isDownloadPDF && setISLoading(true)
    await api.get(`${UNIVERSITY_USER_REPORTS}/${id}`).then(({ data }) => {
      setSelectedAsseessmentReport(data)
      !isDownloadPDF && setISLoading(false)
      if (isDownloadPDF) {
        // pdf download and view assessment report
        const [assessmenTitle, assessmentDate, assessmentDataColumn, assessmentData] = assessmentDataFormatter(data)
        const TableData = assessmentData?.map((item: any) => {
          delete item.id;
          return item
        })
        downloadPdfOrCsv("pdf", assessmentDataColumn, TableData, `${assessmenTitle} - ${dayjs(assessmentDate).format("MMMM YYYY")}`, false);
      }
    })
  }

  // to check signature is image or not 
  const checkForImage = (url: string) => {
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    if (url && url.match(regex))
      return true;
    else
      return false;
  }

  const assessmentDataFormatter = (selectedAsseessmentReport: any) => {
    const assessmentDataColumn = ["Learning Categories", "Learning Objectives", "Evidence of Progress", "Manager's Remarks"];
    const assessmentData =
      selectedAsseessmentReport?.assessmentForm?.map((obj: any) => ({
        id: obj?.id,
        learningCategories: learningCategories[obj?.learningCategorie] || obj?.learningCategorie || "N/A",
        learningObjectives: obj?.learningObjective || "N/A",
        evidenceOfProgress: obj?.evidenceOfProgress || "N/A",
        managerRemarks: obj?.supervisorRemarks || "N/A",
        content: obj?.supervisorRemarks || "N/A",
      })) ?? [];

    const { title: assessmenTitle = "", createdAt: assessmentDate = "" } = selectedAsseessmentReport;
    return ([assessmenTitle, assessmentDate, assessmentDataColumn, assessmentData])
  }

  // git filters values
  const getFiltersData = async () => {
    await api.get(UNIVERSITY_REPORTS_FILTER).then(({ data }) => (setuniversityReportsFilters(data)))
  }

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any, isAvatar: boolean = true) => {
    const type = event?.toLowerCase();
    if (data?.length > 0) {
      if (type === "pdf" || type === "Pdf")
        pdf(`${fileName}`, header, data, isAvatar);
      else
        csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
      Notifications({ title: "Success", description: `${fileName} downloaded. `, type: "success" });
    } else {
      Notifications({ title: "No Data", description: "No data found to download", type: "error" })
    }
  }

  return {
    isLoading,
    getData, handleTableChange,
    universityReports, selectedUniversityReportsData, getSelectedUniversityReportsData, handleFilterParams,
    downloadPdfOrCsv, getParamId, getSelectedAsseessmentReport, selectedAsseessmentReport, checkForImage,
    getFiltersData, universityReportsFilters, assessmentDataFormatter
  };
};

export default useCustomHook;