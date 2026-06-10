import React from "react";
import { Card, Avatar } from "@heroui/react";
import { HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineCurrencyDollar } from "react-icons/hi";
import Link from "next/link";


export default function JobCard({ job }) {
  // 1. Dynamic database currency formatting logic
  const minSalaryNum = parseInt(job?.minSalary) || 0;
  const maxSalaryNum = parseInt(job?.maxSalary) || 0;

  const formatSalary = () => {
    if (!job?.minSalary || !job?.maxSalary) return "Not specified";
    const min = minSalaryNum >= 1000 ? `${minSalaryNum / 1000}k` : minSalaryNum;
    const max = maxSalaryNum >= 1000 ? `${maxSalaryNum / 1000}k` : maxSalaryNum;
    const symbol = job?.currency === "USD" ? "$" : job?.currency === "EUR" ? "€" : "$";
    return `${symbol}${min}–${symbol}${max}/month`; 
  };

  return (
    <Card className="max-w-105 bg-[#121212] border border-neutral-800 text-white rounded-3xl p-5 flex flex-col gap-4">
      
      {/* 1. Card Header using correct compound elements */}
      <Card.Header className="flex flex-row items-center gap-3 p-0 bg-transparent">
        <Avatar className="w-12 h-12 bg-white p-1 flex shrink-0 rounded-xl">
          <Avatar.Image src={job?.companyLogo} alt={job?.companyName || "Company Logo"} />
          <Avatar.Fallback text={job?.companyName?.substring(0, 2) || "CO"} />
        </Avatar>
        
        <div className="flex flex-col gap-0.5">
          <Card.Title className="text-sm font-medium text-neutral-400 m-0 p-0 leading-none">
            {job?.companyName || "Unknown Company"}
          </Card.Title>
          <Card.Description className="text-xs text-neutral-500 m-0 p-0">
            {job?.deadline ? `Apply by: ${job.deadline}` : "Active"}
          </Card.Description>
        </div>
      </Card.Header>

      {/* 2. Card Content using correct compound elements */}
      <Card.Content className="flex flex-col gap-4 p-0 bg-transparent">
        <div className="flex flex-col gap-1">
          {/* Main Job Title */}
          <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
            {job?.jobTitle || "Untitled Position"}
          </h2>
          
          {/* Main Job Responsibilities */}
          <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-3">
            {job?.responsibilities || "No description provided."}
          </p>

          {/* Inline Requirements */}
          {job?.requirements && (
            <div className="text-xs text-neutral-400 leading-relaxed mt-1">
              <span className="font-semibold text-neutral-500 mr-1">Requirements:</span>
              {job.requirements}
            </div>
          )}

          {/* Inline Benefits */}
          {job?.benefits && (
            <div className="text-xs text-neutral-400 ">
              <span className="font-semibold text-neutral-500 mr-1">Benefits:</span>
              {job.benefits}
            </div>
          )}
        </div>

        {/* Dynamic Database Pills */}
        <div className="flex flex-wrap gap-2 mt-1">
          {/* Location Badge */}
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-[#e0aaff] text-xs font-medium px-3 py-1.5 rounded-full">
            <HiOutlineLocationMarker className="text-sm" />
            <span>{job?.isRemote ? "Remote" : "On-site"}</span>
          </div>

          {/* Job Type / Workplace Badge */}
          {job?.jobType && (
            <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-[#e0aaff] text-xs font-medium px-3 py-1.5 rounded-full capitalize">
              <HiOutlineBriefcase className="text-sm" />
              <span>{job.jobType}</span>
            </div>
          )}

          {/* Salary Range Badge */}
          <div className="flex items-center gap-1.5 bg-[#1a1a1a] text-[#e0aaff] text-xs font-medium px-3 py-1.5 rounded-full">
            <HiOutlineCurrencyDollar className="text-sm" />
            <span>{formatSalary()}</span>
          </div>
        </div>
      </Card.Content>

      {/* 3. Card Footer using correct compound elements */}
      <Card.Footer className="p-0 bg-transparent justify-start mt-1">
        <Link href={`/jobs/${job._id}`} 
          variant="light" 
          className="text-white font-medium p-0 hover:bg-transparent min-w-0 flex items-center gap-2 group text-sm"
        >
          Apply Now 
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </Card.Footer>

    </Card>
  );
}
