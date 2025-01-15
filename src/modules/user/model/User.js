import { query } from '../../../config/database.js';

class UserModel {
    static async findAll() {
        // const sql = `
        //     SELECT 
        //         e.id,
        //         e.employee_id,
        //         e.first_name,
        //         e.last_name,
        //         e.email,
        //         e.phone,
        //         e.hire_date,
        //         d.name as department,
        //         p.title as position,
        //         e.salary
        //     FROM employees e
        //     LEFT JOIN departments d ON e.department_id = d.id
        //     LEFT JOIN positions p ON e.position_id = p.id
        //     ORDER BY e.id DESC
        // `;
        const sql = `
            SELECT *
            FROM employees
        `;
        return query(sql);
    }

    static async findById(id) {
        // const sql = `
        //     SELECT 
        //         e.id,
        //         e.employee_id,
        //         e.first_name,
        //         e.last_name,
        //         e.email,
        //         e.phone,
        //         e.hire_date,
        //         d.name as department,
        //         p.title as position,
        //         e.salary
        //     FROM employees e
        //     LEFT JOIN departments d ON e.department_id = d.id
        //     LEFT JOIN positions p ON e.position_id = p.id
        //     WHERE e.id = $1
        // `;
        const sql = `
            SELECT *
            FROM employees where id = $1
        `;
        return query(sql, [id]);
    }

    static async create(userData) {
        try {
            // await query('BEGIN');
            
            const sql = `
                INSERT INTO employees (
                    employee_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    joining_date,
                    date_of_birth,
                    nid_no,
                    designation,
                    team_id,
                    salary,
                    type
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                RETURNING 
                    id,
                    employee_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    salary,
                    type
            `;
            
            const values = [
                userData.employee_id,
                userData.first_name,
                userData.last_name,
                userData.email,
                userData.phone,
                userData.joining_date,
                userData.date_of_birth,
                userData.nid_no,
                userData.designation,
                userData.team_id,
                userData.salary,
                userData.type
            ];
    
            return await query(sql, values);
        } catch (error) {
            throw error;
        }
    }

    static async update(id, userData) {
        const updates = [];
        const values = [];
        let paramCount = 1;
    
        Object.keys(userData).forEach(key => {
            if (userData[key] !== undefined) {
                updates.push(`${key} = $${paramCount}`);
                values.push(userData[key]);
                paramCount++;
            }
        });
    
        values.push(id);
    
        const sql = `
            UPDATE employees
            SET ${updates.join(', ')},
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $${paramCount}
            RETURNING 
                id,
                employee_id,
                first_name,
                last_name,
                email,
                phone,
                salary,
                created_at,
                updated_at
        `;
    
        return query(sql, values);
    }

    static async softDelete(id) {
        const sql = `
            UPDATE employees
            SET is_deleted = true,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
        `;
    
        return query(sql, [id]);
    }
}

export default UserModel;