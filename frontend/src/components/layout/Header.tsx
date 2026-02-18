"use client"

import * as React from "react"
import { Bell, Search, User, Settings, LogOut, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock notifications data
const mockNotifications = [
    { id: 1, message: "New driver John Doe has been assigned to Route 5", time: "5 min ago", unread: true },
    { id: 2, message: "Vehicle maintenance scheduled for tomorrow", time: "1 hour ago", unread: true },
    { id: 3, message: "Staff member Sarah requested leave", time: "2 hours ago", unread: false },
    { id: 4, message: "Route 3 completed successfully", time: "3 hours ago", unread: false },
]

export function Header() {
    const router = useRouter()
    const [showProfileDropdown, setShowProfileDropdown] = React.useState(false)
    const [showNotifications, setShowNotifications] = React.useState(false)
    const profileRef = React.useRef<HTMLDivElement>(null)
    const notificationsRef = React.useRef<HTMLDivElement>(null)

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfileDropdown(false)
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close one panel when opening another
    const handleProfileClick = () => {
        setShowNotifications(false)
        setShowProfileDropdown(!showProfileDropdown)
    }

    const handleNotificationsClick = () => {
        setShowProfileDropdown(false)
        setShowNotifications(!showNotifications)
    }

    const handleLogout = () => {
        router.push("/login")
    }

    const unreadCount = mockNotifications.filter(n => n.unread).length

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
            <div className="flex items-center md:w-1/3">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Search staff, drivers, routes..."
                        className="w-full bg-gray-50 pl-9 focus-visible:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
                        onClick={handleNotificationsClick}
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </Button>

                    {/* Notifications Panel */}
                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-80 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
                                <div className="border-b border-gray-100 px-4 py-3">
                                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {mockNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={cn(
                                                "border-b border-gray-50 px-4 py-3 transition-colors hover:bg-gray-50 cursor-pointer",
                                                notification.unread && "bg-blue-50/50"
                                            )}
                                        >
                                            <p className="text-sm text-gray-700">{notification.message}</p>
                                            <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 px-4 py-2 text-center">
                                    <button className="text-xs font-medium text-primary hover:underline">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-gray-200" />

                {/* Profile & Admin User Section */}
                <div className="relative" ref={profileRef}>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={handleProfileClick}
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-sm">
                            AD
                        </div>
                        <div className="hidden md:block text-left">
                            <div className="text-sm font-semibold text-gray-900">Admin User</div>
                            <div className="text-xs text-gray-500">admin@transport.com</div>
                        </div>
                        <ChevronDown className={cn(
                            "h-4 w-4 text-gray-500 transition-transform duration-200",
                            showProfileDropdown && "rotate-180"
                        )} />
                    </Button>

                    {/* Profile Dropdown */}
                    {showProfileDropdown && (
                        <div className="absolute right-0 top-12 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="rounded-lg border border-gray-200 bg-white shadow-lg">
                                <div className="border-b border-gray-100 px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-lg shadow-md">
                                            AD
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-gray-900">Admin User</div>
                                            <div className="text-xs text-gray-500">admin@transport.com</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <Link href="/profile">
                                        <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span>My Profile</span>
                                        </button>
                                    </Link>
                                    <Link href="/settings">
                                        <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                            <Settings className="h-4 w-4 text-gray-500" />
                                            <span>Settings</span>
                                        </button>
                                    </Link>
                                </div>
                                <div className="border-t border-gray-100 py-2">
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
