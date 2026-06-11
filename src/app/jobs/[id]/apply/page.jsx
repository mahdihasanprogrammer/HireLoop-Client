import { getSingleJob } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { FiAlertTriangle } from 'react-icons/fi'; // Import the warning icon
import JobApplyForm from './JobApplyForm';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                    <FiAlertTriangle className="w-6 h-6" />
                </div>
                
                <h1 className="text-2xl font-bold tracking-tight mb-2">
                    Action Required
                </h1>
                
                <p className="text-gray-600 max-w-md">
                    Only job seekers can apply for positions. You are currently logged in as a <span className="font-semibold text-amber-700 capitalize">{user.role}</span>.
                </p>
            </div>
        );
    }

    const job = await getSingleJob(id);

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold tracking-tight mb-6">Apply Now, Welcome!</h1>

            {/* Form component goes here */}
            <JobApplyForm 
            job={job}
            applicant={user}/>
        </div>
    );
};

export default ApplyPage;