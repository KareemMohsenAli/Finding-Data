import mysql from 'mysql2';
export const pool = mysql.createPool({
    host: 'localhost', // Replace with your MySQL host
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'server', // Replace with your MySQL database name
    connectionLimit: 10, // Adjust the connection pool size as needed
  });

  pool.getConnection((err,connection)=> {
    if (err) throw err;
  console.log('Connected to MySQL database!');
  connection.release(); // Release the connection back to the pool
  })
  
  

