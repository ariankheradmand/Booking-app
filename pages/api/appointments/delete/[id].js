export default async function handler(req, res) {
  if (req.method === 'DELETE' || req.method === 'GET') {
    try {
      // Tehran time is UTC+3:30
      const tehranTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tehran' }));
      const currentDay = tehranTime.toLocaleDateString('en-US', { weekday: 'long' });
      const persianCurrentDay = persianDayOfWeek(currentDay);

      // Delete appointments matching the current Persian day of the week
      const result = await prisma.appointment.deleteMany({
        where: {
          weeks: persianCurrentDay,
        },
      });

      console.log(`Deleted ${result.count} appointments for day: ${persianCurrentDay}`);
      return res
        .status(200)
        .json({ message: `Deleted ${result.count} appointments for day: ${persianCurrentDay}` });
    } catch (error) {
      console.error('Error deleting appointments:', error);
      return res.status(500).json({
        error: 'Failed to delete appointments',
        details: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
