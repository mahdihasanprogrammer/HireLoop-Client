import { getSingleJob } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { FiAlertTriangle } from 'react-icons/fi';
import { FaCrown, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import JobApplyForm from './JobApplyForm';
import { getApplicationsByApplicantId } from '@/lib/api/applications';
import Link from 'next/link';
import { Chip, Button } from '@heroui/react';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    // নন-সিকারদের জন্য ক্লিন এবং প্রফেশনাল এরর কার্ড
    if (user.role !== 'seeker') {
        return (
            <div className="max-w-xl mx-auto px-6 py-20 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-warning-50 dark:bg-warning-900/20 text-warning flex items-center justify-center mb-6 border border-warning-200 dark:border-warning-800/30 shadow-[0_8px_30px_rgba(251,191,36,0.08)]">
                    <FiAlertTriangle className="w-7 h-7" />
                </div>
                
                {/* ন্যাচারাল টেক্সট স্টাইল (কোনো লেটার স্পেসিং ছাড়া) */}
                <h1 className="text-3xl font-bold text-foreground mb-3">
                    Action Required
                </h1>
                
                <p className="text-default-600 max-w-sm text-sm leading-relaxed mb-6">
                    Only active job seekers can apply for open positions. Your profile is currently registered under the 
                    <span className="font-bold text-warning mx-1 bg-warning-50 dark:bg-warning-900/30 px-2 py-0.5 rounded-md border border-warning-200/50 capitalize text-xs">
                        {user.role}
                    </span> tier.
                </p>
                
                <Link href="/dashboard" passHref legacyBehavior>
                    <Button color="default" variant="flat" className="font-semibold rounded-xl text-xs px-6">
                        Return to Dashboard
                    </Button>
                </Link>
            </div>
        );
    }

    const applications = await getApplicationsByApplicantId(user?.id);
    const plan = {
        name: 'Free', 
        maxApplicationPerMonth: 3
    };

    
    const usageReachedLimit = applications.length >= plan.maxApplicationPerMonth;
    const job = await getSingleJob(id);

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8">
            
            {/* ইনফরমেশন কার্ড কন্টেইনার */}
            <div className={`p-6 rounded-[2.5rem] border transition-all duration-300 ${
                usageReachedLimit 
                ? "bg-danger-50/30 dark:bg-danger-950/5 border-danger-200/50 shadow-[0_20px_40px_rgba(239,68,68,0.04)]" 
                : "bg-content1 border-divider/60 shadow-[0_24px_48px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_24px_48px_-15px_rgba(0,0,0,0.3)]"
            }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className={`mt-0.5 p-2.5 rounded-2xl border transition-colors ${
                            usageReachedLimit 
                            ? "bg-danger-100/50 text-danger border-danger-200/60" 
                            : "bg-primary-50 dark:bg-primary-900/10 text-primary border-primary-200/50"
                        }`}>
                            {usageReachedLimit ? <FaExclamationCircle size={18} /> : <FaCheckCircle size={18} />}
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                {/* ন্যাচারাল টেক্সট (কোনো নেগেটিভ স্পেসিং বা অতিরিক্ত স্টাইল ট্রিকস নেই) */}
                                <h3 className="text-xl font-bold text-foreground">
                                    Monthly Allowance
                                </h3>
                                <Chip 
                                    size="sm" 
                                    variant="flat" 
                                    color="secondary" 
                                    className="font-bold text-xs px-2.5 h-5 border border-secondary-200/30"
                                >
                                    {plan.name} Plan
                                </Chip>
                            </div>
                            
                            <p className="text-sm text-default-500 leading-normal">
                                You have applied to <span className="font-bold text-foreground">{applications.length}</span> out of <span className="font-bold text-foreground">{plan.maxApplicationPerMonth}</span> standard monthly allocations.
                            </p>
                        </div>
                    </div>

                    {/* প্রফেশনাল বাটন এবং ইউনিক গোল্ড ক্রাউন আইকন */}
                    <div className="sm:self-center">
                        <Link href="/pricing">
                            <Button
                                color={usageReachedLimit ? "primary" : "default"}
                                variant={usageReachedLimit ? "solid" : "flat"}
                                size="md"
                                className={`font-semibold rounded-xl text-xs px-5 flex items-center gap-2 transition-all ${
                                    usageReachedLimit 
                                    ? "bg-linear-to-r from-primary to-primary-500 shadow-lg shadow-primary/20" 
                                    : "bg-default-100/80 hover:bg-default-200/60"
                                }`}
                            >
                                {/* গোল্ড স্টাইল প্রফেশনাল ক্রাউন আইকন */}
                                <div className="relative flex items-center justify-center animate-bounce duration-3000">
                                    <FaCrown 
                                        size={14} 
                                        className="text-amber-500 dark:text-amber-400 filter drop-shadow-[0_2px_4px_rgba(245,158,11,0.5)]" 
                                        style={{
                                            backgroundImage: 'linear-linear(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)',
                                            WebkitBackgroundClip: 'text',
                                        }}
                                    />
                                    {/* ব্যাকগ্রাউন্ড গোল্ড গ্লো ইফেক্ট */}
                                    <span className="absolute inset-0 bg-amber-400/20 blur-sm rounded-full scale-150 animate-pulse" />
                                </div>
                                <span className={usageReachedLimit ? "text-white" : "text-default-700 font-bold"}>
                                    {usageReachedLimit ? "Unlock Limit" : "View Plans"}
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* জব অ্যাপ্লিকেশন ফর্ম রেন্ডারিং */}
            {!usageReachedLimit ? (
                <JobApplyForm 
                    job={job}
                    applicant={user}
                />
            ) : (
                <div className="text-center py-12 px-6 border-2 border-dashed border-divider/70 rounded-[2.5rem] bg-content1/40">
                    <p className="text-default-400 text-sm font-medium max-w-xs mx-auto leading-normal">
                        Your application window is locked until your usage limit refreshes.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ApplyPage;