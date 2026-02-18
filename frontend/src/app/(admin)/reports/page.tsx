import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Calendar, BarChart, PieChart } from "lucide-react"

export default function ReportsPage() {
    const reports = [
        { title: "Monthly Attendance Report", desc: "Staff check-in/out logs for May 2024", type: "CSV" },
        { title: "Vehicle Utilization Summary", desc: "Distance and fuel usage analysis", type: "PDF" },
        { title: "Trip On-Time Performance", desc: "Efficiency metrics for all routes", type: "PDF" },
        { title: "Driver Activity Log", desc: "Driving hours and break times", type: "CSV" },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports & Analytics</h1>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border shadow-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">May 2024</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                        <BarChart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">482</div>
                        <p className="text-xs text-gray-500">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
                        <PieChart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94%</div>
                        <p className="text-xs text-gray-500">-1% from last month</p>
                    </CardContent>
                </Card>
                {/* More stat cards if needed */}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Reports</CardTitle>
                        <CardDescription>Recently generated documents ready for download</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {reports.map((report, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg bg-white p-2 border">
                                            <FileText className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{report.title}</h4>
                                            <p className="text-xs text-gray-500">{report.desc}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Download className="h-4 w-4" />
                                        {report.type}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Custom Export</CardTitle>
                        <CardDescription>Generate specific data exports</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 h-full justify-center items-center text-center p-8 border-2 border-dashed rounded-lg bg-gray-50">
                            <div className="rounded-full bg-gray-100 p-4">
                                <Download className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Select Data Parameters</h3>
                                <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">Choose date range, module, and format to generate a custom report.</p>
                            </div>
                            <Button className="mt-2">Configure Export</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
