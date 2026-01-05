"use client";

import { BarChart3, Users, FileUser, ClipboardPlus, Layers, ChartArea, DollarSign, Notebook, Settings, Pickaxe } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){
    const pathName = usePathname();

    const navigation = [          
        {name: "Dashboard", href: "/dashboard", icon: BarChart3},
        {name: "Users", href: "/users", icon: Users},
        {name: "Jobs", href: "/jobs", icon: Pickaxe},
        {name: "Applications", href: "/applications", icon: FileUser},
        {name: "Reports", href: "/reports", icon: ClipboardPlus},
        // {name: "Moderation Queue", href: "/", icon: Layers},
        {name: "Analytics", href: "/analytics", icon: ChartArea},
        {name: "Payments", href: "/payments", icon: DollarSign},
        // {name: "Roles & Permissions", href: "/", icon: Notebook},
        // {name: "Settings", href: "/settings", icon: Settings},
    ]

    return <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
        <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
                {/* use the app logo bellow */}
                <BarChart3 className="w-7 h-7"/>
                <span className="text-lg font-semibold">Quick Job</span>
            </div>
        </div>
        <nav className="space-y-1">
            <div className="text-xs font-semibold text-gray-400 uppercase">App Data</div>

            {navigation.map((item, key) => {

                const IconComponent = item.icon;
                const isActive = pathName === item.href;

                return(
                    <Link href={item.href} key={key} className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${isActive ? "bg-green-700 text-gray-800" : "hover:bg-green-600 text-gray-300"}`}>
                        <IconComponent className="w-5 h-5"/>
                        <span>{item.name}</span>               
                    </Link>
                )
            })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-grey-700">
            <div className="flex items-center justify-between">
                {/* displau user profile and their name next to it */}
            </div>
        </div>
    </div>;
}