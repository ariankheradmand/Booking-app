import mysql from 'mysql2/promise';

export async function dbConnect() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
  });

  return db;
}
