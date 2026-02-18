"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Plus } from "lucide-react"

export default function CreateRoutePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/routes">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create New Route</h1>
                    <p className="text-sm text-gray-500">Define pickup points and schedule</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Route Details</CardTitle>
                            <CardDescription>Basic information about the route</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Route Name</label>
                                <Input placeholder="e.g. North Side Loop" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Start Point</label>
                                    <Input placeholder="Starting location" />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">End Point</label>
                                    <Input placeholder="Destination" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Stops & Pickup Points</CardTitle>
                                <CardDescription>Sequence of stops</CardDescription>
                            </div>
                            <Button size="sm" variant="secondary">
                                <Plus className="mr-2 h-4 w-4" /> Add Stop
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center gap-3 p-3 border rounded-md bg-gray-50">
                                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                        {i}
                                    </div>
                                    <div className="flex-1">
                                        <Input defaultValue={i === 1 ? "Central Station (Pickup)" : "Tech Park Gate 1 (Drop)"} className="bg-white" />
                                    </div>
                                    <div className="w-24">
                                        <Input type="time" defaultValue={i === 1 ? "06:30" : "07:15"} className="bg-white" />
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Operating Days</label>
                                <div className="flex flex-wrap gap-2">
                                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                                        <div key={i} className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer ${i < 5 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}>
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Departure Time</label>
                                <Input type="time" defaultValue="06:30" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-3">
                        <Button size="lg" className="w-full">Save Route</Button>
                        <Button variant="outline" size="lg" className="w-full">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper mock import for icon
import { Trash2 } from "lucide-react" 
