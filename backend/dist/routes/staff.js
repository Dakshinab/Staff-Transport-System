"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../lib/data");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json(data_1.staff);
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const staffMember = data_1.staff.find(s => s.id === id);
    if (!staffMember) {
        res.status(404).json({ error: 'Staff member not found' });
        return;
    }
    res.json(staffMember);
});
exports.default = router;
