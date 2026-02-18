"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Users,
    UserCog,
    Map,
    Truck,
    Activity,
    BarChart3,
    Settings,
    LogOut,
    Bus,
    ClipboardCheck,
} from "lucide-react"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Driver Review", href: "/driver-review", icon: ClipboardCheck },
    { name: "Staff Management", href: "/staff", icon: Users },
    { name: "Driver Management", href: "/drivers", icon: UserCog },
    { name: "Routes & Schedules", href: "/routes", icon: Map },
    { name: "Trip Management", href: "/trips", icon: Truck },
    { name: "Live Fleet", href: "/live-fleet", icon: Activity },
    { name: "Reports", href: "/reports", icon: BarChart3 },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
            <div className="flex h-16 items-center border-b border-gray-800 px-6">
                <Bus className="mr-2 h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Transport-Manage</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0",
                                        isActive ? "text-primary-foreground" : "text-gray-400 group-hover:text-white"
                                    )}
                                />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="px-3 py-2">
                <Link
                    href="/admins"
                    className={cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === "/admins"
                            ? "bg-primary text-primary-foreground"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    )}
                >
                    <Users
                        className={cn(
                            "mr-3 h-5 w-5 flex-shrink-0",
                            pathname === "/admins" ? "text-primary-foreground" : "text-gray-400 group-hover:text-white"
                        )}
                    />
                    Admins
                </Link>
            </div>

            <div className="border-t border-gray-800 p-4">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">
                        AD
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-white">Admin User</p>
                        <p className="truncate text-xs text-gray-400">admin@transport.com</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
