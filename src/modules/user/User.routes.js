import express from 'express';
import UserController from './UserController.js';

const userRoutes = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       employee_id:
 *                         type: string
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 */
userRoutes.get('/', UserController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
userRoutes.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employee_id
 *               - first_name
 *               - last_name
 *               - email
 *               - phone
 *               - joining_date
 *               - date_of_birth
 *               - nid_no
 *               - designation
 *               - salary
 *               - type
 *             properties:
 *               employee_id:
 *                 type: string
 *                 example: 1001
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *                 example: +8801710110011
 *               joining_date:
 *                 type: string
 *                 format: date
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               nid_no:
 *                 type: string
 *                 example: 6428936457
 *               designation:
 *                 type: string
 *                 example: Software Engineer
 *               team_id:
 *                 type: number
 *                 example: 1
 *               salary:
 *                 type: number
 *                 example: 75000
 *               type:
 *                 type: string
 *                 example: employee
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
userRoutes.post('/', UserController.createUser);

export default userRoutes;