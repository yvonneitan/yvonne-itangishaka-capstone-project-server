import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

export const validateTask = [
  body('task')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Task must be 1-500 characters')
    .escape(),
  body('start_time')
    .isISO8601()
    .withMessage('Invalid start time format'),
  body('end_time')
    .isISO8601()
    .withMessage('Invalid end time format'),
  body('list_id')
    .isInt({ min: 1 })
    .withMessage('Valid list ID required'),
  handleValidationErrors
];

export const validateList = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('List name must be 1-100 characters')
    .escape(),
  body('userId')
    .isInt({ min: 1 })
    .withMessage('Valid user ID required'),
  handleValidationErrors
];

export const validateUser = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be 3-50 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors
];