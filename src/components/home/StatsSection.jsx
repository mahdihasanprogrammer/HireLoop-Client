import {
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineStar,
} from "react-icons/hi2";

const stats = [
  {
    icon: HiOutlineBriefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: HiOutlineBuildingOffice2,
    value: "12K",
    label: "Companies",
  },
  {
    icon: HiOutlineUsers,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: HiOutlineStar,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-15 md:py-24 lg:py-32">
      {/* Globe */}
      <div
        className="absolute inset-0 -top-25 bg-size-[90%]  sm:-top-80 md:-top-90  md:bg-size-[90%] lg:-top-110 bg-top bg-no-repeat sm:bg-size-[100%] lg:bg-size-[70%]"
        style={{
          backgroundImage: "url('/images/globe.png')",
         
        }}
      />

      {/* Blue Glow */}
      <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-[150px]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-lg py-5 ">
            <h2 className="text-center text-xl md:text-2xl  text-white/70 leading-tight">
              Assisting over <span className="text-white/90">15,000 job seekers</span>
              <br />
              find their dream positions.
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 z-80">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-gradient-to-b
                  from-[#0f172a]/95
                  via-[#070b15]/95
                  to-black
                  p-7
                  backdrop-blur-xl
                  shadow-[0_0_40px_rgba(37,99,235,0.12)]
                  transition-all
                  duration-300
                  hover:border-cyan-400/30
                  hover:shadow-[0_0_50px_rgba(34,211,238,0.20)]
                "
              >
                <Icon className="mb-10 text-xl text-white/90" />

                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-3 text-base text-gray-300">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}