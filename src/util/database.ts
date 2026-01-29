import mysql from 'mysql2';
import { config } from 'dotenv';

// Load environment variables
config();

/**
 * MySQL Database Connection Pool
 * 
 * Configuration based on legacy MagnusStella implementation with improvements:
 * - Connection pool validation
 * - Environment variable defaults
 * - Promise-based API
 * - Connection timeout handling
 */

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || process.env.DB_DATABASE || 'magnusstella',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Export promise-based pool for async/await usage
const promisePool = pool.promise();

// Test connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('Database connection established successfully');
  connection.release();
});

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      console.error('Error closing database pool:', err.message);
    } else {
      console.log('Database pool closed');
    }
    process.exit(0);
  });
});

// Export both promise pool (for queries) and regular pool (for session store)
export default promisePool;
export { pool };
