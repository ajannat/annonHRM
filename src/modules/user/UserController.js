import UserService from './service/UserService.js';
import { createUserSchema, updateUserSchema } from './UserValidator.js';

class UserController {
    static async getUsers(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await UserService.getAllUsers(page, limit);
            res.json({
                status: 'success',
                data: result.users,
                pagination: {
                    total: result.total,
                    page: page,
                    limit: limit,
                    totalPages: Math.ceil(result.total / limit)
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            res.json({
                status: 'success',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req, res, next) {
        try {
            // Validate request body
            const { error, value } = createUserSchema.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
    
            const user = await UserService.createUser(value);
            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            
            // Validate request body
            const { error, value } = updateUserSchema.validate(req.body);
            if (error) {
                throw new Error(error.details[0].message);
            }
    
            const user = await UserService.updateUser(id, value);
            res.json({
                status: 'success',
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
    
            const user = await UserService.deleteUser(id);
            res.json({
                status: 'success',
                message: 'User deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;