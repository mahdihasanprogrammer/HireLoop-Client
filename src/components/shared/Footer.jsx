import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaXTwitter,
} from "react-icons/fa6";
import { RiBriefcase4Fill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto container px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-500">
                <RiBriefcase4Fill className="text-2xl text-white" />
              </div>

              <h2 className="text-xl font-bold text-white">
                Hire<span className="text-violet-500">Loop</span>
              </h2>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Connecting talented professionals with leading companies through
              a modern, fast, and reliable hiring experience.
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="rounded-lg bg-white/5 p-3 text-gray-300 transition hover:bg-violet-600 hover:text-white"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="rounded-lg bg-white/5 p-3 text-gray-300 transition hover:bg-violet-600 hover:text-white"
              >
                <FaXTwitter />
              </Link>

              <Link
                href="#"
                className="rounded-lg bg-white/5 p-3 text-gray-300 transition hover:bg-violet-600 hover:text-white"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href="#"
                className="rounded-lg bg-white/5 p-3 text-gray-300 transition hover:bg-violet-600 hover:text-white"
              >
                <FaGithub />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 font-semibold text-violet-500">Product</h3>

            <div className="space-y-4">
              <Link
                href="/jobs"
                className="block text-gray-400 transition hover:text-white"
              >
                Browse Jobs
              </Link>

              <Link
                href="/companies"
                className="block text-gray-400 transition hover:text-white"
              >
                Companies
              </Link>

              <Link
                href="/salary-guide"
                className="block text-gray-400 transition hover:text-white"
              >
                Salary Insights
              </Link>

              <Link
                href="/career-advice"
                className="block text-gray-400 transition hover:text-white"
              >
                Career Resources
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 font-semibold text-violet-500">Navigation</h3>

            <div className="space-y-4">
              <Link
                href="/about"
                className="block text-gray-400 transition hover:text-white"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="block text-gray-400 transition hover:text-white"
              >
                Contact
              </Link>

              <Link
                href="/faq"
                className="block text-gray-400 transition hover:text-white"
              >
                FAQ
              </Link>

              <Link
                href="/support"
                className="block text-gray-400 transition hover:text-white"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 font-semibold text-violet-500">Resources</h3>

            <div className="space-y-4">
              <Link
                href="/blog"
                className="block text-gray-400 transition hover:text-white"
              >
                Blog
              </Link>

              <Link
                href="/privacy-policy"
                className="block text-gray-400 transition hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="block text-gray-400 transition hover:text-white"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/cookies"
                className="block text-gray-400 transition hover:text-white"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} HireLoop. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms
            </Link>

            <span>|</span>

            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>

            <span>|</span>

            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}