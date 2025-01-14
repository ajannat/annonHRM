import UserService from './service/UserService.js';
import { createUserSchema } from './UserValidator.js';

class UserController {
    static async getUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            res.json({
                status: 'success',
                data: users
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
}

export default UserController;