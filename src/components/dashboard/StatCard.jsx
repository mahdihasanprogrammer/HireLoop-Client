
import { Card } from "@heroui/react";

// 1. Individual Card Component (Using Hero UI v3 Composable Dot Notation)
export const StatCard = ({ title, value, icon: Icon }) => {
    return (
        <Card className="bg-[#18181b] border border-[#232323] p-6 flex flex-col gap-4 w-full rounded-xl">
            {/* Icon Layout */}
            {Icon && (
                <div className="bg-[#27272a] w-10 h-10 rounded-lg flex items-center justify-center text-gray-300">
                    <Icon className="w-5 h-5" />
                </div>
            )}

            {/* Typography Elements */}
            <Card.Header className="p-0 flex flex-col items-start gap-1">
                <Card.Description className="text-xs text-gray-400 font-medium m-0 p-0">
                    {title}
                </Card.Description>
                <Card.Title className="text-2xl font-bold tracking-tight text-white m-0 p-0">
                    {value}
                </Card.Title>
            </Card.Header>
        </Card>
    );
};

