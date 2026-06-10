"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  Label,
  ListBox,
  InputGroup,
  TextField,
  Button,
} from "@heroui/react";
import {
  HiOutlineBriefcase,
  HiOutlineChevronDown,
  HiOutlineLocationMarker,
  HiOutlineSearch,
} from "react-icons/hi";

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current URL states safely so fields do not reset on page change
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [jobType, setJobType] = useState(searchParams.get("jobType") || "all");
  
  // Explicitly check for null or empty string to ensure 'all' is selected initially
  const [isRemote, setIsRemote] = useState(() => {
    const param = searchParams.get("isRemote");
    return param !== null && param !== "" ? param : "all";
  });

  
  // Categories from your PostJobForm dropdown list
  const categoryOptions = [
    { id: "all", label: "All Categories" },
    { id: "technology", label: "Technology" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Marketing" },
    { id: "sales", label: "Sales" },
  ];

  // Dynamic Job Type map configuration options
  const jobTypeOptions = [
    { id: "all", label: "All Types" },
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "internship", label: "Internship" },
  ];

  // Work Mode option mapping configuration
  const workModeOptions = [
    { id: "all", label: "All Modes" },
    { id: "true", label: "Remote" },
    { id: "false", label: "On-site" },
  ];

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (jobType !== "all") params.set("jobType", jobType);
    if (isRemote !== "all") params.set("isRemote", isRemote);

    // 1. Send active parameters to URL to execute the data filter fetch
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full bg-[#121212] border border-neutral-800 rounded-3xl p-5 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* 1. Search Bar */}
        <div className="w-full">
          <TextField value={search} onChange={(value) => setSearch(value)}>
            <Label className="text-xs font-medium text-neutral-400 mb-1.5 block">
              Search Jobs
            </Label>
            <InputGroup className="bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 h-10.5 flex items-center gap-2 focus-within:border-neutral-700 transition">
              <InputGroup.Prefix>
                <HiOutlineSearch className="text-neutral-500 text-lg" />
              </InputGroup.Prefix>
              <InputGroup.Input
                placeholder="Title or company..."
                className="bg-transparent text-sm text-neutral-100 placeholder-neutral-600 outline-none w-full"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* 2. Category Filter */}
        <Select
        
          defaultValue={category}
          onChange={(key) => setCategory(key)}
        >
          <Label className="text-xs font-medium text-neutral-400 mb-1.5 block">
            Category
          </Label>
          <Select.Trigger className="bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 h-10.5 flex items-center justify-between text-sm text-neutral-300 w-full">
            <div className="flex items-center gap-2">
              <HiOutlineChevronDown className="text-neutral-500" />
              <Select.Value placeholder="All Categories" />
            </div>
            <Select.Indicator className="text-neutral-500 text-xs">
              ▼
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#1a1a1a] border border-neutral-800 rounded-xl mt-1 overflow-hidden shadow-xl z-50">
            <ListBox className="p-1">
              {categoryOptions.map((opt) => (
                <ListBox.Item
                  key={opt.id}
                  id={opt.id}
                  textValue={opt.label}
                  className="p-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer"
                >
                  <Label>{opt.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* 3. Job Type Filter */}
        <Select
          defaultValue={jobType}
          onChange={(key) => setJobType(key)}
        >
          <Label className="text-xs font-medium text-neutral-400 mb-1.5 block">
            Job Type
          </Label>
          <Select.Trigger className="bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 h-10.5 flex items-center justify-between text-sm text-neutral-300 w-full">
            <div className="flex items-center gap-2">
              <HiOutlineBriefcase className="text-neutral-500" />
              <Select.Value placeholder="All Types" />
            </div>
            <Select.Indicator className="text-neutral-500 text-xs">
              ▼
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#1a1a1a] border border-neutral-800 rounded-xl mt-1 overflow-hidden shadow-xl z-50">
            <ListBox className="p-1">
              {jobTypeOptions.map((opt) => (
                <ListBox.Item
                  key={opt.id}
                  id={opt.id}
                  textValue={opt.label}
                  className="p-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer"
                >
                  <Label>{opt.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* 4. Work Mode Filter */}
        <Select
          defaultValue={isRemote}
          onChange={(key) => setIsRemote(key)}
        >
          <Label className="text-xs font-medium text-neutral-400 mb-1.5 block">
            Work Mode
          </Label>
          <Select.Trigger className="bg-[#1a1a1a] border border-neutral-800 rounded-xl px-3 h-10.5 flex items-center justify-between text-sm text-neutral-300 w-full">
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-neutral-500" />
              <Select.Value placeholder="All Modes" />
            </div>
            <Select.Indicator className="text-neutral-500 text-xs">
              ▼
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#1a1a1a] border border-neutral-800 rounded-xl mt-1 overflow-hidden shadow-xl z-50">
            <ListBox className="p-1">
              {workModeOptions.map((opt) => (
                <ListBox.Item
                  key={opt.id}
                  id={opt.id}
                  textValue={opt.label}
                  className="p-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer"
                >
                  <Label>{opt.label}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* 5. Filter Submission Action Button */}
        <Button
          onClick={handleApplyFilters}
          className="w-full bg-[#e0aaff] text-black font-semibold text-sm rounded-xl h-10.5 transition hover:bg-[#d099ff]"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}