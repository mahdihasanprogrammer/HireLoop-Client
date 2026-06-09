

import JobCard from "@/components/dashboard/jobs/JobCard";
import JobFilters from "@/components/dashboard/jobs/JobFilters"; 
import { getAllJobs } from "@/lib/api/jobs";


export default async function JobsPage({ searchParams }) {
  // Await the searchParams object as required by newer Next.js versions
  const resolvedParams = await searchParams;
  console.log('params', resolvedParams)

  // Extract values or default to empty strings
  const search = resolvedParams?.search || "";
  const category = resolvedParams?.category || "";
  const jobType = resolvedParams?.jobType || "";
  const isRemote = resolvedParams?.isRemote || "";



  // Pass filter queries down to your API function
  const allJobs = await getAllJobs(search, category, jobType, isRemote);
  console.log(allJobs, 'allJobs')

  return (
    <section className="p-8 bg-[#0a0a0a] min-h-screen mx-auto flex flex-col gap-6 text-white">
      <div>
        <h1 className="text-3xl font-semibold mb-2">All Jobs</h1>
        <p className="text-sm text-neutral-400">Search and filter active positions instantly.</p>
      </div>

      {/* 1. Add Interactive Filtering Controls Bar */}
      <JobFilters />

      {/* 2. Display Results Grid or Fallback State */}
      {allJobs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-neutral-800 rounded-3xl">
          <p className="text-xl text-neutral-500">No jobs found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}
