import Joi from 'joi';

export const createUserSchema = Joi.object({
    employee_id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    joining_date: Joi.date().iso().required(),
    date_of_birth: Joi.date().iso().required(),
    nid_no: Joi.string().required(),
    designation: Joi.string().required(),
    team_id: Joi.number().required(),
    salary: Joi.number().required(),
    type: Joi.string().required()
});

export const updateUserSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    position_id: Joi.number(),
    department_id: Joi.number(),
    salary: Joi.number(),
}).min(1);