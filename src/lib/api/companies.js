import { serverFetch } from "../core/server"

export const getRecruiterCompany = async(recruiterId) =>{
    return  serverFetch(`/api/my-companies?recruiterId=${recruiterId}`)
}

export const getAllCompaniesForAdmin = async()=>{
    return serverFetch(`/api/companies`)
}