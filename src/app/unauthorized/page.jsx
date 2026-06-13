import Link from 'next/link';
import { Button } from '@heroui/react';
import { BiLockAlt, BiArrowBack, BiHomeAlt } from 'react-icons/bi';

const UnauthorizedPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#121212] text-[#E0E0E0] flex flex-col items-center justify-center py-10 px-5 md:p-6 font-sans">
      <div className="max-w-md text-center flex flex-col items-center">
        
        {/* Lock Icon with bounce animation */}
        <div className="w-24 h-24 bg-zinc-800/50 text-rose-500 rounded-full flex items-center justify-center border border-zinc-700/50 shadow-xl mb-6 animate-bounce">
          <BiLockAlt className="text-5xl" />
        </div>

        {/* Error Code & Title */}
        <span className="text-base font-semibold tracking-widest text-rose-500 uppercase px-3 py-1 bg-rose-950/30 border border-rose-500/30 rounded-full mb-4">
          401 Error
        </span>
        <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
          Access Denied
        </h1>
        
        {/* Description Message */}
        <p className="mt-4 text-zinc-400 text-[15px] leading-relaxed">
          Sorry, you do not have the required permissions to view this page. Please log in with the correct account or return to the home page.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
          
          {/* Button to navigate to Login page */}
        <Link  href="/login">
          <Button
            className="bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors shadow-lg px-6"
            startContent={<BiArrowBack className="text-lg" />}
          >
            Login Again
          </Button>
          </Link>

          {/* Button to navigate to Home page */}
         <Link href="/">
          <Button
            variant="bordered"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-all px-6"
            startContent={<BiHomeAlt className="text-lg" />}
          >
            Back to Home
          </Button>

         </Link>
        </div>

        {/* Additional Help Text */}
        <p className="mt-12 text-xs text-zinc-600">
          If you think this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;