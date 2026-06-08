
import { getUserSession } from '@/lib/session';
import CompanyProfileManager from './CompanyProfileManager';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyProfileManagerPage = async() => {
    const user = await getUserSession();
   
    const recruiterCompany = await getRecruiterCompany(user?.id)
    console.log('recruiter', recruiterCompany)
   
    
    return (
        <div>
            <CompanyProfileManager recruiterCompany={recruiterCompany} recruiter={user}/>
        </div>
    );
};

export default CompanyProfileManagerPage;