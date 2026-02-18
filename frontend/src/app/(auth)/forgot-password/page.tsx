import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
    return (
        <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                <CardDescription>
                    Enter your email address and we'll send you a link to reset your password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                    <Input id="email" type="email" placeholder="admin@example.com" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button className="w-full">Send Reset Link</Button>
                <Link href="/login" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                </Link>
            </CardFooter>
        </Card>
    )
}
