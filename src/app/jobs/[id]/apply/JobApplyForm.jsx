"use client";

import React from "react";
import { FaCheckCircle, FaPaperPlane, FaUserTie } from "react-icons/fa";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    TextArea,
    Chip,
    Badge
} from "@heroui/react";
import { RiResetRightFill } from "react-icons/ri";
import { toast } from "sonner";
import { submitApplication } from "@/lib/actions/applications";


const JobApplyForm = ({ job, applicant }) => {
    console.log(job, 'job apply')

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());



        const submissionPayload = {
            ...data,
            jobId: job?._id,
            companyName: job?.companyName,
            jobTitle: job?.jobTitle,
            applicantId: applicant?.id,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
        };

        const result = await submitApplication(submissionPayload);
        console.log('result', result)
        if (result.insertedId) {
            toast.success("Application successful 🚀" , {
                icon: <FaCheckCircle className="text-cyan-400" size={20} />,
                className: 'success-toast '
            })

        }


    };

    return (
        // Premium Architectural Block Container
        <div className="max-w-2xl mx-auto bg-content1 border border-divider/60 rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] transition-all duration-300">

            {/* Premium Header Layout with Seeker Badge */}
            <div className="relative pb-6 mb-8 border-b border-divider/40 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="text-xs font-bold  text-primary">
                            Application Gateway
                        </span>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                            {job?.jobTitle || "Executive Role"}
                        </h1>
                        {job?.company && (
                            <p className="text-default-500 font-medium text-sm mt-0.5">{job.company}</p>
                        )}
                    </div>

                    {/* Dynamic Applicant Badge Integration */}
                    {applicant?.name && (
                        <div className="self-start sm:self-center">
                            <Badge
                                content=""
                                color="primary"
                                shape="rectangle"
                                placement="top-right"
                                disableAnimation
                                className="p-0 border-2 border-content1 min-w-2.5 h-2.5"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-default-100 border border-divider text-foreground shadow-sm">
                                    <FaUserTie size={12} className="text-primary" />
                                    <span className="text-xs font-bold tracking-wide">{applicant.name}</span>
                                </div>
                            </Badge>
                        </div>
                    )}
                </div>
            </div>

            {/* Professional Smooth Form */}
            <Form
                className="flex w-full flex-col gap-8"
                onSubmit={onSubmit}
            >

                <div className="space-y-6">

                    {/* Resume Link Input Block with Explicit Borders */}
                    <TextField
                        isRequired
                        name="resumeLink"
                        type="url"
                        labelPlacement="outside"
                        variant="bordered" // Switched to bordered base variant
                        className="w-full group"
                        validate={(value) => {
                            if (!value) return "A valid document location link is required.";
                            try {
                                new URL(value);
                                return null;
                            } catch (_) {
                                return "Please supply a valid URL structure (e.g., https://...)";
                            }
                        }}
                    >
                        <Label className="text-foreground font-semibold text-sm tracking-wider mb-2 block">
                            Secure Resume Link
                        </Label>
                        <Input
                            placeholder="Paste link here..." // Reduced placeholder text
                            classNames={{
                                base: "h-12",
                                mainWrapper: "h-full",
                                // Added structural, permanent border configuration styles
                                inputWrapper: "h-full bg-default-100/40 hover:bg-default-100/80 focus-within:!bg-content1 border-2 border-divider hover:border-default-400 focus-within:!border-primary rounded-xl transition-all duration-200 px-4",
                                input: "text-medium text-foreground placeholder:text-default-400 font-normal",
                            }}
                        />
                        <Description className="text-default-400 text-xs mt-2 italic">
                            Please verify your asset sharing links are set to public before submitting.
                        </Description>
                        <FieldError className="text-danger text-xs font-semibold mt-1.5" />
                    </TextField>

                    {/* Optional Profile Info Section with Matching High-Visibility Borders */}
                    <div className="flex flex-col w-full gap-2">
                        <Label className="text-foreground font-semibold text-sm tracking-wider mb-1">
                            Additional Background Brief <span className="text-default-400 font-normal lowercase italic">(optional)</span>
                        </Label>
                        <TextArea
                            name="additionalInfo"
                            placeholder="Add your notes here..." // Reduced placeholder text
                            variant="bordered"
                            disableAnimation
                            disableAutosize
                            classNames={{
                                inputWrapper: "bg-default-100/40 hover:bg-default-100/80 focus-within:!bg-content1 border-2 border-divider hover:border-default-400 focus-within:!border-primary rounded-xl transition-all duration-200 p-4",
                                input: "resize-y min-h-[120px] text-medium text-foreground placeholder:text-default-400 font-normal",
                            }}
                        />
                    </div>
                </div>

                {/* Footer Interface */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-4 pt-6 border-t border-divider/40">

                    {/* System Sync Confirmation Chip */}
                    <Chip
                        variant="dot"
                        color="success"
                        size="md"
                        className="border-none bg-default-100/60 font-semibold px-3 py-1 text-xs text-default-600"
                    >
                        Hire Loop Synced Profile
                    </Chip>

                    {/* Action Triggers */}
                    <div className="flex gap-3 w-full sm:w-auto justify-end">
                        <Button
                            type="reset"
                            variant="light"
                            color="default"
                            className="flex items-center gap-2 font-medium text-default-500 hover:text-danger hover:bg-danger/10 px-5 transition-all duration-200 rounded-xl"
                        >
                            <RiResetRightFill size={12} />
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            color="primary"
                            className="flex items-center gap-2 font-medium px-7 bg-linear-to-r from-indigo-500 to-purple-500 hover:opacity-95 shadow-lg shadow-primary/20 transition-all transform active:scale-98 rounded-xl"
                        >
                            <FaPaperPlane size={11} />
                            File Application
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default JobApplyForm;