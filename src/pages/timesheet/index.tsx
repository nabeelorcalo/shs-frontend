import { useRecoilValue } from 'recoil';
import { currentUserRoleState } from '../../store';
import CompanyAdmin from './companyAdmin';
import Intern from './intern';
import Manager from './manager';
import constants from '../../config/constants';

const Index = () => {
  const role = useRecoilValue(currentUserRoleState);
  const renderRoleBasedTimeSheet: any = {
    'CompanyAdmin': <CompanyAdmin />,
    'Intern': <Intern />,
    'Manager': <Manager />
  }

  return (
    <>
      {renderRoleBasedTimeSheet[role]}
    </>
  )
}

export default Index