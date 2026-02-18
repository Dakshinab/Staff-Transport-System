import { Router, Request, Response } from 'express';
import { admins as initialAdmins, AdminUser } from '../lib/data';

const router = Router();
let localAdmins: AdminUser[] = [...initialAdmins];

router.get('/', (req: Request, res: Response) => {
    res.json(localAdmins);
});

router.post('/', (req: Request, res: Response) => {
    const { username, mobile, email } = req.body;

    const usernameExists = localAdmins.some(admin => admin.username.toLowerCase() === username.toLowerCase());
    const emailExists = localAdmins.some(admin => admin.email.toLowerCase() === email.toLowerCase());
    const mobileExists = localAdmins.some(admin => admin.mobile === mobile);

    if (usernameExists) {
        res.status(400).json({ error: 'Username already exists' });
        return;
    }
    if (emailExists) {
        res.status(400).json({ error: 'Email address already exists' });
        return;
    }
    if (mobileExists) {
        res.status(400).json({ error: 'Mobile number already exists' });
        return;
    }

    const newAdmin: AdminUser = {
        id: `ADM${String(localAdmins.length + 1).padStart(3, '0')}`,
        username,
        mobile,
        email,
        status: "Pending"
    };
    localAdmins = [...localAdmins, newAdmin];
    res.json(newAdmin);
});

router.delete('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    localAdmins = localAdmins.filter(admin => admin.id !== id);
    res.json({ success: true });
});

export default router;
