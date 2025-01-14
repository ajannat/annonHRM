import { query } from '../../../config/database.js';
import UserModel from '../model/User.js';

class UserService {
    static async getAllUsers() {
        try {
            const { rows } = await UserModel.findAll();
            return rows;
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
    
            // Check if email already exists
            const empIdCheck = await query(
                'SELECT id FROM employees WHERE employee_id = $1',
                [userData.employee_id]
            );
            if (empIdCheck.rows.length > 0) {
                throw new Error('Email already exists');
            }

            // Check if email already exists
            const emailCheck = await query(
                'SELECT id FROM employees WHERE email = $1',
                [userData.email]
            );
            if (emailCheck.rows.length > 0) {
                throw new Error('Email already exists');
            }
    
            // Check if department exists
            // const deptCheck = await query(
            //     'SELECT id FROM departments WHERE id = $1',
            //     [userData.department_id]
            // );
            // if (deptCheck.rows.length === 0) {
            //     throw new Error('Invalid department ID');
            // }
    
            // Check if position exists
            // const posCheck = await query(
            //     'SELECT id FROM positions WHERE id = $1',
            //     [userData.position_id]
            // );
            // if (posCheck.rows.length === 0) {
            //     throw new Error('Invalid position ID');
            // }
    
            const { rows } = await UserModel.create(userData);
            return rows[0];
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
}

export default UserService;