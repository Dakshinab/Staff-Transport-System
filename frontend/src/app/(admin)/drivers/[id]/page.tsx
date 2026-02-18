"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, UserCog, Calendar, FileText, Truck, Star, Phone, Mail, Award, CreditCard, Bus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, use } from "react"
import type { Driver } from "@/lib/data"

export default function DriverProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [driver, setDriver] = useState<Driver | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDriver() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setDriver(data);
                } else {
                    setError("Driver not found");
                }
            } catch (err) {
                setError("Failed to fetch driver data");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchDriver();
        }
    }, [id]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    }

    if (error || !driver) {
        return (
            <div className="p-8 text-center bg-red-50 rounded-lg">
                <p className="text-red-600 font-medium font-bold text-xl px-4 py-8 bg-red-50 rounded-lg">
                    {error || "Driver not found"}</p>
                <Link href="/drivers">
                    <Button variant="outline" className="mt-4">Back to Directory</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/drivers">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Driver Profile</h1>
                    <p className="text-sm text-gray-500">View and manage driver details</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Badge variant={driver.status === 'Active' ? 'success' : 'secondary'}>{driver.status}</Badge>
                    <span className="text-sm font-medium text-gray-500 self-center">ID: {driver.id}</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">

                {/* Left Column: Personal Summary */}
                <Card className="md:col-span-1 h-fit">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                        <div className="h-28 w-28 rounded-full bg-slate-100 flex items-center justify-center mb-4 border-2 border-slate-200">
                            <UserCog className="h-14 w-14 text-slate-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{driver.name}</h2>
                        <div className="flex items-center gap-1 mt-1 mb-4 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-lg font-bold text-gray-900">{driver.rating}</span>
                            <span className="text-sm text-gray-500">({driver.tripCount} Trips)</span>
                        </div>

                        <div className="w-full space-y-4 text-left">
                            <div className="pt-4 border-t">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Contact Information</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">{driver.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">{driver.mobile}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Main ID</p>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="font-mono text-xs">{driver.nic}</Badge>
                                    <span className="text-xs text-gray-400">(NIC)</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Detailed Tabs */}
                <div className="md:col-span-2">
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="details">Details & Identity</TabsTrigger>
                            <TabsTrigger value="vehicle">Vehicle Info</TabsTrigger>
                            <TabsTrigger value="performance">Performance</TabsTrigger>
                        </TabsList>

                        {/* Tab: Details & Identity */}
                        <TabsContent value="details">
                            <div className="space-y-6">
                                {/* Identity Documents */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-indigo-500" />
                                            Identity & License
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">

                                        {/* NIC Section */}
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="text-sm font-medium text-gray-900">National Identity Card (NIC)</h3>
                                                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{driver.nic}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                                                    <span className="text-xs text-gray-400">NIC Front Photo</span>
                                                </div>
                                                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                                                    <span className="text-xs text-gray-400">NIC Back Photo</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 my-4"></div>

                                        {/* License Section */}
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">Driving License</h3>
                                                    <p className="text-xs text-gray-500">Expires: {driver.licenseExpiry}</p>
                                                </div>
                                                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{driver.license}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                                                    <span className="text-xs text-gray-400">License Front Photo</span>
                                                </div>
                                                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                                                    <span className="text-xs text-gray-400">License Back Photo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Tab: Vehicle Info */}
                        <TabsContent value="vehicle">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-blue-500" />
                                        Vehicle Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Vehicle Type</p>
                                            <p className="font-medium text-gray-900 flex items-center gap-2">
                                                <Bus className="h-4 w-4 text-gray-400" /> {driver.vehicle.type}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Color</p>
                                            <p className="font-medium text-gray-900">{driver.vehicle.color}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Registration Number</p>
                                            <p className="font-medium text-gray-900">{driver.vehicle.regNo}</p>
                                        </div>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-500">Number of Seats</p>
                                            <p className="font-medium text-gray-900">{driver.vehicle.seats}</p>
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 col-span-2">
                                            <p className="text-xs text-blue-600">Assigned Name</p>
                                            <p className="font-medium text-blue-900">{driver.vehicle.name}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-3">Vehicle Current State Photos</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                                                <span className="text-xs text-gray-400">Vehicle Front</span>
                                            </div>
                                            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                                                <span className="text-xs text-gray-400">Vehicle Back</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab: Performance */}
                        <TabsContent value="performance">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Award className="h-4 w-4 text-yellow-500" />
                                        Driver Performance
                                    </CardTitle>
                                    <CardDescription>Based on recent trip feedbacks</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {driver.feedbacks.map((feedback) => (
                                            <div key={feedback.id} className="border-b last:border-0 pb-4 last:pb-0">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                                                            {feedback.user.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{feedback.user}</p>
                                                            <p className="text-xs text-gray-500">{feedback.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3 w-3 ${i < feedback.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 pl-10">
                                                    "{feedback.comment}"
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

