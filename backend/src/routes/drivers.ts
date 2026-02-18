import { Router, Request, Response } from 'express';
import { drivers } from '../lib/data';

const router = Router();

// GET /pending - Must be before /:id
router.get('/pending', (req: Request, res: Response) => {
    const pendingDrivers = drivers.filter(d => d.reviewStatus === "Pending");
    res.json(pendingDrivers);
});

// POST /review
router.post('/review', (req: Request, res: Response) => {
    try {
        const { driverIds, action } = req.body;

        if (!driverIds || !Array.isArray(driverIds) || !action) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }

        if (action !== 'accept' && action !== 'reject') {
            res.status(400).json({ error: 'Action must be "accept" or "reject"' });
            return;
        }

        // Update driver review status in-place
        let updatedCount = 0;
        drivers.forEach(driver => {
            if (driverIds.includes(driver.id)) {
                driver.reviewStatus = action === 'accept' ? 'Approved' : 'Rejected';
                driver.status = action === 'accept' ? 'Active' : 'Inactive';
                updatedCount++;
            }
        });

        res.json({
            success: true,
            message: `${updatedCount} driver(s) ${action}ed successfully`,
            updatedCount
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// POST /verify-field
router.post('/verify-field', (req: Request, res: Response) => {
    try {
        const { driverId, fieldName, status } = req.body;

        if (!driverId || !fieldName || !status) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        if (status !== 'Approved' && status !== 'Rejected') {
            res.status(400).json({ error: 'Status must be "Approved" or "Rejected"' });
            return;
        }

        const driver = drivers.find(d => d.id === driverId);
        if (!driver) {
            res.status(404).json({ error: 'Driver not found' });
            return;
        }

        if (!(fieldName in driver.fieldVerification)) {
            res.status(400).json({ error: 'Invalid field name' });
            return;
        }

        (driver.fieldVerification as any)[fieldName] = status;

        const allFieldStatuses = Object.values(driver.fieldVerification);
        const allApproved = allFieldStatuses.every(s => s === 'Approved');
        const anyRejected = allFieldStatuses.some(s => s === 'Rejected');
        const anyPending = allFieldStatuses.some(s => s === 'Pending');

        let newReviewStatus: "Pending" | "Approved" | "Rejected" = driver.reviewStatus;
        let statusChanged = false;

        if (!anyPending) {
            if (allApproved) {
                newReviewStatus = "Approved";
                driver.status = "Active";
                statusChanged = true;
            } else if (anyRejected) {
                newReviewStatus = "Rejected";
                driver.status = "Inactive";
                statusChanged = true;
            }
            driver.reviewStatus = newReviewStatus;
        }

        res.json({
            success: true,
            fieldName,
            fieldStatus: status,
            overallReviewStatus: newReviewStatus,
            statusChanged,
            driver
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// GET / - All drivers
router.get('/', (req: Request, res: Response) => {
    const summaryData = drivers.map(d => ({
        id: d.id,
        name: d.name,
        license: d.license,
        vehicle: d.vehicle.name,
        rating: d.rating,
        status: d.status
    }));
    res.json(summaryData);
});

// GET /:id - Single driver
router.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const driver = drivers.find((d) => d.id === id);

    if (!driver) {
        res.status(404).json({ error: 'Driver not found' });
        return;
    }

    res.json(driver);
});

export default router;
