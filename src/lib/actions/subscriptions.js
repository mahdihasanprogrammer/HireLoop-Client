import { serverMutation } from "../core/server"

export const createSubscriptionInfo = async (subscriptionData)=>{
    return serverMutation(`/api/subscriptions`, subscriptionData)
}