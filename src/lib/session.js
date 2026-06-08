import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export const getUserSession = async()=>{
     const session = await auth.api.getSession({
    headers: await headers()
})

return session?.user || null
}