import { dbConnect } from '../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Only DELETE method allowed' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing appointment ID' });
  }

  try {
    const db = await dbConnect();
    await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
}
