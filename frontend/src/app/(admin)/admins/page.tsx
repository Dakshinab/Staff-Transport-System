'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Admin {
    id: string;
    username: string;
    email: string;
    mobile: string;
    status: 'pending' | 'active';
    role: string;
    createdAt: any;
}

export default function AdminsPage() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [localAdmins, setLocalAdmins] = useState<Admin[]>([]); // Simulation state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', mobile: '' });
    const [loading, setLoading] = useState(true);

    const isDevBypass = process.env.NEXT_PUBLIC_DEV_ADMIN_BYPASS === "true";

    useEffect(() => {
        // Initial Mock Data if in Dev mode and no Firestore connection
        if (isDevBypass) {
            setLocalAdmins([
                {
                    id: 'sim-1',
                    username: 'dev_admin',
                    email: 'admin@staff-transport.com',
                    mobile: '+94770000000',
                    status: 'active',
                    role: 'super_admin',
                    createdAt: new Date()
                }
            ]);
        }

        const q = query(collection(db, 'admins'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const adminList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Admin[];
            setAdmins(adminList);
            setLoading(false);
        }, (error) => {
            console.error("Firestore error (likely unauthenticated):", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isDevBypass]);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = await auth.currentUser?.getIdToken();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/invite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // If the response was simulated, add to local state
                if (data.simulated || isDevBypass) {
                    const newAdmin: Admin = {
                        id: `sim-${Date.now()}`,
                        ...formData,
                        status: 'pending',
                        role: 'admin',
                        createdAt: new Date()
                    };
                    setLocalAdmins(prev => [newAdmin, ...prev]);
                }
                setIsModalOpen(false);
                setFormData({ username: '', email: '', mobile: '' });
            } else {
                alert(data.error || 'Failed to invite admin');
            }
        } catch (err) {
            console.error(err);
            alert('Error inviting admin');
        }
    };

    const handleRevoke = async (id: string) => {
        if (!confirm('Are you sure you want to revoke this admin?')) return;

        // If it's a simulated admin, just remove locally
        if (id.startsWith('sim-')) {
            setLocalAdmins(prev => prev.filter(a => a.id !== id));
            return;
        }

        const token = await auth.currentUser?.getIdToken();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.error || 'Failed to revoke admin');
            }
        } catch (err) {
            console.error(err);
            alert('Error revoking admin');
        }
    };

    const allAdmins = [...localAdmins, ...admins];

    return (
        <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-500">Admin Management</h1>
                <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Admin
                </Button>
            </div>

            <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-800">
                            <TableRow className="border-slate-700 hover:bg-transparent">
                                <TableHead className="text-slate-300">Username</TableHead>
                                <TableHead className="text-slate-300">Email</TableHead>
                                <TableHead className="text-slate-300">Mobile</TableHead>
                                <TableHead className="text-slate-300">Status</TableHead>
                                <TableHead className="text-right text-slate-300">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allAdmins.map((admin) => (
                                <TableRow key={admin.id} className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell className="font-medium">{admin.username}</TableCell>
                                    <TableCell>{admin.email}</TableCell>
                                    <TableCell>{admin.mobile}</TableCell>
                                    <TableCell>
                                        <Badge className={admin.status === 'active' ? 'bg-green-600' : 'bg-yellow-600 text-slate-900'}>
                                            {admin.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                            onClick={() => handleRevoke(admin.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {allAdmins.length === 0 && !loading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                                        No admins found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add Admin Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-2xl">
                        <CardHeader>
                            <CardTitle>Invite New Admin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleInvite} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Username</label>
                                    <Input
                                        placeholder="johndoe"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                        className="bg-slate-800 border-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="bg-slate-800 border-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Mobile Number</label>
                                    <Input
                                        placeholder="+94771234567"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        required
                                        className="bg-slate-800 border-slate-700"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-800">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                                        Send Invitation
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
