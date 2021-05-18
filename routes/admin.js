const express = require('express');
const adminModel=require('../models/Admin');
var passport = require('passport');
const { create, login , getAll,getAdmin, editOne, } = require('../controllers/admin');
const auth = require('../middlewares/auth')
const router = express.Router();


//Route for admin Register
router.post('/admin/register', async (req, res, next) => {
    const { body } = req;
    try {
        const admin = await create(body);
        res.json(admin);
    } catch (e) {
        next(e);
    }
});

//Route for admin Login
router.post('/admin/login', async (req, res, next) => {
    const { body } = req;
    try {
        const admin = await login(body);
        res.json(admin);
    } catch (e) {
        next(e);
    }
});

// Route for admin dashboard
router.get('/admin/dashboard', async (req, res, next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
});


//Route for admin Acc
router.get('/admin/me', auth, async (req, res, next) => {
    try {
        const { admin: id } = req;
        const admins = await getAdmin(id);
        res.json(admins);
    } catch (e) {
        next(e);
    }
});


// Edit admin Acc
router.patch('/admin/edit', auth, async (req, res, next) => {
    const { admin: { id }, body } = req;
    try {
        const admins = await editOne(id, body);
        res.json(admins);
    } catch (e) {
        next(e);
    }
});


module.exports = router;