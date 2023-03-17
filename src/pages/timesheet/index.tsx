import constants from '../../config/constants';
import CompanyAdmin from './companyAdmin';
import Intern from './intern';

const Index = () => {

    const renderRoleBasedTimeSheet: any = {
        'CompanyAdmin': <CompanyAdmin />,
        'Intern': <Intern />
    }

    return (
        <>
            {renderRoleBasedTimeSheet[constants.USER_ROLE]}
        </>
    )
}

export default Index