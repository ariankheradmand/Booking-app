import { dbConnect } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Only PUT method allowed' });
  }

  const { id, name, time, service, day } = req.body;

  if (!id || !name || !time || !service || !day) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const db = await dbConnect();
    await db.query('UPDATE appointments SET name = ?, time = ?, service = ?, day = ? WHERE id = ?', [name, time, service, day, id]);
    res.status(200).json({ message: 'Appointment updated' });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}
