import { StatCard } from "./StatCard";



// 2. Responsive Wrapper Grid Component
export default function DashboardStats({ stats = [] }) {
    // Safety check to prevent app crashes if data is missing
    if (!stats || stats.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {stats.map((stat, index) => (
                <StatCard
                    key={stat.id || index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                />
            ))}
        </div>
    );
}
