import CompanyApprovalTable from "@/components/dashboard/company/CompanyApprovalTable";
import { getAllCompaniesForAdmin } from "@/lib/api/companies";


const AdminCompaniesPage = async () => {
    const companies = await getAllCompaniesForAdmin();
    
    return (
        <div className="min-h-screen bg-[#0d0d0e] p-5 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold text-white tracking-tight">Company Approvals</h1>
                    <p className="text-zinc-500 text-xs">Manage and verify registered organization requests.</p>
                </div>
                
                {/* টেবিল কম্পোনেন্ট */}
                <CompanyApprovalTable companies={companies} />
            </div>
        </div>
    );
};

export default AdminCompaniesPage;