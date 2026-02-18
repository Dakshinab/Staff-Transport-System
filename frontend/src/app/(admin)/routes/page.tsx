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
import { Plus, Search, Map, Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react"

// Mock Data
const routes = [
    { id: "R-101", name: "North Side Loop", start: "Central Station", end: "Tech Park", stops: 8, duration: "45 mins", status: "Active" },
    { id: "R-102", name: "Downtown Express", start: "Metro Hub", end: "Corporate Office", stops: 4, duration: "30 mins", status: "Active" },
    { id: "R-103", name: "West End Shuttle", start: "West Mall", end: "Tech Park", stops: 12, duration: "60 mins", status: "Maintenance" },
    { id: "R-104", name: "Night Shift A", start: "Tech Park", end: "Central Station", stops: 6, duration: "40 mins", status: "Active" },
]

export default function RoutesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Route Management</h1>
                <Link href="/routes/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New Route
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Active Routes</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input type="search" placeholder="Search routes..." className="pl-9" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Route ID</TableHead>
                                <TableHead>Route Name</TableHead>
                                <TableHead>Start / End Point</TableHead>
                                <TableHead>Stops</TableHead>
                                <TableHead>Est. Duration</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {routes.map((route) => (
                                <TableRow key={route.id}>
                                    <TableCell className="font-medium">{route.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Map className="h-4 w-4 text-gray-400" />
                                            {route.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-xs">
                                            <span className="font-medium text-green-600">S:</span> {route.start}
                                            <br />
                                            <span className="font-medium text-red-600">E:</span> {route.end}
                                        </div>
                                    </TableCell>
                                    <TableCell>{route.stops} Stops</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <Clock className="h-3 w-3" />
                                            {route.duration}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={route.status === "Active" ? "success" : "warning"}>
                                            {route.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="Edit Route">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Delete" className="text-red-500 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
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
