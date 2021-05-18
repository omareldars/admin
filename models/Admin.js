const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

//admin schema
const adminSchema = Schema({
        fname:{
            type: String,
            maxLength: 140,
            required: true
        },
        lname:{
            type: String,
            maxLength: 140,
            required: true
        },
        username:{
            type: String,
            unique: true,
            maxLength: 140 ,
            required: true
        },
        email:{
            type: String,
            unique: true,
            maxLength: 140,
            required: true
        },
        password:{
            type: String,
            minLength : 8,
            maxLength: 140,
            required: true,
        },

        dob: Date,

    },
    {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            },
        },
    });

// function to hash password
adminSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

adminSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
        return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
});

// function to check password
adminSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};


const adminmodel = mongoose.model('Admin',adminSchema);

module.exports= adminmodel
