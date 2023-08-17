import { useEffect } from "react";
import useCustomHook from "../actionHandler";
import constants from "../../../config/constants";

export const structureDataFunction = () => {
  const { getStructureData, structureData }: any = useCustomHook();
  useEffect(() => {
    getStructureData()
  }, []);

  const formatText = (value: string) => value?.split("_").join(' ').toLowerCase() ?? '';

  // const shortName = (name: string) => {
  //   const [f,l] = formatText(name)?.split(' ');
  //   return f.charAt(0) + l.charAt(0);
  // };

  const companyStructureData = {
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
  return {
    companyStructureData
  }
}

