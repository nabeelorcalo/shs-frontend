import { useState } from "react";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  universityCompaniesState,
  universityWidgetsState,
  universityAttendanceGraphState,
} from "../../../store";
import { getUserAvatar } from "../../../helpers";
const {
  GET_ALL_COMAPANIES,
  UNIVERSITY_DASHBOARD_WIDGETS,
  UNIVERSITY_ATTENDACE_GRAPH,
} = endpoints;

const useCustomHook = () => {
  //logged in user DATA
  const currentUser = useRecoilValue(currentUserState);
  // ============================== university Dashboard states ================================== //
  const [universityLoaders, setUniversityLoaders] = useState({
    isUniversityCompaniesLoading: false,
    isWidgetsLoading: false,
    isAttendanceLoading: false
  })
  // all companies list
  const [universityCompanies, setUniversityCompanies] = useRecoilState<any>(
    universityCompaniesState
  );
  const [universityAttendanceGraph, setUniversityAttendanceGraph] =
    useRecoilState<any>(universityAttendanceGraphState);
  // university dashboard counting card
  const [universityWidgets, setUniversityWidgets] = useRecoilState<any>(universityWidgetsState);
  // ================XXXX========= university Dashboard states ==============XXXX================ //

  // ============================== university Dashboard functions ================================== //
  // university dashboard
  const getUniversityDashboardWidget = async () => {
    setUniversityLoaders((prev) => ({ ...prev, isWidgetsLoading: true }));
    await api.get(UNIVERSITY_DASHBOARD_WIDGETS).then((res: any) => {
      setUniversityWidgets(res);
    });
    setUniversityLoaders((prev) => ({ ...prev, isWidgetsLoading: false }));
  };
  // getting all companies data
  const getAllCompaniesData = async () => {
    setUniversityLoaders(prev => ({ ...prev, isUniversityCompaniesLoading: true }))
    const params = { userUniversityId: currentUser?.userUniversity?.id };
    const { data } = await api.get(GET_ALL_COMAPANIES, params);
    const companyData = data?.map((obj: any) => ({
      companyId: obj?.id,
      logo: getUserAvatar({ profileImage: obj?.logo }),
      title: obj?.businessName,
      agency: obj?.businessSector,
      peopleList: obj?.interns?.map((item: any) => ({
        internProfile: getUserAvatar({
          profileImage: item?.userDetail?.profileImage,
        }),
        firstName: item?.userDetail?.firstName,
        lastName: item?.userDetail?.lastName,
      })),
    }));
    setUniversityCompanies(companyData);
    setUniversityLoaders(prev => ({ ...prev, isUniversityCompaniesLoading: false }))
    return companyData
  };
  const getUniversityAttendanceGraph = async () => {
    setUniversityLoaders((prev) => ({ ...prev, isAttendanceLoading: true }));
    await api.get(UNIVERSITY_ATTENDACE_GRAPH).then((res: any) => {
      setUniversityAttendanceGraph(res?.attendanceOver);
    });
    setUniversityLoaders((prev) => ({ ...prev, isAttendanceLoading: false }));
  };
  // =============XXXX============= university Dashboard functions ==============XXXX================ //
  return {
    universityLoaders,
    // companies
    universityCompanies,
    getAllCompaniesData,
    // university dashboard
    getUniversityAttendanceGraph,
    universityAttendanceGraph,
    getUniversityDashboardWidget,
    universityWidgets,
  };
};

export default useCustomHook;
