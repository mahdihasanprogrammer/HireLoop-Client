import { serverFetch } from "../core/server";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


    export const getCompanyJobs = async (companyId, status = 'active') => {

    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&&status=${status}`);
    return res.json();

}

// get all jobs with filtering and search ;
export const getAllJobs = async(search, category, jobType, isRemote)=>{
    return serverFetch(`/api/filtering-jobs?search=${search}&category=${category}&jobType=${jobType}&isRemote=${isRemote}`)
}


export const getSingleJob = async(jobId)=>{
    return serverFetch(`/api/jobs/${jobId}`)
}




