import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Manager from "./Manager/index"
import CompanyAdmin from "./CompanyAdmin/index"

const CaseStudies = () => {
  const role:any = useRecoilValue(currentUserRoleState);
  const rederWthRole: any = {
    'COMPANY_ADMIN': <CompanyAdmin/>,
    'COMPANY_MANAGER': <Manager />,
  }
  return (
    <>
    {rederWthRole[role]}
    </>
  )
}

export default CaseStudies