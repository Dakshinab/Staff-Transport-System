"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../lib/data");
const router = (0, express_1.Router)();
let localAdmins = [...data_1.admins];
router.get('/', (req, res) => {
    res.json(localAdmins);
});
router.post('/', (req, res) => {
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
    const newAdmin = {
        id: `ADM${String(localAdmins.length + 1).padStart(3, '0')}`,
        username,
        mobile,
        email,
        status: "Pending"
    };
    localAdmins = [...localAdmins, newAdmin];
    res.json(newAdmin);
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    localAdmins = localAdmins.filter(admin => admin.id !== id);
    res.json({ success: true });
});
exports.default = router;
