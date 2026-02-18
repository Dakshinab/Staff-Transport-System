"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../lib/data");
const router = (0, express_1.Router)();
// GET /pending - Must be before /:id
router.get('/pending', (req, res) => {
    const pendingDrivers = data_1.drivers.filter(d => d.reviewStatus === "Pending");
    res.json(pendingDrivers);
});
// POST /review
router.post('/review', (req, res) => {
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
        data_1.drivers.forEach(driver => {
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to process request' });
    }
});
// POST /verify-field
router.post('/verify-field', (req, res) => {
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
        const driver = data_1.drivers.find(d => d.id === driverId);
        if (!driver) {
            res.status(404).json({ error: 'Driver not found' });
            return;
        }
        if (!(fieldName in driver.fieldVerification)) {
            res.status(400).json({ error: 'Invalid field name' });
            return;
        }
        driver.fieldVerification[fieldName] = status;
        const allFieldStatuses = Object.values(driver.fieldVerification);
        const allApproved = allFieldStatuses.every(s => s === 'Approved');
        const anyRejected = allFieldStatuses.some(s => s === 'Rejected');
        const anyPending = allFieldStatuses.some(s => s === 'Pending');
        let newReviewStatus = driver.reviewStatus;
        let statusChanged = false;
        if (!anyPending) {
            if (allApproved) {
                newReviewStatus = "Approved";
                driver.status = "Active";
                statusChanged = true;
            }
            else if (anyRejected) {
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
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to process request' });
    }
});
// GET / - All drivers
router.get('/', (req, res) => {
    const summaryData = data_1.drivers.map(d => ({
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
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const driver = data_1.drivers.find((d) => d.id === id);
    if (!driver) {
        res.status(404).json({ error: 'Driver not found' });
        return;
    }
    res.json(driver);
});
exports.default = router;
