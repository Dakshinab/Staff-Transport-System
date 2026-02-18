"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, UserCog, Mail, Phone, CreditCard, Truck, Award, Star, Bus } from "lucide-react"
import type { Driver, FieldVerificationStatus } from "@/lib/data"

type FieldName = keyof Driver['fieldVerification'];

export default function DriverReviewPage() {
    const [pendingDrivers, setPendingDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchPendingDrivers();
    }, []);

    async function fetchPendingDrivers() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drivers/pending`);
            if (response.ok) {
                const data = await response.json();
                setPendingDrivers(data);
            }
        } catch (error) {
            console.error("Error fetching pending drivers:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleFieldVerification(driverId: string, fieldName: FieldName, status: 'Approved' | 'Rejected') {
        setProcessing(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drivers/verify-field`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ driverId, fieldName, status })
            });

            if (response.ok) {
                const result = await response.json();
                // Update the driver in the local state
                setPendingDrivers(prev => prev.map(d =>
                    d.id === driverId ? result.driver : d
                ));

                // Show notification ONLY if overall driver status actually changed
                if (result.statusChanged) {
                    if (result.overallReviewStatus === "Approved") {
                        alert(`✅ All fields verified! Driver ${result.driver.name} has been approved and is now Active.`);
                    } else if (result.overallReviewStatus === "Rejected") {
                        alert(`❌ All fields reviewed. Driver ${result.driver.name} has been rejected.`);
                    }
                }
            } else {
                alert(`Failed to verify field`);
            }
        } catch (error) {
            console.error(`Error verifying field:`, error);
            alert(`Error verifying field`);
        } finally {
            setProcessing(false);
        }
    }

    function FieldVerificationButtons({ driverId, fieldName, status }: { driverId: string, fieldName: FieldName, status: FieldVerificationStatus }) {
        if (status === "Approved") {
            return <Badge variant="default" className="bg-green-600">Approved</Badge>;
        }
        if (status === "Rejected") {
            return <Badge variant="destructive">Rejected</Badge>;
        }
        return (
            <div className="flex gap-1">
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs border-green-600 text-green-600 hover:bg-green-50"
                    onClick={() => handleFieldVerification(driverId, fieldName, 'Approved')}
                    disabled={processing}
                >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Accept
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 text-xs border-red-600 text-red-600 hover:bg-red-50"
                    onClick={() => handleFieldVerification(driverId, fieldName, 'Rejected')}
                    disabled={processing}
                >
                    <XCircle className="h-3 w-3 mr-1" />
                    Reject
                </Button>
            </div>
        );
    }

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading pending drivers...</div>;
    }

    if (pendingDrivers.length === 0) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Driver Review</h1>
                <Card>
                    <CardContent className="p-8 text-center text-gray-500">
                        No pending driver registrations to review.
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Driver Review</h1>
                    <p className="text-sm text-gray-500 mt-1">Review and approve driver fields individually</p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                    {pendingDrivers.length} Pending
                </Badge>
            </div>

            <div className="space-y-6">
                {pendingDrivers.map((driver) => {
                    const totalFields = Object.keys(driver.fieldVerification).length;
                    const approvedFields = Object.values(driver.fieldVerification).filter(s => s === "Approved").length;
                    const rejectedFields = Object.values(driver.fieldVerification).filter(s => s === "Rejected").length;

                    return (
                        <Card key={driver.id} className="border-2">
                            <CardHeader className="bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <UserCog className="h-8 w-8 text-indigo-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{driver.name}</CardTitle>
                                            <CardDescription className="text-base">ID: {driver.id}</CardDescription>
                                            <div className="mt-1 flex gap-3 text-sm">
                                                <span>
                                                    <span className="text-green-600 font-medium">{approvedFields}</span>
                                                    <span className="text-gray-400"> / </span>
                                                    <span className="text-gray-600">{totalFields} approved</span>
                                                </span>
                                                {rejectedFields > 0 && (
                                                    <span>
                                                        <span className="text-red-600 font-medium">{rejectedFields}</span>
                                                        <span className="text-gray-400"> / </span>
                                                        <span className="text-gray-600">{totalFields} rejected</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <Tabs defaultValue="personal" className="w-full">
                                    <TabsList className="mb-4">
                                        <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                        <TabsTrigger value="identity">Identity & License</TabsTrigger>
                                        <TabsTrigger value="vehicle">Vehicle Info</TabsTrigger>
                                    </TabsList>

                                    {/* Personal Info Tab */}
                                    <TabsContent value="personal">
                                        <div className="space-y-4">
                                            <div className={`flex items-center justify-between p-3 rounded-lg ${driver.fieldVerification.email === "Approved" ? "bg-green-50 border border-green-200" :
                                                driver.fieldVerification.email === "Rejected" ? "bg-red-50 border border-red-200" :
                                                    "bg-gray-50"
                                                }`}>
                                                <div className="flex items-center gap-3 flex-1">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Email</p>
                                                        <p className="font-medium text-gray-900">{driver.email}</p>
                                                    </div>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="email" status={driver.fieldVerification.email} />
                                            </div>

                                            <div className={`flex items-center justify-between p-3 rounded-lg ${driver.fieldVerification.mobile === "Approved" ? "bg-green-50 border border-green-200" :
                                                driver.fieldVerification.mobile === "Rejected" ? "bg-red-50 border border-red-200" :
                                                    "bg-gray-50"
                                                }`}>
                                                <div className="flex items-center gap-3 flex-1">
                                                    <Phone className="h-4 w-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Mobile</p>
                                                        <p className="font-medium text-gray-900">{driver.mobile}</p>
                                                    </div>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="mobile" status={driver.fieldVerification.mobile} />
                                            </div>

                                            <div className={`flex items-center justify-between p-3 rounded-lg ${driver.fieldVerification.nic === "Approved" ? "bg-green-50 border border-green-200" :
                                                driver.fieldVerification.nic === "Rejected" ? "bg-red-50 border border-red-200" :
                                                    "bg-gray-50"
                                                }`}>
                                                <div className="flex items-center gap-3 flex-1">
                                                    <CreditCard className="h-4 w-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">NIC Number</p>
                                                        <p className="font-medium text-gray-900 font-mono">{driver.nic}</p>
                                                    </div>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="nic" status={driver.fieldVerification.nic} />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Identity & License Tab */}
                                    <TabsContent value="identity">
                                        <div className="space-y-6">
                                            {/* NIC Section */}
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 mb-3">National Identity Card (NIC)</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div className={`aspect-video rounded-lg flex items-center justify-center border border-dashed ${driver.fieldVerification.nicPhotoFront === "Approved" ? "bg-green-50 border-green-300" :
                                                            driver.fieldVerification.nicPhotoFront === "Rejected" ? "bg-red-50 border-red-300" :
                                                                "bg-gray-100 border-gray-300"
                                                            }`}>
                                                            <span className="text-xs text-gray-400">NIC Front Photo</span>
                                                        </div>
                                                        <FieldVerificationButtons driverId={driver.id} fieldName="nicPhotoFront" status={driver.fieldVerification.nicPhotoFront} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className={`aspect-video rounded-lg flex items-center justify-center border border-dashed ${driver.fieldVerification.nicPhotoBack === "Approved" ? "bg-green-50 border-green-300" :
                                                            driver.fieldVerification.nicPhotoBack === "Rejected" ? "bg-red-50 border-red-300" :
                                                                "bg-gray-100 border-gray-300"
                                                            }`}>
                                                            <span className="text-xs text-gray-400">NIC Back Photo</span>
                                                        </div>
                                                        <FieldVerificationButtons driverId={driver.id} fieldName="nicPhotoBack" status={driver.fieldVerification.nicPhotoBack} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-100 my-4"></div>

                                            {/* License Section */}
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900">Driving License</h3>
                                                        <p className="text-xs text-gray-500">Number: {driver.license} | Expires: {driver.licenseExpiry}</p>
                                                    </div>
                                                    <FieldVerificationButtons driverId={driver.id} fieldName="license" status={driver.fieldVerification.license} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div className={`aspect-video rounded-lg flex items-center justify-center border border-dashed ${driver.fieldVerification.licensePhotoFront === "Approved" ? "bg-green-50 border-green-300" :
                                                            driver.fieldVerification.licensePhotoFront === "Rejected" ? "bg-red-50 border-red-300" :
                                                                "bg-gray-100 border-gray-300"
                                                            }`}>
                                                            <span className="text-xs text-gray-400">License Front Photo</span>
                                                        </div>
                                                        <FieldVerificationButtons driverId={driver.id} fieldName="licensePhotoFront" status={driver.fieldVerification.licensePhotoFront} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className={`aspect-video rounded-lg flex items-center justify-center border border-dashed ${driver.fieldVerification.licensePhotoBack === "Approved" ? "bg-green-50 border-green-300" :
                                                            driver.fieldVerification.licensePhotoBack === "Rejected" ? "bg-red-50 border-red-300" :
                                                                "bg-gray-100 border-gray-300"
                                                            }`}>
                                                            <span className="text-xs text-gray-400">License Back Photo</span>
                                                        </div>
                                                        <FieldVerificationButtons driverId={driver.id} fieldName="licensePhotoBack" status={driver.fieldVerification.licensePhotoBack} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* Vehicle Info Tab */}
                                    <TabsContent value="vehicle">
                                        <div className="space-y-4">
                                            <div className={`flex items-center justify-between p-3 rounded-lg ${driver.fieldVerification.vehicleType === "Approved" ? "bg-green-50 border border-green-200" :
                                                driver.fieldVerification.vehicleType === "Rejected" ? "bg-red-50 border border-red-200" :
                                                    "bg-gray-50"
                                                }`}>
                                                <div className="flex items-center gap-3 flex-1">
                                                    <Bus className="h-4 w-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Vehicle Type</p>
                                                        <p className="font-medium text-gray-900">{driver.vehicle.type}</p>
                                                    </div>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="vehicleType" status={driver.fieldVerification.vehicleType} />
                                            </div>

                                            <div className={`flex items-center justify-between p-3 rounded-lg ${driver.fieldVerification.vehicleColor === "Approved" ? "bg-green-50 border border-green-200" :
                                                driver.fieldVerification.vehicleColor === "Rejected" ? "bg-red-50 border border-red-200" :
                                                    "bg-gray-50"
                                                }`}>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500">Color</p>
                                                    <p className="font-medium text-gray-900">{driver.vehicle.color}</p>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="vehicleColor" status={driver.fieldVerification.vehicleColor} />
                                            </div>

                                            <div className={`flex items-center justify-between p-3 rounded-lg ${driver.fieldVerification.vehicleRegNo === "Approved" ? "bg-green-50 border border-green-200" :
                                                driver.fieldVerification.vehicleRegNo === "Rejected" ? "bg-red-50 border border-red-200" :
                                                    "bg-gray-50"
                                                }`}>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500">Registration Number</p>
                                                    <p className="font-medium text-gray-900">{driver.vehicle.regNo}</p>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="vehicleRegNo" status={driver.fieldVerification.vehicleRegNo} />
                                            </div>

                                            <div className={`flex items-center justify-between p-3 rounded-lg ${driver.fieldVerification.vehicleSeats === "Approved" ? "bg-green-50 border border-green-200" :
                                                driver.fieldVerification.vehicleSeats === "Rejected" ? "bg-red-50 border border-red-200" :
                                                    "bg-gray-50"
                                                }`}>
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500">Number of Seats</p>
                                                    <p className="font-medium text-gray-900">{driver.vehicle.seats}</p>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="vehicleSeats" status={driver.fieldVerification.vehicleSeats} />
                                            </div>

                                            <div className={`flex items-center justify-between p-3 rounded-lg border ${driver.fieldVerification.vehicleName === "Approved" ? "bg-green-50 border-green-200" :
                                                driver.fieldVerification.vehicleName === "Rejected" ? "bg-red-50 border-red-200" :
                                                    "bg-blue-50 border-blue-100"
                                                }`}>
                                                <div className="flex-1">
                                                    <p className="text-xs text-blue-600">Assigned Vehicle Name</p>
                                                    <p className="font-medium text-blue-900">{driver.vehicle.name}</p>
                                                </div>
                                                <FieldVerificationButtons driverId={driver.id} fieldName="vehicleName" status={driver.fieldVerification.vehicleName} />
                                            </div>

                                            <div className="border-t border-gray-100 my-4"></div>

                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 mb-3">Vehicle Photos</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div className={`aspect-video rounded-lg flex items-center justify-center border border-dashed ${driver.fieldVerification.vehiclePhotoFront === "Approved" ? "bg-green-50 border-green-300" :
                                                            driver.fieldVerification.vehiclePhotoFront === "Rejected" ? "bg-red-50 border-red-300" :
                                                                "bg-gray-100 border-gray-300"
                                                            }`}>
                                                            <span className="text-xs text-gray-400">Vehicle Front</span>
                                                        </div>
                                                        <FieldVerificationButtons driverId={driver.id} fieldName="vehiclePhotoFront" status={driver.fieldVerification.vehiclePhotoFront} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className={`aspect-video rounded-lg flex items-center justify-center border border-dashed ${driver.fieldVerification.vehiclePhotoBack === "Approved" ? "bg-green-50 border-green-300" :
                                                            driver.fieldVerification.vehiclePhotoBack === "Rejected" ? "bg-red-50 border-red-300" :
                                                                "bg-gray-100 border-gray-300"
                                                            }`}>
                                                            <span className="text-xs text-gray-400">Vehicle Back</span>
                                                        </div>
                                                        <FieldVerificationButtons driverId={driver.id} fieldName="vehiclePhotoBack" status={driver.fieldVerification.vehiclePhotoBack} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
