"use client"
import DashboardStats from "@/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";
import { Briefcase, CircleCheck, Persons, Thunderbolt } from "@gravity-ui/icons";


const RecruiterDashboardHomePage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log('user', user)

    if (isPending) {
        return <div> loading...</div>
    }

    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];

    return (
        <div className="p-4">
            <h2 className="text-3xl font-medium mb-6">
                Welcome back, {user?.name}
            </h2>

            <DashboardStats stats= {recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;