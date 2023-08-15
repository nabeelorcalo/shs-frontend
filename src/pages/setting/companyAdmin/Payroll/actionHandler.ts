/// <reference path="../../../../../jspdf.d.ts" />
import { useState } from "react";
import { useRecoilState } from 'recoil';
import 'jspdf-autotable';
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { payrollDataState, payrollInternState } from '../../../../store';
import { debounce } from 'lodash';
import { Notifications } from "../../../../components/Notification";
import dayjs from "dayjs";


// Chat operation and save into store
const usePayrollCustomHook = () => {
  //get Payroll data from BE side
  const { PAYROLL_FINDALL, DELETE_PAYROLL,
    ADD_PAYROLL, EDIT_PAYROLL, INTERN_LIST } = apiEndpints;
  const [payrollData, setPayrollData] = useRecoilState(payrollDataState);
  const [internsData, setInternsData] = useRecoilState(payrollInternState);
  const [isLoading, setIsLoading] = useState(false);

  const getPayrollData = async (
    state: any = null, searchValue: any = null) => {
    const params = {
      page: 1,
      limit: 100,
      q: searchValue
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(PAYROLL_FINDALL, query);
    setPayrollData(data)
    setIsLoading(false);
  }

  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  // Post payroll data
  const postPayroll = async (values: any) => {
    const { payrollName, from, timeTo, applyToNewHires, interns } = values;
    const startDate = from.startOf('month')
    const endDate = timeTo.endOf('month')
    const payrollDetails = {
      "name": payrollName,
      "from": dayjs(startDate).format("YYYY-MM-DD"),
      "to": dayjs(endDate).format("YYYY-MM-DD"),
      "interns": interns?.map((item: any) => item?.id),
      "applyToNewHires": applyToNewHires
    }

    setIsLoading(true);
    const { data } = await api.post(ADD_PAYROLL, payrollDetails);
    if (data) {
      setIsLoading(false);
      Notifications({ title: "Success", description: "Payroll added", type: "success" })
    }
  }

  // Edit Payroll 
  const editPayroll = async (id: any, values: any) => {
    const { applyToNewHire, interns, payrollName, from, timeTo } = values;
    const params = {
      name: payrollName,
      from: dayjs(from),
      to: dayjs(timeTo),
      interns: interns.map((item: any) => item?.id),
      applyToNewHires: applyToNewHire
    }
    setIsLoading(true)
    await api.patch(`${EDIT_PAYROLL}/${id}`, params);
    setIsLoading(false)
    getPayrollData()
    Notifications({ title: "Success", description: 'Payroll updated', type: 'success' })
  };

  // Delete payroll data 
  const deletePayroll = async (id: any) => {
    await api.delete(`${DELETE_PAYROLL}/${id}`)
    getPayrollData();
    Notifications({ title: "Success", description: 'Payroll deleted', type: 'success' })
  };

  // Getting all interns data 
  const getAllInterns = async (companyId: any) => {
    const params = {
      companyId: companyId
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(INTERN_LIST, query);
    setInternsData(data)
    setIsLoading(false);
  };

  return {
    debouncedSearch,
    setPayrollData,
    getPayrollData,
    deletePayroll,
    getAllInterns,
    payrollData,
    postPayroll,
    editPayroll,
    internsData,
    isLoading,
  };
};

export default usePayrollCustomHook;