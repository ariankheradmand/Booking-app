// pages/api/appointments/delete/[id].js
import prisma from '../../../../lib/prisma'; // Assuming you have prisma client in lib/prisma.js

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query; // Get the id from the URL params

    try {
      // Find and delete the appointment by id
      const appointment = await prisma.appointment.delete({
        where: {
          id: parseInt(id), // Convert the id to an integer
        },
      });

      return res.status(200).json({ message: 'Appointment deleted successfully', appointment });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(500).json({ error: 'Appointment not found or error occurred' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
