import { Table, Chip, Button } from '@heroui/react';
import Image from 'next/image';
import { BiCodeAlt } from 'react-icons/bi';
import { getApplicationsByApplicantId } from "@/lib/api/applications";
import { getUserSession } from "@/lib/session";

// Helper function to handle status chip colors mimicking the UI design
const getStatusChipProps = (status = "Applied") => {
  switch (status.toLowerCase()) {
    case 'applied':
      return { variant: "flat", className: "border border-gray-600 text-gray-200 bg-zinc-800" };
    case 'review':
      return { variant: "flat", className: "border border-amber-500/50 text-amber-500 bg-amber-950/20" };
    case 'shortlisted':
      return { variant: "flat", className: "border border-emerald-500/50 text-emerald-500 bg-emerald-950/20" };
    case 'rejected':
      return { variant: "flat", className: "border border-rose-500/50 text-rose-500 bg-rose-950/20" };
    case 'offered':
      return { variant: "flat", className: "border border-indigo-400/50 text-indigo-400 bg-indigo-950/20" };
    default:
      return { variant: "flat", className: "border border-gray-600 text-gray-300" };
  }
};

// Simple relative date formatter helper matching timeline aesthetics
const formatRelativeTime = (dateString) => {
  if (!dateString) return "Recent";
  const created = new Date(dateString);
  const now = new Date();
   const diffMs = now - created;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const JobApplicationsPage = async () => {
  const user = await getUserSession();
  const jobs = await getApplicationsByApplicantId(user?.id);

  return (
    <div className="w-full min-h-screen bg-[#121212] text-[#E0E0E0] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Applications</h1>
            <p className="text-sm text-zinc-400 mt-1">
              You have applied to {jobs?.length || 0} job openings
            </p>
          </div>
        </header>

        {/* Hero UI V-3.1.0 Compound Table Architecture */}
        <Table className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-zinc-800/60 shadow-xl">
          <Table.ScrollContainer>
            <Table.Content aria-label="Job applications progress tracking table">
              <Table.Header>
                <Table.Column className="bg-transparent text-zinc-400 font-medium py-4 px-6 border-b border-zinc-800 text-sm">Job Title</Table.Column>
                <Table.Column className="bg-transparent text-zinc-400 font-medium py-4 px-6 border-b border-zinc-800 text-sm">Company</Table.Column>
                <Table.Column className="bg-transparent text-zinc-400 font-medium py-4 px-6 border-b border-zinc-800 text-sm">Applied</Table.Column>
                <Table.Column className="bg-transparent text-zinc-400 font-medium py-4 px-6 border-b border-zinc-800 text-sm">Status</Table.Column>
                <Table.Column className="bg-transparent text-zinc-400 font-medium py-4 px-6 border-b border-zinc-800 text-sm text-right">Action</Table.Column>
              </Table.Header>
              
              <Table.Body>
                {jobs && jobs.length > 0 ? (
                  jobs.map((app) => {
                    const id = app._id?.["$oid"] || app._id;
                    const timestamp = app.createdAt?.["$date"] || app.createdAt;
                    
                    // Fallbacks matching details from your dataset layout
                    const jobTypeString = app.jobTypeInfo || "Full-time • Remote"; 
                    const currentStatus = app.status || "Applied"; 

                    return (
                      <Table.Row key={id} className="border-b border-zinc-800/40 hover:bg-zinc-800/20 transition-colors">
                        
                        {/* Job Title Column + Next.js Image Integration */}
                        <Table.Cell className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-11 h-11 bg-zinc-800/80 rounded-lg border border-zinc-700/40 flex items-center justify-center overflow-hidden shrink-0">
                              {app.companyLogo ? (
                                <Image 
                                  src={app.companyLogo} 
                                  alt={`${app.companyName || 'Company'} logo`}
                                  width={44}
                                  height={44}
                                  className="w-full h-full object-contain p-2"
                                  unoptimized // Used since external images (like ibb.co) require domain configurations in next.config.js
                                />
                              ) : (
                                <BiCodeAlt className="text-xl text-gray-300" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-white text-[15px]">{app.jobTitle || "Untitled Position"}</span>
                              <span className="text-xs text-zinc-500 mt-0.5">{jobTypeString}</span>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Company Name */}
                        <Table.Cell className="py-5 px-6 text-zinc-300 text-[14px]">
                          {app.companyName || "N/A"}
                        </Table.Cell>

                        {/* Applied Time */}
                        <Table.Cell className="py-5 px-6 text-zinc-400 text-[14px]">
                          {formatRelativeTime(timestamp)}
                        </Table.Cell>

                        {/* Status Chip */}
                        <Table.Cell className="py-5 px-6">
                          <Chip 
                            size="sm" 
                            radius="full"
                            {...getStatusChipProps(currentStatus)}
                            className={`px-3 py-1 font-medium text-xs tracking-wide capitalize ${getStatusChipProps(currentStatus).className}`}
                          >
                            {currentStatus}
                          </Chip>
                        </Table.Cell>

                        {/* Action Details Link */}
                        <Table.Cell className="py-5 px-6 text-right">
                          <Button 
                            as="a"
                            href={app.resumeLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="light" 
                            size="sm"
                            className="text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm font-normal"
                          >
                            Details
                          </Button>
                        </Table.Cell>

                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center py-12 text-zinc-500">
                      No applications found. Start applying to open roles!
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer />
        </Table>
      </div>
    </div>
  );
};

export default JobApplicationsPage;