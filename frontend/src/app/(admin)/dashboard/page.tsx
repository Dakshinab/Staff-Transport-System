import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Truck, Activity, UserCog } from "lucide-react"

export default function DashboardPage() {
    const devBypass = process.env.NEXT_PUBLIC_DEV_ADMIN_BYPASS === "true";

    if (devBypass) {
        console.warn("Admin auth bypass enabled (DEV MODE)");
        return (
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-blue-500 bg-blue-50/50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard (Dev Mode Bypass)</h1>
                    <p className="mt-2 text-blue-500 font-medium italic">Full dashboard functionality is active</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,240</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
                        <UserCog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">+2 new this week</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Currently on route</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vehicles Active</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">4 in maintenance</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500">
                            Chart placeholder area (e.g., Weekly trips)
                        </div>
                        <div className="mt-4 h-[200px] w-full rounded-md bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">Chart Visualization Mock</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Live Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 rounded-md border p-3">
                                <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
                                    <Activity className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Bus #42 Delayed</p>
                                    <p className="text-xs text-gray-500">Route 5 - Heavy Traffic</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-md border p-3">
                                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                                    <Truck className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">New Trip Started</p>
                                    <p className="text-xs text-gray-500">Driver John D. - Route 2</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
