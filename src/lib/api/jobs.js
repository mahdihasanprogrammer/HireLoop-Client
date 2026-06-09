import { serverFetch } from "../core/server";


    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    export const getCompanyJobs = async (companyId, status = 'active') => {

    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&&status=${status}`);
    return res.json();

}

export const getAllJobs = async(search, category, jobType, isRemote)=>{
    console.log({search, category, jobType, isRemote})
    return serverFetch(`/api/filtering-jobs?search=${search}&category=${category}&jobType=${jobType}&isRemote=${isRemote}`)
}


