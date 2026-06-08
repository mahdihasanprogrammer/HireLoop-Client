"use client";

import { useState } from "react";

import CompanyEmptyState from "@/components/dashboard/company/CompanyEmptyState";
import { createCompany, uploadLogoToImgBB } from "@/lib/actions/companyUtils";
import CompanyForm from "@/components/dashboard/company/CompanyForm";
import CompanyDetails from "@/components/dashboard/company/CompanyDetails";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";

export default function CompanyProfileManager({ recruiter, recruiterCompany }) {

  const [company, setCompany] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);


  const handleLogoUpload = async (e) => {
    // console.log('file', e.target.files)
    const file = e.target.files?.[0];
    console.log('test file', file)

    if (!file) return;

    try {
      setIsUploading(true);

      const url = await uploadLogoToImgBB(file);

      setLogoUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    );


    const companyData = {
      ...data,
      logo: logoUrl,
      status: company?.status === 404 ? 'pending' : company.status,
      recruiterId: recruiter.id,
      recruiterEmail: recruiter.email
    }


    console.log('company', company)

    const result = await createCompany(companyData);
    if (result.insertedId) {
      toast.success("company added successful 🚀", {
        icon: <FaCheckCircle className="text-cyan-400" size={20} />,
        className: 'success-toast '
      });
      e.target.reset()
      setCompany(companyData)
      setIsEditing(false);
      // redirect('/dashboard/recruiter')
    }
  };

  if ( company.status == 404 && !isEditing) {
    return (
      <CompanyEmptyState
        setIsEditing={setIsEditing}
      />
    );
  }

  if (isEditing) {
    return (
      <CompanyForm
        initialData={company}
        onSubmit={handleSubmit}
        onCancel={() => setIsEditing(false)}
        logoUrl={logoUrl}
        handleLogoUpload={handleLogoUpload}
        isUploading={isUploading}
      />
    );
  }

  
  return(
      <CompanyDetails
      company={company}
      onEdit={() => {
        setLogoUrl(company?.logo || "");
        setIsEditing(true);
      }}
    />
  )

 
}