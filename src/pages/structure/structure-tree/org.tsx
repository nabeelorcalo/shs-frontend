import { useEffect } from "react";
import useCustomHook from "../actionHandler";

export const structureDataFunction = () => {
  const { getStructureData, structureData }: any = useCustomHook();
  useEffect(() => {
    getStructureData()
  }, []);

  const formatText = (value: string) => value?.split("_").join(' ').toLowerCase() ?? ''

  const companyStructureData = {
    "tradingName": structureData?.companyAdmin_Name,
    "title": formatText(structureData?.role),
    "color": "#E96F7C",
    "organizationChildRelationship": structureData?.managers?.map((manager: any) => {
      return (
        {
          "tradingName": manager?.companyManager_Name,
          "title": formatText(manager?.title),
          "color": "#4CA4FD",
          "organizationChildRelationship": manager?.interns.map((intern: any) => ({
            "tradingName": intern?.name,
            "color": "#6AAD8E",
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

