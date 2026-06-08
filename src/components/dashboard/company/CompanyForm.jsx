"use client";

import React, { useState } from "react";
import {
  Form, Fieldset, TextField, Button, Select, ListBox,
  FieldError, Input, Label, TextArea,
} from "@heroui/react";

import { FiUploadCloud, FiX, } from "react-icons/fi";

import { listItemClasses, popoverClasses, selectBoxClass, textInputClass, triggerClasses } from "./companyStyles";
import Image from "next/image";

export default function CompanyForm({
  initialData,
  onSubmit,
  onCancel,
  logoUrl,
  handleLogoUpload,
  isUploading,

}) {

  const [employeeCount, setEmployeeCount] = useState(initialData?.employeeCount)
  
  return (
    <div className="max-w-150 mx-auto bg-[#09090b] border border-[#1e1e21] rounded-xl overflow-hidden shadow-2xl relative">
      {/* Close Button */}
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-5 right-5 text-zinc-500 hover:text-zinc-300 transition"
      >
        <FiX className="text-xl" />
      </button>

      <Form
        onSubmit={onSubmit}
        className="p-8 space-y-6"

      >
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">
            Register New Company
          </h2>

          <p className="text-xs text-zinc-500 mt-0.5">
            Enter your business details to start hiring on HireLoop.
          </p>
        </div>

        <Fieldset className="space-y-5 w-full">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <TextField
              name="companyName"
              isRequired
              defaultValue={initialData?.companyName || ""}
              validate={(value) => {
                if (!value?.trim()) {
                  return "Company name is required";
                }

                if (value.trim().length < 2) {
                  return "Company name must be at least 2 characters";
                }

                return null;
              }}
            >
              <Label className="text-zinc-300 text-xs">
                Company Name
              </Label>

              <Input
                className={textInputClass}
                placeholder="e.g. Acme Corp"
              />

              <FieldError className="text-red-500 text-xs" />
            </TextField>

            {/* Industry */}
            <Select
              isRequired
              className={selectBoxClass}
              name="industry"
               defaultValue={initialData?.industry}
            >
              <label className="text-zinc-300 font-medium text-xs">
                Industry / Category
              </label>

              <Select.Trigger className={triggerClasses}>
                <Select.Value className="text-zinc-200" />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className={popoverClasses}>
                <ListBox className="outline-none">
                  <ListBox.Item
                    id="technology"
                    className={listItemClasses}
                    textValue="Technology"
                  >
                    Technology
                  </ListBox.Item>

                  <ListBox.Item
                    id="design"
                    className={listItemClasses}
                    textValue="Design"
                  >
                    Design
                  </ListBox.Item>

                  <ListBox.Item
                    id="marketing"
                    className={listItemClasses}
                    textValue="Marketing"
                  >
                    Marketing
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
              <FieldError />
            </Select>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Website URL */}
            <TextField
              isRequired
              name="websiteUrl"
              defaultValue={
                initialData?.websiteUrl?.replace(
                  /^https?:\/\//,
                  ""
                ) || ""
              }
              validate={(value) => {
                if (!value.trim()) {
                  return (
                    'Website URL is required'
                  )
                }

                const regex =
                  /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

                if (!regex.test(value)) {
                  return "Enter a valid website";
                }

                return null;
              }}
            >
              <Label className="text-zinc-300 text-xs">
                Website URL
              </Label>

              <Input
                className={textInputClass}
                placeholder="company.com"
              />

              <FieldError className="text-red-500 text-xs" />
            </TextField>

            {/* Location */}
            <TextField
              name="location"
              isRequired
              defaultValue={initialData?.location || ""}
              validate={(value) => {
                if (!value?.trim()) {
                  return "Location is required";
                }

                return null;
              }}
            >
              <Label className="text-zinc-300 text-xs">
                Location
              </Label>

              <Input
                className={textInputClass}
                placeholder="City, Country"
              />

              <FieldError className="text-red-500 text-xs" />
            </TextField>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Employee Count */}
            <Select
              isRequired
              className={selectBoxClass}
              name="employeeCount"
              defaultValue={initialData?.employeeCount}
              selectedKeys={[employeeCount]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0];
                setEmployeeCount(value);
              }}
            >
              <Label className="text-zinc-300 font-medium text-xs">
                Employee Count Range
              </Label>

              <Select.Trigger className={triggerClasses}>
                <Select.Value className="text-zinc-200" />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover className={popoverClasses}>
                <ListBox className="outline-none">
                  <ListBox.Item
                    id="1-10"
                    className={listItemClasses}
                    textValue="1-10 employees"
                  >
                    1-10 employees
                  </ListBox.Item>

                  <ListBox.Item
                    id="11-50"
                    className={listItemClasses}
                    textValue="11-50 employees"
                  >
                    11-50 employees
                  </ListBox.Item>

                  <ListBox.Item
                    id="51-200"
                    className={listItemClasses}
                    textValue="51-200 employees"
                  >
                    51-200 employees
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
              <FieldError />
            </Select>

            {/* Logo Upload */}
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-zinc-300 font-medium text-xs">
                Company Logo
              </span>

              <div className="flex items-center gap-3">
                <label className="w-12 h-12 rounded-lg bg-[#18181b] border border-[#27272a] hover:border-zinc-600 transition flex items-center justify-center text-zinc-400 cursor-pointer overflow-hidden shrink-0">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <FiUploadCloud className="text-lg text-zinc-500" />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>

                <div className="text-left">
                  <p className="text-xs text-zinc-300 font-medium">
                    {isUploading
                      ? "Uploading..."
                      : "Upload image"}
                  </p>

                  <p className="text-[10px] text-zinc-600">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <TextField
              name="description"
              isRequired
              defaultValue={initialData?.description || ""}
              validate={(value) => {
                if (!value?.trim()) {
                  return "Company description is required";
                }

                if (value.trim().length < 20) {
                  return "Description must be at least 20 characters";
                }

                return null;
              }}>
              <Label className="text-zinc-300 font-medium text-xs">
                Brief Description
              </Label>

              <TextArea
                rows={4}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full bg-[#18181b] border border-[#27272a] rounded-lg p-3 text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 resize-none"

              >

              </TextArea>
              <FieldError className="text-red-500 text-xs" />
            </TextField>
          </div>
        </Fieldset>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1e1e21]">
          <Button
            type="button"
           onClick={onCancel}
            className="bg-transparent text-zinc-400 px-4 py-2 rounded-lg text-sm font-medium hover:text-zinc-200 transition"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-white text-black font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-zinc-200 transition"
            disabled={isUploading}
          >
            Register Company
          </Button>
        </div>
      </Form>
    </div>
  );
}