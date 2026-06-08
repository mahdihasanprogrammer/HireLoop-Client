import { Button } from "@heroui/react";
import {
  FiEdit3,
  FiBriefcase,
  FiUsers,
  FiMapPin,
  FiGlobe,
  FiLayers,
} from "react-icons/fi";
import CompanyStatusBadge from "./CompanyStatusBadge";
import Image from "next/image";

export default function CompanyDetails({
  company,
  onEdit,
}) {
  return (
    <div className="max-w-2xl mx-auto my-10 bg-[#09090b] border border-[#1e1e21] rounded-xl text-zinc-100">
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-[#1e1e21] flex justify-between items-start gap-4">
        <div className="flex gap-4">
          {company.logo ? (
            <Image
              src={company.logo}
              alt={company.companyName}
              className="w-14 h-14 rounded-lg object-cover"
              width={80}
              height={80}
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-zinc-900 border border-[#1e1e21] flex items-center justify-center text-zinc-400">
              <FiBriefcase className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1.5">
              <h2 className="text-xl font-bold tracking-tight">
                {company.companyName}
              </h2>
              <CompanyStatusBadge status={company.status} />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
              {company.websiteUrl && (
                <a
                  href={
                    company.websiteUrl.startsWith("http")
                      ? company.websiteUrl
                      : `https://${company.websiteUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <FiGlobe className="w-4 h-4" />
                  {company.websiteUrl}
                </a>
              )}
            </div>
          </div>
        </div>

        <Button 
          onPress={onEdit}
          variant="flat"
          className="bg-zinc-900 border border-[#1e1e21] hover:bg-zinc-800 text-zinc-200 text-sm font-medium"
        >
          <FiEdit3 className="w-4 h-4" />
          Edit Info
        </Button>
      </div>

      {/* DETAILS BODY */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Industry Category */}
        {company.industry && (
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#1e1e21] flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-[#1e1e21] text-zinc-400">
              <FiLayers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Industry</p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5">{company.industry}</p>
            </div>
          </div>
        )}

        {/* Location */}
        {company.location && (
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#1e1e21] flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-[#1e1e21] text-zinc-400">
              <FiMapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Location</p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5">{company.location}</p>
            </div>
          </div>
        )}

        {/* Company Scale */}
        {company.employeeCount && (
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-[#1e1e21] flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-[#1e1e21] text-zinc-400">
              <FiUsers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Scale</p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5">{company.employeeCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
