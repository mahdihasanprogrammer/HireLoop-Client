import Link from 'next/link';
import { getSingleJob } from '@/lib/api/jobs';
import {
    HiOutlineBriefcase,
    HiOutlineLocationMarker,
    HiOutlineCalendar,
    HiOutlineCurrencyDollar,
    HiOutlineChevronLeft
} from 'react-icons/hi';

import Image from 'next/image';


const JobDetailPage = async ({ params }) => {
    const { id } = await params;
    const job = await getSingleJob(id);

    if (!job) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#121212] text-neutral-400">
                <div className="w-10 h-10 rounded-full border-2 border-neutral-800 border-t-[#e0aaff] animate-spin mb-4"></div>
                <p className="font-medium text-sm">Fetching job loop details...</p>
            </div>
        );
    }

    // Helper function to split strings into lists
    const parseList = (text) => {
        if (!text) return [];
        return text.split(/[.,]/).map(item => item.trim()).filter(Boolean);
    };

    const responsibilitiesList = parseList(job?.responsibilities);
    const requirementsList = parseList(job?.requirements);
    const benefitsList = parseList(job?.benefits);

    return (
        <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 font-sans text-neutral-300 antialiased">
            <div className="max-w-4xl mx-auto">

                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/jobs"
                        className="text-xs font-medium text-neutral-400 hover:text-[#e0aaff] transition inline-flex items-center gap-1 group"
                    >
                        <HiOutlineChevronLeft className="text-sm transition-transform group-hover:-translate-x-0.5" />
                        Back to Job Loops
                    </Link>
                </div>

                {/* Main Component Card */}
                <div className="bg-[#121212] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">

                    {/* Header Block */}
                    <header className="p-6 sm:p-8 border-b border-neutral-800/60 bg-[#161616]/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-start sm:items-center gap-4.5">
                            {job.companyLogo && (
                                <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl border border-neutral-800 p-2.5 flex items-center justify-center shrink-0">
                                    <Image
                                        src={job.companyLogo}
                                        alt={`${job.companyName} logo`}
                                        width={150}
                                        height={150}
                                        className="max-w-full max-h-full object-contain filter brightness-95"
                                    />
                                </div>
                            )}
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 uppercase tracking-wider border border-neutral-700/50">
                                        {job.jobCategory}
                                    </span>
                                    {job.isRemote && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#e0aaff]/10 text-[#e0aaff] border border-[#e0aaff]/20 tracking-wider uppercase">
                                            Remote
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-xl sm:text-2xl font-semibold text-neutral-100 tracking-tight">{job.jobTitle}</h1>
                                <p className="text-sm text-neutral-400 mt-1">
                                    at <span className="text-neutral-200 font-medium">{job.companyName}</span>
                                    <span className="mx-2 text-neutral-700">•</span>
                                    <span className="capitalize">{job.jobType}</span>
                                </p>
                            </div>
                        </div>

                        {/* Primary Action Button using project accent #e0aaff */}
                        <div className="w-full md:w-auto shrink-0">
                            <Link
                                href={`/jobs/${id}/apply`}
                                className="block w-full text-center bg-[#e0aaff] hover:bg-[#d099ff] text-black font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#e0aaff]/5 transition duration-200 transform active:scale-98"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </header>

                    {/* Meta Info Grid */}
                    <section className="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-800/60 bg-[#161616]/20 text-xs">
                        <div className="p-5 border-r border-b md:border-b-0 border-neutral-800/60 flex flex-col gap-1.5">
                            <span className="font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                                <HiOutlineCurrencyDollar className="text-sm text-neutral-600" /> Salary Range
                            </span>
                            <span className="font-semibold text-neutral-200">
                                {job.minSalary && job.maxSalary
                                    ? `${Number(job.minSalary).toLocaleString()} - ${Number(job.maxSalary).toLocaleString()} ${job.currency}`
                                    : 'Competitive'}
                            </span>
                        </div>
                        <div className="p-5 border-r border-b md:border-b-0 border-neutral-800/60 flex flex-col gap-1.5">
                            <span className="font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                                <HiOutlineBriefcase className="text-sm text-neutral-600" />  Status
                            </span>
                            <span className="inline-self-start font-semibold text-emerald-400 capitalize bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                                {job.status}
                            </span>
                        </div>

                        <div className="p-5 border-r border-neutral-800/60 flex flex-col gap-1.5">
                            <span className="font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                                <HiOutlineCalendar className="text-sm text-neutral-600" /> Deadline
                            </span>
                            <span className="font-semibold text-rose-400">
                                {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="p-5 flex flex-col gap-1.5">
                            <span className="font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                                <HiOutlineLocationMarker className="text-sm text-neutral-600" /> Mode
                            </span>
                            <span className="font-semibold text-neutral-300">
                                {job.isRemote ? 'Work From Anywhere' : 'On-site'}
                            </span>
                        </div>
                    </section>

                    {/* Core Information Details */}
                    <main className="p-6 sm:p-8 space-y-9">

                        {/* Requirements */}
                        {requirementsList.length > 0 && (
                            <section className="bg-[#161616] rounded-2xl p-5 border border-neutral-800/60">
                                <h2 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-3.5 rounded-sm bg-[#e0aaff]"></span>
                                    Requirements & Skills
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-400">
                                    {requirementsList.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-[#e0aaff] font-bold select-none">•</span>
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Responsibilities */}
                        {responsibilitiesList.length > 0 && (
                            <section className="px-2">
                                <h2 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-3.5 rounded-sm bg-[#e0aaff]"></span>
                                    Key Responsibilities
                                </h2>
                                <ul className="space-y-3 text-sm text-neutral-400">
                                    {responsibilitiesList.map((resp, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="w-1 h-1 rounded-full bg-neutral-600 mt-2 flex shrink-0"></span>
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Benefits */}
                        {benefitsList.length > 0 && (
                            <section className="px-2">
                                <h2 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-3.5 rounded-sm bg-[#e0aaff]"></span>
                                    Perks & Benefits
                                </h2>
                                <ul className="space-y-3 text-sm text-neutral-400">
                                    {benefitsList.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="w-1 h-1 rounded-full bg-neutral-600 mt-2 flex shrink-0"></span>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </main>

                    {/* Interactive Bottom Banner CTA */}
                    <footer className="p-6 sm:p-8 bg-linear-to-r from-[#161616] to-[#1a1520] border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider">Ready to apply?</h3>
                            <p className="text-xs text-neutral-500 mt-1">Submit your dynamic profile  directly to {job.companyName}.</p>
                        </div>
                        <Link
                            href={`/jobs/${id}/apply`}
                            className="w-full sm:w-auto text-center bg-[#e0aaff] hover:bg-[#d099ff] text-black font-semibold text-sm px-8 py-3.5 rounded-xl transition duration-200 shrink-0 transform active:scale-98"
                        >
                            Apply Now
                        </Link>
                    </footer>
                </div>

            </div>
        </div>
    );
};

export default JobDetailPage;