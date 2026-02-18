"use client"

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
import { Plus, Search, Eye, Edit, Ban, Star } from "lucide-react"
import { useEffect, useState } from "react"

// Define type for driver summary
type DriverSummary = {
    id: string;
    name: string;
    license: string;
    vehicle: string;
    rating: number;
    status: "Active" | "Inactive" | "On Trip";
}

export default function DriversPage() {
    const [drivers, setDrivers] = useState<DriverSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDrivers() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/drivers`);
                if (response.ok) {
                    const data = await response.json();
                    setDrivers(data);
                } else {
                    console.error("Failed to fetch drivers");
                }
            } catch (error) {
                console.error("Error fetching drivers:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDrivers();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Driver Management</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Driver
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Driver Directory</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input type="search" placeholder="Search drivers..." className="pl-9" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Driver ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>License No.</TableHead>
                                <TableHead>Assigned Vehicle</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">Loading drivers...</TableCell>
                                </TableRow>
                            ) : drivers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">No drivers found.</TableCell>
                                </TableRow>
                            ) : (
                                drivers.map((driver) => (
                                    <TableRow key={driver.id}>
                                        <TableCell className="font-medium">{driver.id}</TableCell>
                                        <TableCell>{driver.name}</TableCell>
                                        <TableCell>{driver.license}</TableCell>
                                        <TableCell>{driver.vehicle}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="font-bold text-gray-900">{driver.rating.toFixed(1)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    driver.status === "Active" ? "success" :
                                                        driver.status === "On Trip" ? "warning" : "secondary"
                                                }
                                            >
                                                {driver.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/drivers/${driver.id}`}>
                                                    <Button variant="ghost" size="icon" title="View Profile">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" title="Edit">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" title="Disable" className="text-red-500 hover:text-red-600">
                                                    <Ban className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
