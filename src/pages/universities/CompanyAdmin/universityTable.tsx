import { GlobalTable } from '../../../components';

const UniversityTable = (props: any) => {
  const { univertyTableData, UniversityTableColumn } = props
  return (
    <GlobalTable
      columns={UniversityTableColumn}
      pagination
      tableData={univertyTableData}
    />
  )
}

export default UniversityTable