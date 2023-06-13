import React, { useEffect } from 'react'
import useCustomHook from '../actionHandler';
import Structure from '../Common/structure'

const CompanyAdminStructure = () => {
  const { getStructureData, structureData } = useCustomHook();
  useEffect(() => {
    getStructureData()
  }, [])

  return (
    <div>
      <Structure structureData={structureData} />
    </div>
  )
}
export default CompanyAdminStructure