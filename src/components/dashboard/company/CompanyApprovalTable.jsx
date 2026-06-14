"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import Image from "next/image";
import { updateCompany } from "@/lib/actions/companyUtils";

export default function CompanyApprovalTable({ companies }) {

    const handleAdminApproval = async (id)=>{
        const result = await updateCompany(id, {status:'Approved'});
        
    }
    const handleAdminRejected = async (id)=>{
        const result = await updateCompany(id, {status:'Rejected'});

    }
    
    // Status-এর উপর ভিত্তি করে কালার এবং ডট রেন্ডার করার ফাংশন
    const renderStatus = (status) => {
        const normalized = status?.toLowerCase();
        if (normalized === "approved") {
            return (
                <div className="flex items-center gap-2 text-[#4ade80] text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                    Approved
                </div>
            );
        } else if (normalized === "rejected") {
            return (
                <div className="flex items-center gap-2 text-[#f87171] text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
                    Rejected
                </div>
            );
        } else {
            return (
                <div className="flex items-center gap-2 text-[#fbbf24] text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
                    Pending
                </div>
            );
        }
    };

    // ডেট ফরম্যাট করার ফাংশন (e.g., Oct 12, 2023)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    // লোগো না থাকলে নামের প্রথম দুই অক্ষর দিয়ে বিকল্প অ্যাভাটার তৈরির ফাংশন
    const getInitials = (name) => {
        if (!name) return "CO";
        return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    };

    return (
        <div className="w-full bg-[#121214] border border-zinc-900 rounded-xl p-4 shadow-2xl text-white">
            <Table className="w-full">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Company approval management table">
                        <Table.Header>
                            <Table.Column className="text-zinc-400 font-medium text-sm pb-4 border-b border-zinc-800 text-left bg-transparent">Company Name</Table.Column>
                            <Table.Column className="text-zinc-400 font-medium text-sm pb-4 border-b border-zinc-800 text-left bg-transparent">Recruiter Email</Table.Column>
                            <Table.Column className="text-zinc-400 font-medium text-sm pb-4 border-b border-zinc-800 text-left bg-transparent">Industry</Table.Column>
                            <Table.Column className="text-zinc-400 font-medium text-sm pb-4 border-b border-zinc-800 text-left bg-transparent">Status</Table.Column>
                            <Table.Column className="text-zinc-400 font-medium text-sm pb-4 border-b border-zinc-800 text-left bg-transparent">Date Submitted</Table.Column>
                            <Table.Column className="text-zinc-400 font-medium text-sm pb-4 border-b border-zinc-800 text-right bg-transparent">Actions</Table.Column>
                        </Table.Header>
                        
                        <Table.Body>
                            {companies?.map((company) => {
                                const status = company.status?.toLowerCase();
                                return (
            <Table.Row key={company._id?.$oid || company._id} className="border-b border-zinc-900/50 hover:bg-zinc-900/20 transition-colors">
                                        
            {/* Company Name with Dynamic Logo/Avatar */}
                    <Table.Cell className="py-4">
                        <div className="flex items-center gap-2">

                     {company.logo ? (
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1 overflow-hidden">
                            <Image
                                src={company.logo} 
                                alt={`${company.companyName} logo`}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover object-center rounded"
                                onError={(e) => {
                                    // ইমেজ লোড হতে ব্যর্থ হলে টেক্সট অ্যাভাটার দেখাবে
                                    e.target.style.display = 'none';
                                    e.target.parentNode.innerHTML = `<span className="font-bold text-xs text-zinc-300">${getInitials(company.companyName)}</span>`;
                                }}
                            />
                         </div>
                             ) : (
                                 <div className="rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-xs tracking-wider text-zinc-300">
                                     {getInitials(company.companyName)}
                                 </div>
                             )}
                             <span className="font-medium  text-xs text-zinc-200">{company.companyName}</span>
                         </div>
                    </Table.Cell>

                    {/* Recruiter Email */}
                     <Table.Cell className="py-4 text-zinc-400 text-xs">
                         {company.recruiterEmail}
                     </Table.Cell>
                     {/* Industry Badge */}
                     <Table.Cell className="py-4">
                         <span className="px-1 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-400 rounded-full text-xs font-medium">
                             {company.industry}
                         </span>
                     </Table.Cell>
                     {/* Status */}
                     <Table.Cell className="py-4">
                         {renderStatus(company.status)}
                     </Table.Cell>
                     {/* Date Submitted */}
                     <Table.Cell className="py-4 text-zinc-400 text-xs">
                         {formatDate(company.createdAt)}
                     </Table.Cell>
                     {/* Action Buttons */}
                     <Table.Cell className="py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                             {status !== "approved" && (
                                 <Button onClick={()=>{handleAdminApproval(company._id)}}
                                     size="sm"
                                     className="bg-[#14532d]/40 hover:bg-[#14532d]/80 text-[#4ade80] border border-[#166534] rounded-md px-3 h-8 text-xs font-medium transition-all"
                                 >
                                     Approve
                                 </Button>
                             )}
                             {status !== "rejected" && (
                                 <Button 
                                 onClick={()=>{handleAdminRejected(company._id)}}
                                     size="sm"
                                     className="bg-[#7f1d1d]/20 hover:bg-[#7f1d1d]/60 text-[#f87171] border border-[#991b1b]/40 rounded-md px-3 h-8 text-xs font-medium transition-all"
                                 >
                                     Reject
                                 </Button>
                             )}
                         </div>
                     </Table.Cell>

                </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            {/* Pagination UI */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-500">
                <div>
                    Showing <span className="text-zinc-400 font-medium">1-{companies?.length || 0}</span> of <span className="text-zinc-400 font-medium">{companies?.length || 0}</span> companies
                </div>
                <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-600 cursor-not-allowed">&lt;</button>
                    <button className="w-8 h-8 rounded-lg bg-white text-black font-medium flex items-center justify-center">1</button>
                    <button className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center hover:bg-zinc-800 transition-colors">2</button>
                    <button className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center justify-center hover:bg-zinc-800 transition-colors">&gt;</button>
                </div>
            </div>
        </div>
    );
}