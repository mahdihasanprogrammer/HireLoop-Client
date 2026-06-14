import { getUserSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayoutPage =async ({children}) => {
    const user = await getUserSession();
    if(!user){
        redirect('/signin')
    }
    if(user?.role !== 'admin'){
        redirect('/unauthorized')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayoutPage;