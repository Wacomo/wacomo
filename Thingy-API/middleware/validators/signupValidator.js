const { check } = require('express-validator');

exports.validateUserRegisteration = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),

    check('email')
    .isEmail()
    .withMessage('Invalid email'),

    check('hashedPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];