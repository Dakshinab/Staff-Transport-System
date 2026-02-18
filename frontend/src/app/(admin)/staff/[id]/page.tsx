"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Building2, IdCard, User } from "lucide-react"
import type { Staff } from "@/lib/data"

export default function StaffProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [staff, setStaff] = useState<Staff | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchStaffProfile(params.id as string);
        }
    }, [params.id]);

    async function fetchStaffProfile(id: string) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff/${id}`);
            if (response.ok) {
                const data = await response.json();
                setStaff(data);
            } else {
                console.error("Staff member not found");
            }
        } catch (error) {
            console.error("Error fetching staff profile:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    }

    if (!staff) {
        return (
            <div className="space-y-6">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Card>
                    <CardContent className="p-8 text-center text-gray-500">
                        Staff member not found
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Staff Directory
                </Button>
                <Badge
                    variant={staff.status === "On a Trip" ? "default" : "secondary"}
                    className={`text-base px-4 py-2 ${staff.status === "On a Trip" ? "bg-blue-600" : ""}`}
                >
                    {staff.status}
                </Badge>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader className="bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                                <User className="h-10 w-10 text-indigo-600" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">{staff.name}</CardTitle>
                                <p className="text-sm text-gray-500 mt-1">Staff ID: {staff.id}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <IdCard className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Employee ID</p>
                                        <p className="font-medium text-gray-900 font-mono">{staff.employeeId}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium text-gray-900">{staff.name}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Company Name</p>
                                        <p className="font-medium text-gray-900">{staff.companyName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="font-medium text-gray-900">{staff.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600 font-medium">Current Status</p>
                                    <p className="text-lg font-semibold text-blue-900 mt-1">{staff.status}</p>
                                </div>
                                <Badge
                                    variant={staff.status === "On a Trip" ? "default" : "secondary"}
                                    className={`text-base px-4 py-2 ${staff.status === "On a Trip" ? "bg-blue-600" : ""}`}
                                >
                                    {staff.status}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
