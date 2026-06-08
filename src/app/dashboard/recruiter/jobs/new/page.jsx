import React from 'react';
import PostJobForm from './PostJobForm';
import { getUserSession } from '@/lib/session';
import { getRecruiterCompany } from '@/lib/api/companies';

const PostJobPage = async () => {

    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id)
    return (
        <div>
            <PostJobForm company={company}/>
        </div>
    );
};

export default PostJobPage;