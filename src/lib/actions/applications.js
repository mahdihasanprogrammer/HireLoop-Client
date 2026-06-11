"use server"
import { serverMutation } from "../core/server"


export const submitApplication = async (submissionData)=>{
    return serverMutation('/api/application', submissionData)
}