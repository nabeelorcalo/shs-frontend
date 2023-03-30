import constants from '../../config/constants';
import CompanyAdmin from './companyAdmin';
import Intern from './intern';
import Manager from './manager';

const Index = () => {

    const renderRoleBasedTimeSheet: any = {
        'CompanyAdmin': <CompanyAdmin />,
        'Intern': <Intern />,
        'Manager': <Manager />
    }

    return (
        <>
            {renderRoleBasedTimeSheet[constants.USER_ROLE]}
        </>
    )
}

export default Index