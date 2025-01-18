import { query } from '../../../config/database.js';
import UserModel from '../model/User.js';

class UserService {
    static async getAllUsers(page, limit) {
        try {
            const validatedPage = Math.max(1, page);
            const validatedLimit = Math.min(Math.max(1, limit), 100);
            
            const offset = (validatedPage - 1) * validatedLimit;
            
            const result = await UserModel.findAll(offset, validatedLimit);
            // const { rows } = await UserModel.findAll();
            return result;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    static async getUserById(id) {
        try {
            const { rows } = await UserModel.findById(id);
            if (rows.length === 0) {
                throw new Error('User not found');
            }
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching user: ${error.message}`);
        }
    }

    static async createUser(userData) {
        try {
            const empIdCheck = await query(
                'SELECT id FROM employees WHERE employee_id = $1',
                [userData.employee_id]
            );
            if (empIdCheck.rows.length > 0) {
                throw new Error('Employee with same ID already exists');
            }

            const emailCheck = await query(
                'SELECT id FROM employees WHERE email = $1',
                [userData.email]
            );
            if (emailCheck.rows.length > 0) {
                throw new Error('Employee with same Email already exists');
            }

            const phoneCheck = await query(
                'SELECT id FROM employees WHERE phone = $1',
                [userData.email]
            );
            if (phoneCheck.rows.length > 0) {
                throw new Error('Employee with same Phone already exists');
            }

            const nidCheck = await query(
                'SELECT id FROM employees WHERE nid_no = $1',
                [userData.email]
            );
            if (nidCheck.rows.length > 0) {
                throw new Error('Employee with same Nid already exists');
            }

            if (Number(userData.salary) <= 0) {
                throw new Error('Invalid employee salary');
            }
    
            const { rows } = await UserModel.create(userData);
            return rows[0];
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
    static async updateUser(id, userData) {
        try {
            console.log(id, userData)
            // Check if user exists
            const existingUser = await UserModel.findById(id);
            if (existingUser.rows.length === 0) {
                throw new Error('User not found');
            }
    
            // If email is being updated, check if new email already exists
            if (userData.email) {
                const emailCheck = await query(
                    'SELECT id FROM employees WHERE email = $1 AND id != $2',
                    [userData.email, id]
                );
                if (emailCheck.rows.length > 0) {
                    throw new Error('Email already exists');
                }
            }
    
            // Validate department if it's being updated
            if (userData.department_id) {
                const deptCheck = await query(
                    'SELECT id FROM departments WHERE id = $1',
                    [userData.department_id]
                );
                if (deptCheck.rows.length === 0) {
                    throw new Error('Invalid department ID');
                }
            }
    
            // Validate position if it's being updated
            if (userData.position_id) {
                const posCheck = await query(
                    'SELECT id FROM positions WHERE id = $1',
                    [userData.position_id]
                );
                if (posCheck.rows.length === 0) {
                    throw new Error('Invalid position ID');
                }
            }
            const { rows } = await UserModel.update(id, userData);
            return rows[0];
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    static async deleteUser(userId) {
        try {
            const existingUser = await UserModel.findById(userId);
            if (existingUser.rows.length === 0) {
                throw new Error('User not found');
            }

            await UserModel.softDelete(userId);
            
            return {
                success: true,
                message: 'User deleted successfully'
            };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
    
}

export default UserService;