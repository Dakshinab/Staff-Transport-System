import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Calendar, MapPin, User, Truck, Filter } from "lucide-react"

// Mock Data
const trips = [
    { id: "TRP-8492", route: "R-102 (Downtown)", driver: "John Smith", vehicle: "Bus 101", time: "Today, 06:30 AM", status: "Ongoing" },
    { id: "TRP-8493", route: "R-105 (North Side)", driver: "Michael Chen", vehicle: "Bus 104", time: "Today, 07:00 AM", status: "Scheduled" },
    { id: "TRP-8491", route: "R-101 (West End)", driver: "Robert Williams", vehicle: "Van 05", time: "Today, 06:00 AM", status: "Completed" },
    { id: "TRP-8490", route: "R-108 (Night A)", driver: "David Wilson", vehicle: "Bus 102", time: "Yesterday, 10:00 PM", status: "Completed" },
    { id: "TRP-8489", route: "R-102 (Downtown)", driver: "Unassigned", vehicle: "Unassigned", time: "Tomorrow, 06:30 AM", status: "Pending" },
]

export default function TripsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trip Management</h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button>
                        Create Trip
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Trip Manifest</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input type="search" placeholder="Search trips..." className="pl-9" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Trip ID</TableHead>
                                <TableHead>Route Details</TableHead>
                                <TableHead>Driver & Vehicle</TableHead>
                                <TableHead>Scheduled Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium">{trip.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            {trip.route}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm">
                                                <User className="h-3 w-3 text-gray-400" />
                                                <span className={trip.driver === "Unassigned" ? "text-red-500 italic" : ""}>{trip.driver}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Truck className="h-3 w-3" />
                                                <span>{trip.vehicle}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-3 w-3" />
                                            {trip.time}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                trip.status === "Completed" ? "success" :
                                                    trip.status === "Ongoing" ? "warning" :
                                                        trip.status === "Pending" ? "destructive" : "default"
                                            }
                                        >
                                            {trip.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
