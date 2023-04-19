import { useRecoilValue } from 'recoil';
import CompanyAdmin from './companyAdmin';
import Intern from './intern';
import Manager from './manager';
import { currentUserRoleState } from '../../store';

const Index = () => {
    const role = useRecoilValue(currentUserRoleState);
    const renderRoleBasedTimeSheet: any = {
        COMPANY_ADMIN: <CompanyAdmin />,
        INTERN: <Intern />,
        COMPANY_MANAGER: <Manager />
    }
    return (
        <>{renderRoleBasedTimeSheet[role]}</>
    )
}
export default Index