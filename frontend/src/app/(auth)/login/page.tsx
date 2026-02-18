'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { setCookie } from 'nookies';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const isDevBypass = process.env.NEXT_PUBLIC_DEV_ADMIN_BYPASS === "true";

        try {
            if (isDevBypass) {
                console.warn("🔐 Simulation: Logging in via Dev Mode Bypass");
                setCookie(null, 'session', 'simulated-dev-session-token', {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                router.push('/dashboard');
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            // Set session cookie for middleware
            setCookie(null, 'session', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
            <Card className="w-full max-view-md bg-slate-900 border-slate-800 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-blue-500">Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        <p className="text-center text-sm text-slate-400">
                            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Signup</a>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
