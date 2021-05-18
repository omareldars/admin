const Admin = require('../models/Admin');
const User = require('../models/User');
const Products = require('../models/Procucts');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);


 ///////////////////////////////////// This is for admin management ///////////////////////////////////
const create = (admin) => Admin.create(admin);

//Admin Login
const login = async ({ username, password }) => {
    const admin = await Admin.findOne({ username }).exec();
    if (!admin) {
        throw Error('Not_AUTHNTICATED');
    }
    console.log(admin);
    const isValidPass = admin.validatePassword(password);

    if (!isValidPass) {
        throw Error('Not_AUTHNTICATED');
    }
    const token = await asyncSign({
        username: admin.username,
        id: admin.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
    return { ...admin.toJSON(), token };
};


// Show All Users To Admin
const getAll = () => User.find({}).exec();

//admin Acc
const getAdmin = (id) => Admin.findById(id);

//Edit admin Acc
const editOne = (id, data) => Admin.findByIdAndUpdate(id, data, { new: true }).exec();


/////////////////////////////   This is for product management //////////////////////////////////////////////////



module.exports = {
    create,
    login,
    getAll,
    getAdmin,
    editOne,
};