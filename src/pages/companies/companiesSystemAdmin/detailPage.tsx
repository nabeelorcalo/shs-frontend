import React from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { companySystemAdminState } from '../../../store/companySystemAdmin';

const CompanyDetailPage = () => {
    let params = useParams();
    const companySubAdmin = useRecoilState<any>(companySystemAdminState);
    const recentCompany = companySubAdmin[0].filter((item: any) => item.id == params.id)
    return (
        <p>gfhgfhgf</p>
    )
}

export default CompanyDetailPage