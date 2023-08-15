import UniversitRep from './UniversityRep'
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";

const Report = () => {
  const role = useRecoilValue(currentUserRoleState);
  const renderWthRole: any = {
    'UNIVERSITY': <UniversitRep />,
  }

  return (renderWthRole[role])
}

export default Report