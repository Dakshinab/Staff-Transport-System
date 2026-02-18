"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Map, Navigation, Search, Filter } from "lucide-react"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
    ssr: false,
    loading: () => <div className="w-full h-[500px] bg-gray-100 animate-pulse flex items-center justify-center">Loading map...</div>
})

export default function LiveFleetPage() {
    const activeVehicles = [
        { id: "Active-1", name: "Bus 101", route: "R-102", speed: "45 km/h", status: "Moving", lat: "10", lng: "20" },
        { id: "Active-2", name: "Bus 104", route: "R-105", speed: "32 km/h", status: "Moving", lat: "15", lng: "25" },
        { id: "Active-3", name: "Van 05", route: "R-101", speed: "0 km/h", status: "Stopped", lat: "12", lng: "22" },
        { id: "Active-4", name: "Bus 102", route: "R-108", speed: "0 km/h", status: "Idle", lat: "11", lng: "21" },
    ]

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Live Fleet Monitoring</h1>
                <div className="flex items-center gap-2">
                    <Badge variant="success" className="h-7 px-3 text-sm">Online: 12</Badge>
                    <Badge variant="destructive" className="h-7 px-3 text-sm">Offline: 4</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[500px]">
                {/* Map Area */}
                <Card className="lg:col-span-2 overflow-hidden flex flex-col">
                    <div className="flex-1 bg-gray-100">
                        <MapComponent />
                    </div>
                </Card>


                {/* List Area */}
                <Card className="flex flex-col">
                    <CardHeader className="pb-3">
                        <CardTitle>Active Vehicles</CardTitle>
                        <div className="flex gap-2 mt-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input placeholder="Search..." className="pl-9 h-9" />
                            </div>
                            <Button variant="outline" size="icon" className="h-9 w-9">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto pr-2">
                        <div className="space-y-3">
                            {activeVehicles.map(vehicle => (
                                <div key={vehicle.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-8 w-8 rounded-full bg-white border flex items-center justify-center">
                                            <Navigation className={`h-4 w-4 ${vehicle.status === "Moving" ? "text-blue-600 fill-blue-600" : "text-gray-400"}`} style={{ transform: vehicle.status === "Moving" ? "rotate(45deg)" : "none" }} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{vehicle.name}</p>
                                            <p className="text-xs text-gray-500">{vehicle.route}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-sm font-semibold">{vehicle.speed}</p>
                                        <p className={`text-[10px] font-medium uppercase ${vehicle.status === "Moving" ? "text-blue-600" : vehicle.status === "Stopped" ? "text-green-600" : "text-gray-500"}`}>
                                            {vehicle.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
