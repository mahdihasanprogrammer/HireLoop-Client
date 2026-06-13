import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";


const RecruiterLayout =async ({children}) => {
    const user =await getUserSession();
    if(user?.role !== 'recruiter'){
        redirect('/unauthorized')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default RecruiterLayout;