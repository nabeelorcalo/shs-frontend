import { useEffect } from "react";
import useCustomHook from "../actionHandler";
import constants from "../../../config/constants";

export const structureDataFunction = () => {
  const { getStructureData, structureData }: any = useCustomHook();
  useEffect(() => {
    getStructureData()
  }, []);

  const formatText = (value: string) => value?.split("_").join(' ').toLowerCase() ?? '';

  const profileImage = (profile: any) => `${constants.MEDIA_URL}/${profile?.profileImage?.mediaId}.${profile?.profileImage?.metaData?.extension}`

  const companyStructureData = {
    "tradingName": structureData?.companyAdmin_Name,
    "title": formatText(structureData?.role),
    'userImg': profileImage(structureData),
    "color": "#E96F7C",
    "organizationChildRelationship": structureData?.managers?.map((manager: any) => {
      return (
        {
          "tradingName": manager?.companyManager_Name,
          "title": formatText(manager?.title),
          "color": "#4CA4FD",
          'userImg': profileImage(manager),
          "organizationChildRelationship": manager?.interns.map((intern: any) => ({
            "tradingName": intern?.name,
            "color": "#6AAD8E",
            'userImg': profileImage(intern),
            "title": formatText(intern?.title)
          }))
        }
      )
    })
  }
  return {
    companyStructureData
  }
}

