const { check } = require('express-validator');

exports.validatePasswordChange = [
  // Check that the oldPassword is not empty
  check('oldPassword')
    .not()
    .isEmpty()
    .withMessage('Current password is required'),

  // Check that the newPassword is at least 6 characters long
  check('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),

  // Check that confirmNewPassword matches newPassword
  check('confirmNewPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('New passwords must match');
      }
      return true;
    }),
];
