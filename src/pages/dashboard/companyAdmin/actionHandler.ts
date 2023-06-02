/// <reference path="../../../../jspdf.d.ts" />
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import "jspdf-autotable";
import api from "../../../api";
import apiEndpints from "../../../config/apiEndpoints";
import { announcementDataState } from "../../../store";
import { debounce } from "lodash";
import { Notifications } from "../../../components";

const useCustomHook = () => {
  //get Announcement data from BE side
  const { ANNOUNCEMENT_FINDALL, POST_NEW_ANNOUNCEMENT } = apiEndpints;
  const [announcementData, setAnnouncementDataData] = useRecoilState(
    announcementDataState
  );

  const [loadData, setLoadData] = useState(false);

  const getData = async () => {
    const { data } = await api.get(ANNOUNCEMENT_FINDALL);
    console.log("after post", data);

    setAnnouncementDataData(data);
  };

  // Post announcement data
  const addNewAnnouncement = async (description: string) => {
    const res = await api.post(POST_NEW_ANNOUNCEMENT, {
      description: description,
    });
    console.log(res);

    if (res) {
      await getData();
      Notifications({
        title: "Success",
        description: "Announcement added successfully",
        type: "success",
      });
    }
  };

  //search vehicle
  const changeHandler = async (e: any) => {
    const { data } = await api.get(ANNOUNCEMENT_FINDALL);
    setAnnouncementDataData(data);
  };
  const debouncedResults = useMemo(() => {
    return debounce(changeHandler, 500);
  }, []);

  return {
    getData,
    announcementData,
    changeHandler,
    addNewAnnouncement,
    debouncedResults,
  };
};

export default useCustomHook;
