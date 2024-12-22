import { dbConnect } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET method allowed' });
  }

  try {
    const db = await dbConnect();
    const [rows] = await db.query('SELECT * FROM appointments');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}
