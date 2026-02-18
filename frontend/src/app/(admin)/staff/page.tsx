"use client"

import { useEffect, useState } from "react"
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
import { Plus, Search, Eye } from "lucide-react"
import type { Staff } from "@/lib/data"

export default function StaffPage() {
    const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchStaff();
    }, []);

    async function fetchStaff() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff`);
            if (response.ok) {
                const data = await response.json();
                setStaffMembers(data);
            }
        } catch (error) {
            console.error("Error fetching staff:", error);
        } finally {
            setLoading(false);
        }
    }

    const filteredStaff = staffMembers.filter(staff =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading staff...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Staff Management</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Staff
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle>Staff Directory</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search staff..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Staff ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStaff.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                        No staff members found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredStaff.map((staff) => (
                                    <TableRow key={staff.id}>
                                        <TableCell className="font-medium font-mono">{staff.id}</TableCell>
                                        <TableCell className="font-medium">{staff.name}</TableCell>
                                        <TableCell>{staff.companyName}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={staff.status === "On a Trip" ? "default" : "secondary"}
                                                className={staff.status === "On a Trip" ? "bg-blue-600" : ""}
                                            >
                                                {staff.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/staff/${staff.id}`}>
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View Profile
                                                </Button>
                                            </Link>
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
