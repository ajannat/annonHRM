
import app from './app.js';
import { pool } from './config/database.js';

await pool.query('SELECT NOW()');
console.log('Database connected');

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});