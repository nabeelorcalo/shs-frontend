import { GlobalTable } from '../../../components'
import DropDownNew from '../../../components/Dropdown/DropDownNew'
// import { useNavigate } from 'react-router'
import { ThreeDots } from '../../../assets/images'
import { NavLink } from 'react-router-dom'
import { ROUTES_CONSTANTS } from '../../../config/constants'
import dayjs from 'dayjs'
const UniversityTable = (props: any) => {
  const {univertyTableData,UniversityTableColumn}=props
  return (
    <GlobalTable
      columns={UniversityTableColumn}
      pagination
      tableData={univertyTableData}
    />
  )
}

export default UniversityTable