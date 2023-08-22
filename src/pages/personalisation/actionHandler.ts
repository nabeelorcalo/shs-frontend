import { useState } from "react";
import { useRecoilState } from "recoil";
import apiEndPoints from "../../config/apiEndpoints";
import api from "../../api";
import { IconPColorState, IconSColorState, imageState, isLoadingState, sbColorState } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingState);
  const [sbColor, setSBColor] = useRecoilState<any>(sbColorState);
  const [pIconsColor, setPIconsColor] = useRecoilState<any>(IconPColorState);
  const [sIconsColor, setSIconsColor] = useRecoilState<any>(IconSColorState);
  const [themeLogo, setThemeLogo] = useRecoilState<any>(imageState);
  const { PACTH_PERSONALIZATION } = apiEndPoints;

  // media upload
  const formData = new FormData();
  // custom header for "multipart/form-data"
  let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

  const personalizePatch = async ({ logo, ...payload }: any, isRest?: boolean) => {
    console.log("logo", logo);
    console.log("payload", payload);
    try {
      setIsLoading(true)
      let url: string = "";
      if (!isRest && logo) {
        formData.append('file', logo);
        const { data } = await api.post(apiEndPoints.MEDIA_UPLOAD, formData, headerConfig)
        url = data?.url
      }
      console.log("url", url);

      await api.patch(PACTH_PERSONALIZATION, isRest ? payload : url ? { logo: url, ...payload } : payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      ).then((res: any) => {
        console.log(res);
        // setPColor(payload?.buttonPrimaryColor)
        // setSColor(payload?.buttonSecondaryColor)
        setSBColor(payload?.sideMenuColor)
        // setPIconsColor(payload?.sideMenuIconPrimaryColor)
        // setSIconsColor(payload?.sideMenuIconSecondaryColor)
        setThemeLogo(url)
      });
      setIsLoading(false)
    } catch (error) {
      console.log(error, "error");
    }

  };

  const handlePatchRequest = async (payload:any) => {
    const response = await api.patch(PACTH_PERSONALIZATION, payload, {headers: {'Content-Type': 'multipart/form-data'}})
    return response;
  }

  return {
    handlePatchRequest,
    isLoading,
    personalizePatch,
    sIconsColor,
    pIconsColor,
    sbColor,
    themeLogo,
    setPIconsColor,
    setSIconsColor,
  };
};

export default useCustomHook;