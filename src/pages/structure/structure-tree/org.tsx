import { useEffect } from "react";
import useCustomHook from "../actionHandler";
import constants from "../../../config/constants";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../../store";

export const structureDataFunction = () => {
  const { getStructureData, structureData }: any = useCustomHook();
  useEffect(() => {
    getStructureData()
  }, []);
  const userData = useRecoilValue(currentUserState);

  const formatText = (value: string) => value?.split("_").join(' ').toLowerCase() ?? '';

  const companyStructureDataUpdated: any = {
    "tradingName": structureData?.companyAdmin_Name,
    "title": formatText(structureData?.role),
    'userImg': `${constants.MEDIA_URL}/${structureData?.profileImage?.mediaId}.${structureData?.profileImage?.metaData?.extension}`,
    // 'shortName': shortName(structureData?.companyAdmin_Name),
    "color": "#E96F7C",
    "organizationChildRelationship": structureData?.managers?.map((manager: any) => {
      return (
        {
          "tradingName": manager?.companyManager_Name,
          "title": formatText(manager?.title),
          "color": "#4CA4FD",
          'userImg': `${constants.MEDIA_URL}/${manager?.profileImage?.mediaId}.${manager?.profileImage?.metaData?.extension}`,
          // 'shortName': shortName(manager?.companyAdmin_Name),
          "organizationChildRelationship": manager?.interns.map((intern: any) => ({
            "tradingName": intern?.name,
            "color": "#6AAD8E",
            // 'shortName': shortName(intern?.name),
            'userImg': `${constants.MEDIA_URL}/${intern?.profileImage?.mediaId}.${intern?.profileImage?.metaData?.extension}`,
            "title": formatText(intern?.title)
          }))
        }
      )
    })
  }
  const companyStructureData = (structureData?.companyAdmin_Name && Object.keys(companyStructureDataUpdated).length !== 0) ? companyStructureDataUpdated : {
    "tradingName": `${userData?.firstName} ${userData?.lastName}`,
    "title": userData?.role?.toLowerCase()?.replace("_", " "),
    'userImg': `${constants.MEDIA_URL}/${userData?.profileImage?.mediaId}.${userData?.profileImage?.metaData?.extension}`,
    "color": "#E96F7C",
  }

  return {
    companyStructureData
  }
}

