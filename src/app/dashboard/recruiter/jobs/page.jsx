import { getRecruiterCompany } from "@/lib/api/companies";
import { getCompanyJobs } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/session";
import { Chip, Table, Button } from "@heroui/react";
import Link from "next/link";
import { FiEye, FiEdit2, FiTrash2, FiEdit } from "react-icons/fi";

const RecruiterJobsPage = async () => {
  const user = await getUserSession();
  const company = await getRecruiterCompany(user?.id)
  const result = await getCompanyJobs(company?._id);
  console.log('result', result)


  // Safeguard if data structure is wrapped or null
  const jobs = Array.isArray(result) ? result : result?.data || [];

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-5">
          <FiEdit2 className="w-10 h-10 text-zinc-400" />
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          No Jobs Posted Yet
        </h2>

        <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          You havent published any job listings yet. Start hiring by creating
          your first job posting.
        </p>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-zinc-900 shadow-lg shadow-zinc-900/10 transition-all duration-200 hover:scale-[1.02] dark:bg-zinc-100"
        >
          <FiEdit2 className="h-4 w-4" />
          Post Your First Job
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Manage All Jobs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          View, update, and manage your current job postings.
        </p>
      </div>

      {/* 1. MOBILE VIEW: Card list shown only on screens smaller than md (768px) */}
      <div className="block md:hidden space-y-4">

        {jobs.map((job) => {
          const jobId = job._id?.$oid || job._id;
          const isStatusActive = job.status === "active";

          return (
            <div
              key={jobId}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl space-y-3 shadow-sm"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 text-base">
                    {job.jobTitle}
                  </h3>
                  <span className="text-xs text-slate-400 capitalize bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {job.jobCategory}
                  </span>
                </div>
                <Chip
                  color={isStatusActive ? "success" : "danger"}
                  size="sm"
                  variant="soft"
                  className="capitalize shrink-0"
                >
                  {job.status}
                </Chip>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-100 dark:border-zinc-800 pt-3">
                <div>
                  <span className="text-slate-400 block">Type / Location</span>
                  <span className="text-slate-700 dark:text-slate-300 capitalize font-medium">
                    {job.jobType} • {job.isRemote ? "Remote" : job.location}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Salary Range</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">
                    {parseInt(job.minSalary).toLocaleString()}-{parseInt(job.maxSalary).toLocaleString()} {job.currency}
                  </span>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-zinc-800 pt-2 w-full">
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  aria-label="View details"
                  className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                >
                  <FiEye className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  aria-label="Edit job"
                  className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                >
                  <FiEdit2 className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  aria-label="Delete job"
                  className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                >
                  <FiTrash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}

      </div>

      {/* 2. DESKTOP VIEW: Full resizable table shown on screens md (768px) and larger */}
      <div className="hidden md:block border border-slate-200 dark:border-zinc-800 rounded-xl overflow-hidden">

        <Table aria-label="Jobs management table">
          <Table.ResizableContainer>
            <Table.Content className="min-w-200">
              <Table.Header>
                <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={200}>
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="typeLocation" minWidth={150}>
                  Type / Location
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.5fr" id="salary" minWidth={160}>
                  Salary Range
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="actions" minWidth={120}>
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent={"No jobs found."}>
                {jobs.map((job) => {
                  const jobId = job._id?.$oid || job._id;
                  const isStatusActive = job.status === "active";

                  return (
                    <Table.Row key={jobId}>
                      {/* Job Title */}
                      <Table.Cell>
                        <div className="font-medium text-slate-900 dark:text-slate-200">
                          {job.jobTitle}
                        </div>
                        <div className="text-xs text-slate-400 capitalize">
                          {job.jobCategory}
                        </div>
                      </Table.Cell>

                      {/* Type & Location */}
                      <Table.Cell>
                        <div className="text-sm text-slate-700 dark:text-slate-300 capitalize">
                          {job.jobType}
                        </div>
                        <div className="text-xs text-slate-400">
                          {job.isRemote ? "Remote" : job.location}
                        </div>
                      </Table.Cell>

                      {/* Salary */}
                      <Table.Cell className="text-sm text-slate-700 dark:text-slate-300 font-mono">
                        {parseInt(job.minSalary).toLocaleString()} - {parseInt(job.maxSalary).toLocaleString()} {job.currency}
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <Chip
                          color={isStatusActive ? "success" : "danger"}
                          size="sm"
                          variant="soft"
                          className="capitalize"
                        >
                          {job.status}
                        </Chip>
                      </Table.Cell>

                      {/* Action Buttons */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="View details"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4 text-slate-500 hover:text-blue-500 transition-colors" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Edit job"
                            title="Edit Job"
                          >
                            <FiEdit className="w-4 h-4 text-slate-500 hover:text-amber-500 transition-colors" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Delete job"
                            title="Delete Job"
                          >
                            <FiTrash2 className="w-4 h-4 text-slate-500 hover:text-red-500 transition-colors" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
};

export default RecruiterJobsPage;
