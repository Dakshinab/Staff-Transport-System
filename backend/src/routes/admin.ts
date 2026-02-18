import { Router, Request, Response } from 'express';
import { adminAuth, adminDb } from '../lib/firebase';
import { Timestamp } from 'firebase-admin/firestore';

const router = Router();

router.post('/invite', async (req: Request, res: Response): Promise<void> => {
    try {
        const isDevBypass = process.env.DEV_ADMIN_BYPASS === "true";
        const { username, email, mobile } = req.body;

        if (!username || !email || !mobile) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        if (!isDevBypass) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            if (!adminAuth) {
                res.status(500).json({ error: 'Firebase Auth not initialized' });
                return;
            }

            const token = authHeader.split('Bearer ')[1];
            try {
                const decodedToken = await adminAuth.verifyIdToken(token);
                if (decodedToken.role !== 'super_admin') {
                    res.status(403).json({ error: 'Permission denied' });
                    return;
                }
            } catch (error) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }
        }

        // Mock behavior for dev bypass
        if (isDevBypass) {
            console.warn("🛠️ Simulation: Admin invited successfully (Dev Mode Bypass)");
            res.json({
                message: 'Admin invited successfully (Simulated)',
                simulated: true
            });
            return;
        }

        if (!adminDb) {
            res.status(500).json({ error: 'Firestore not initialized' });
            return;
        }

        // Check if admin already exists
        const adminRef = adminDb.collection('admins');
        const existingAdmin = await adminRef.where('email', '==', email).get();

        if (!existingAdmin.empty) {
            res.status(400).json({ error: 'Admin with this email already exists' });
            return;
        }

        // Create Firestore document
        await adminRef.add({
            username,
            email: email.toLowerCase(),
            mobile,
            role: 'admin',
            status: 'pending',
            createdAt: Timestamp.now(),
            uid: null,
        });

        res.json({ message: 'Admin invited successfully' });
    } catch (error: any) {
        console.error('Invite Error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const isDevBypass = process.env.DEV_ADMIN_BYPASS === "true";
        const { username, email, mobile, password } = req.body;

        if (!username || !email || !mobile || !password) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const lowerEmail = email.toLowerCase();

        // Mock behavior for dev bypass
        if (isDevBypass) {
            console.warn(`🛠️ Simulation: Admin ${username} signed up successfully (Dev Mode Bypass)`);
            res.json({
                message: 'Signup successful (Simulated)',
                uid: 'sim-user-' + Date.now(),
                simulated: true
            });
            return;
        }

        if (!adminDb || !adminAuth) {
            res.status(500).json({ error: 'Firebase services not initialized' });
            return;
        }

        // 1. Check Firestore for pending record
        const adminRef = adminDb.collection('admins');
        const snapshot = await adminRef.where('email', '==', lowerEmail).get();

        if (snapshot.empty) {
            res.status(400).json({ error: 'No invitation found for this email' });
            return;
        }

        const adminDoc = snapshot.docs[0];
        const adminData = adminDoc.data();

        if (adminData.status !== 'pending') {
            res.status(400).json({ error: 'Account already activated or not in pending state' });
            return;
        }

        // 2. Validate username and mobile
        if (adminData.username !== username || adminData.mobile !== mobile) {
            res.status(400).json({ error: 'Username or Mobile number does not match the invitation' });
            return;
        }

        // 3. Create Firebase Auth user
        const userRecord = await adminAuth.createUser({
            email: lowerEmail,
            password: password,
            displayName: username,
        });

        // 4. Set Custom Claim
        await adminAuth.setCustomUserClaims(userRecord.uid, { role: 'admin' });

        // 5. Update Firestore
        await adminDoc.ref.update({
            uid: userRecord.uid,
            status: 'active',
        });

        res.json({ message: 'Signup successful', uid: userRecord.uid });
    } catch (error: any) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const isDevBypass = process.env.DEV_ADMIN_BYPASS === "true";
        const adminId = req.params.id as string;

        if (!isDevBypass) {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            if (!adminAuth) {
                res.status(500).json({ error: 'Firebase Auth not initialized' });
                return;
            }

            const token = authHeader.split('Bearer ')[1];
            try {
                const decodedToken = await adminAuth.verifyIdToken(token);
                if (decodedToken.role !== 'super_admin') {
                    res.status(403).json({ error: 'Permission denied' });
                    return;
                }
            } catch (error) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }
        }

        // Mock behavior for dev bypass
        if (isDevBypass) {
            console.warn(`🛠️ Simulation: Admin ${adminId} deleted successfully (Dev Mode Bypass)`);
            res.json({
                message: 'Admin deleted successfully (Simulated)',
                simulated: true
            });
            return;
        }

        if (!adminDb) {
            res.status(500).json({ error: 'Firestore not initialized' });
            return;
        }

        // Get the doc to find UID if it exists
        const doc = await adminDb.collection('admins').doc(adminId).get();
        if (!doc.exists) {
            res.status(404).json({ error: 'Admin not found' });
            return;
        }

        const data = doc.data();
        const uid = data?.uid;

        // Delete from Firebase Auth if UID exists
        if (uid && adminAuth) {
            try {
                await adminAuth.deleteUser(uid);
            } catch (authError: any) {
                console.warn('Could not delete auth user (might not exist):', authError.message);
            }
        }

        // Delete from Firestore
        await adminDb.collection('admins').doc(adminId).delete();

        res.json({ message: 'Admin deleted successfully' });
    } catch (error: any) {
        console.error('Revoke Error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
