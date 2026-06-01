"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiBriefcase4Fill } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const navLinks = [
  {
    name: "Browse Jobs",
    href: "/jobs",
  },
  {
    name: "Companies",
    href: "/companies",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B14]/80 backdrop-blur-xl">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-purple-500 shadow-lg">
              <RiBriefcase4Fill className="text-2xl text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Hire<span className="text-violet-500">Loop</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-lg lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-violet-500"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-violet-500" />
                  )}
                </Link>
              );
            })}

            <div className="h-5 w-px bg-white/10" />

            <Link
              href="/signin"
              className={`text-sm font-medium transition-all duration-300 ${
                pathname === "/login"
                  ? "text-violet-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/signup"
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white lg:hidden"
          >
            {isOpen ? (
              <IoClose size={30} />
            ) : (
              <HiMenuAlt3 size={30} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-125 pb-5" : "max-h-0"
          }`}
        >
          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block transition-all duration-300 ${
                    isActive
                      ? "font-medium text-violet-500"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="border-t border-white/10 pt-5">
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className={`block transition-all duration-300 ${
                  pathname === "/login"
                    ? "font-medium text-violet-500"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Sign In
              </Link>
            </div>

            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl bg-white py-3 text-center font-semibold text-black transition-all duration-300 hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}