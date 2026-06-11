"use client";

import React, { useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import {
  FaCheckCircle,
  FaUserTie,
  FaBriefcase,
} from "react-icons/fa";

const jobSeekerPlans = [
  {
    name: "Free",
    price: "$0",
    duration: "/forever",
    featured: false,
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    duration: "/month",
    featured: true,
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    name: "Premium",
    price: "$39",
    duration: "/month",
    featured: false,
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
  },
];

const recruiterPlans = [
  {
    name: "Free",
    price: "$0",
    duration: "/forever",
    featured: false,
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Great for a company's first year of hiring",
    ],
  },
  {
    name: "Growth",
    price: "$49",
    duration: "/month",
    featured: true,
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Enterprise",
    price: "$149",
    duration: "/month",
    featured: false,
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
  },
];

const PricingCard = ({ plan }) => {
  return (
    <Card
      className={`h-full border backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-2xl ${
        plan.featured
          ? "border-orange-500/50 bg-zinc-900/80 shadow-orange-500/10 scale-[1.03] ring-1 ring-orange-500/30"
          : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700"
      }`}
    >
      <Card.Header className="flex flex-col items-start gap-4 p-6">
        <div className="flex justify-between items-center w-full">
          <h3 className={`text-2xl font-bold tracking-tight ${plan.featured ? "text-orange-400" : "text-white"}`}>
            {plan.name}
          </h3>

          {plan.featured && (
            <Chip 
              color="primary" 
              className="bg-linear-to-r from-orange-500 to-amber-700 text-white font-semibold border-none shadow-sm text-xs px-3"
            >
              Most Popular
            </Chip>
          )}
        </div>

        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-5xl font-black tracking-tight text-white">{plan.price}</span>
          <span className="text-zinc-400 font-medium text-sm">
            {plan.duration}
          </span>
        </div>
      </Card.Header>

      <Card.Content className="flex-1 px-6 py-4">
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed"
            >
              <FaCheckCircle className={`mt-0.5 shrink-0 text-base ${plan.featured ? "text-orange-400" : "text-emerald-400"}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </Card.Content>

      <Card.Footer className="p-6 pt-2">
        <Button
          fullWidth
          color={plan.featured ? "primary" : "default"}
          variant={plan.featured ? "solid" : "bordered"}
          className={`font-semibold tracking-wide transition-all duration-300 rounded-full py-6 ${
            plan.featured
              ? "bg-linear-to-r from-orange-500 to-amber-600 text-white hover:opacity-90 shadow-lg shadow-orange-500/20"
              : "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          }`}
        >
          Choose Plan
        </Button>
      </Card.Footer>
    </Card>
  );
};

const PricingTab = () => {
  const [selected, setSelected] = useState("jobseekers");

  const plans = selected === "jobseekers" ? jobSeekerPlans : recruiterPlans;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Toggle Tabs */}
      <div className="flex justify-center mb-16">
        <div className="inline-flex bg-zinc-950/60 p-1.5 gap-1 md:gap-1.5 rounded-full border border-zinc-800 backdrop-blur-xl shadow-inner">
          <button
            onClick={() => setSelected("jobseekers")}
            className={`flex items-center gap-1 md:gap-2.5 px-4 py-2 md:px-6  md:py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              selected === "jobseekers"
                ? "bg-linear-to-r from-zinc-800 to-zinc-900 text-white shadow-xl border border-zinc-700/50 scale-[1.01]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FaUserTie className={selected === "jobseekers" ? "text-orange-400" : "text-zinc-400"} />
            For Job Seekers
          </button>

          <button
            onClick={() => setSelected("recruiters")}
            className={`flex items-center gap-1 md:gap-2.5 px-4 py-2 md:px-6  md:py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              selected === "recruiters"
                ? "bg-linear-to-r from-zinc-800 to-zinc-900 text-white shadow-xl border border-zinc-700/50 scale-[1.01]"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FaBriefcase className={selected === "recruiters" ? "text-orange-400" : "text-zinc-400"} />
            For Recruiters
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            plan={plan}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingTab;