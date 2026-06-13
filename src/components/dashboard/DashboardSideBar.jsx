
import { getUserSession } from "@/lib/session";
import { Bars, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { BiBookmark, BiCreditCard, BiFile, BiSearch, BiSolidDashboard } from "react-icons/bi";
import { GiBigGear } from "react-icons/gi";

export async function DashboardSideBar() {
    const user = await getUserSession()
    const seekerLinks = [
    { icon: BiSolidDashboard, href: '/dashboard/seeker', label: "Dashboard" },
    { icon: BiSearch, href: '/dashboard/seeker/jobs', label: "Jobs" },
    { icon: BiBookmark, href: '/dashboard/seeker/saved', label: "Saved Jobs" },
    { icon: BiFile, href: '/dashboard/seeker/applications', label: "Applications" },
    { icon: BiCreditCard, href: '/dashboard/seeker/billing', label: "Billing" },
    { icon: GiBigGear, href: '/setting', label: "Settings" },
];
    const recruiterLinks = [
        { icon: House, href: '/dashboard/recruiter', label: "Home" },
        { icon: Magnifier, href: '/dashboard/recruiter/jobs', label: "jobs" },
        { icon: Bell, href: '/dashboard/recruiter/jobs/new', label: "Create a job" },
        { icon: Briefcase, href: '/dashboard/recruiter/company', label: "Company Profile" },
        { icon: Envelope, href: '/message',  label: "Messages" },
        { icon: Person,href: '/profile', label: "Profile" },
        { icon: Gear,href: '/setting', label: "Settings" },
    ];

    const navLinksMap = {
        seeker:seekerLinks,
        recruiter:recruiterLinks,
    }

    const navItems = navLinksMap[user?.role];
    const navLinks =
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link  key={item.label}
                href={item?.href}>
                    <button
                      
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                        type="button"
                    >
                        <item.icon className="size-5 text-muted" />
                        {item.label}
                    </button>
                </Link>
            ))}
        </nav>

    return (
        <>
            <aside className="hidden bg-white/1 w-60 min-h-screen 
        border-r border-default p-4 lg:block"
            >{navLinks}</aside>
            <Drawer >
                <Button className="lg:hidden"
                    variant="secondary">
                    <Bars />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navLinks}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}