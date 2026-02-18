import { Router, Request, Response } from 'express';
import { staff } from '../lib/data';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json(staff);
});

router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const staffMember = staff.find(s => s.id === id);

    if (!staffMember) {
        res.status(404).json({ error: 'Staff member not found' });
        return;
    }

    res.json(staffMember);
});

export default router;
