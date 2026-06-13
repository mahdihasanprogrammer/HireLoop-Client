import { getUserSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

const JobSeekerLayout =async () => {
    const user = await getUserSession();
    if(user?.role !== 'seeker'){
        redirect('/')
    }
    return (
        <div>
            
        </div>
    );
};

export default JobSeekerLayout;