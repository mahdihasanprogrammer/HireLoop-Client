import { redirect } from 'next/navigation'
import Link from 'next/link'
import { HiCheck, HiArrowRight } from 'react-icons/hi2'

import { stripe } from '@/lib/stripe'
import { createSubscriptionInfo } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {

    const subscriptionInfo = {
      email:customerEmail,
      planId: metadata.planId
    }

    const result = await createSubscriptionInfo(subscriptionInfo)

    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-[#090D16] px-4 py-12">
        {/* Converted to max-w-md with increased height, padding, and vertical spacing */}
        <div className="w-full max-w-md bg-[#111726] border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-105">
          
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-cyan-500 to-indigo-500" />

          {/* Top Content Group */}
          <div className="space-y-6">
            {/* Header Row */}
            <div className="flex items-start gap-4">
              <div className="flex shrink-0 rounded-full bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20 mt-0.5">
                <HiCheck className="w-5 h-5 stroke-2" />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-bold text-slate-100 tracking-tight sm:text-2xl">
                  Payment Successful!
                </h1>
                <p className="text-sm text-slate-400">
                  Your Hireloop account has been upgraded successfully.
                </p>
              </div>
            </div>

            {/* Expanded Data Block */}
            <div className="bg-[#090D16]/90 border border-slate-800/60 rounded-xl p-4 space-y-1.5">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block">
                Access Granted To:
              </span>
              <span className="text-sm font-mono font-medium text-slate-200 break-all block">
                {customerEmail}
              </span>
            </div>

            {/* Utility notice with better line height */}
            <p className="text-xs text-slate-400 leading-relaxed">
              A secure receipt has been dispatched to your email address. For localized billing updates or custom enterprise invoices, contact our support desk at{' '}
              <a href="mailto:orders@example.com" className="text-cyan-400 hover:underline transition-colors">
                orders@example.com
              </a>.
            </p>
          </div>

          {/* Bottom Action Group */}
          <div className="pt-6 mt-6 border-t border-slate-800/40">
            <Link
              href="/"
              className="group w-full flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-indigo-500 to-purple-500  font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/20"
            >
              <span>Enter Workspace</span>
              <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>
      </section>
    )
  }
}