import { dbConnect } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST method allowed' });
  }

  const { name, time, service, day } = req.body;

  if (!name || !time || !service || !day) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const db = await dbConnect();
    const [result] = await db.query('INSERT INTO appointments (name, time, service, day) VALUES (?, ?, ?, ?)', [name, time, service, day]);
    res.status(201).json({ message: 'Appointment created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}
