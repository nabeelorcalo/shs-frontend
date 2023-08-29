import { useState } from "react";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserState,
  internshipsListState,
  internshipsSummeryGraphState,
  companyWidgetsState,
} from "../../../store";
const {
  COMPANY_DASHBOARD_WIDGETS,
  GET_LIST_INTERNSHIP,
} = endpoints;

const useCustomHook = () => {
  // ============================== common states ================================== //
  //logged in user DATA
  const currentUser = useRecoilValue(currentUserState);
  const [isAnnounceShowModal, setIsAnnounceShowModal] = useState<boolean>(false);
  const [companyAdminLoaders, setCompanyAdminLoaders] = useState({
    isPiplineLoading: false,
    isSummeryLoading: false,
    isWidgetsLoading: false
  });
  // ============================== company admin Dashboard states ================================== //
  // internsh list
  const [internshipsList, setInternshipsList] = useRecoilState<any>(internshipsListState);
  // internsh summery graph
  const [internshipsSummeryGraph, setInternshipsSummeryGraph] =
    useRecoilState<any>(internshipsSummeryGraphState);
  // company dashboard counting card
  const [companyWidgets, setCompanyWidgets] = useRecoilState<any>(companyWidgetsState);
  // ================XXXX========= company admin Dashboard states ==============XXXX================ //
  // ============================== company admin Dashboard functions ================================== //
  // internships api data modification for Internships Summary and pipline table
  const getInternShipList = async (departmentId?: any) => {
    setCompanyAdminLoaders((prev) => ({ ...prev, isPiplineLoading: true }));
    await api
      .get(GET_LIST_INTERNSHIP, departmentId && { departmentId: departmentId })
      .then((res: any) => {
        // pipline table
        setInternshipsList(
          res?.data?.map(({ id, title, interns }: any) => ({
            key: id,
            internships: {
              designation: title,
              candidates: interns?.length ?? 0,
            },
            applied:
              interns?.filter((item: any) => item?.stage === "applied")
                .length ?? 0,
            interviewed:
              interns?.filter((item: any) => item?.stage === "interviewed")
                .length ?? 0,
            recommended:
              interns?.filter((item: any) => item?.stage === "recommended")
                .length ?? 0,
            offerLetter:
              interns?.filter((item: any) => item?.stage === "offerLetter")
                .length ?? 0,
            contract:
              interns?.filter((item: any) => item?.stage === "contract")
                .length ?? 0,
            hired:
              interns?.filter((item: any) => item?.stage === "hired").length ??
              0,
            rejected:
              interns?.filter((item: any) => item?.stage === "rejected")
                .length ?? 0,
          }))
        );
      });
    setCompanyAdminLoaders((prev) => ({ ...prev, isPiplineLoading: false }));
  };
  // summery graph
  const getInternShipSummeryGraph = async () => {
    setCompanyAdminLoaders((prev) => ({ ...prev, isSummeryLoading: true }));
    await api.get(GET_LIST_INTERNSHIP).then((res: any) => {
      setInternshipsSummeryGraph({
        totalInternships: res?.data?.length ?? 0,
        data: [
          {
            star: res?.data?.length ?? 0,
          },
          {
            name: "Close",
            star:
              res?.data?.filter((obj: any) => obj?.status === "CLOSED")
                ?.length ?? 0,
          },
          {
            name: "Pending",
            star:
              res?.data?.filter((obj: any) => obj?.status === "PENDING")
                ?.length ?? 0,
          },
          {
            name: "Draft",
            star:
              res?.data?.filter((obj: any) => obj?.status === "DRAFT")
                ?.length ?? 0,
          },
          {
            name: "Active",
            star:
              res?.data?.filter((obj: any) => obj?.status === "PUBLISHED")
                ?.length ?? 0,
          },
        ],
      });
    });
    setCompanyAdminLoaders((prev) => ({ ...prev, isSummeryLoading: false }));
    // setIsLoading(false)
  };
  // get company counting card data
  const getCompanyWidgets = async () => {
    setCompanyAdminLoaders((prev: any) => ({ ...prev, isWidgetsLoading: true }));
    await api
      .get(COMPANY_DASHBOARD_WIDGETS)
      .then(({ data }: any) => setCompanyWidgets(data));
    setCompanyAdminLoaders((prev: any) => ({ ...prev, isWidgetsLoading: false }));
  };
  // =============XXXX============= company admin Dashboard functions ==============XXXX================ //

  return {
    currentUser,
    // internships
    getInternShipList,
    internshipsList,
    internshipsSummeryGraph,
    getInternShipSummeryGraph,
    //company dashboard widgets
    getCompanyWidgets,
    companyWidgets,
    // announcement
    isAnnounceShowModal,
    setIsAnnounceShowModal,
    companyAdminLoaders
  };
};

export default useCustomHook;
