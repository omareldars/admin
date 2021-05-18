const express = require('express');

const Product = require('../models/Products');
const router = express.Router();

const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

//@routes Get /api/products
//@desc Get all products
//@access public

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.json({ message: err });
    }
});

// @routes Post /api/products
// @desc add product
// @access private

router.post('/', async (req, res) => {
    const { product, category, description, photo } = req.body;
    if (!product || !category || !description || !photo) {
        console.log(product, category, description, photo);
        return res.status(422).json({ error: 'please add all the fields' });
    }

    const singleproduct = new Product({
        product,
        category,
        description,
        photo,
    });
    singleproduct
        .save()
        .then((result) => {
            res.json({ product: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

//@routes Get /api/products/:productId
//@desc Get  product by its id
//@access public

router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (err) {
        res.json({ message: err });
    }
});

//@routes delete /api/products/:productId
//@desc delete  specific product
//@access private

router.delete('/:productId', async (req, res) => {
    try {
        const removedProduct = await Product.deleteOne({
            _id: req.params.productId,
        });
        res.json(removedProduct);
    } catch (err) {
        res.json({ message: err });
    }
});

//@routes Put /api/products/:productId
//@desc update specific product
//@access private

router.put('/:productId', async (req, res) => {
    try {
        const productfind = await Product.findById(req.params.productId);
        if (!productfind) {
            return res.status(400).json({ msg: 'product not found' });
        }
        const productUpdate = await Product.findByIdAndUpdate(
            req.params.productId,

            req.body,
            { new: true }
        );
        const productSaved = await productUpdate.save();
        res.json(productSaved);
    } catch (error) {
        console.error(error.msg);
        res.status(500).send('server errors');
    }
});

module.exports = router;
