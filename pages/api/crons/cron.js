import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const persianDayOfWeek = (day) => {
  const days = {
    'Sunday': 'یکشنبه',
    'Monday': 'دوشنبه',
    'Tuesday': 'سه‌شنبه',
    'Wednesday': 'چهارشنبه',
    'Thursday': 'پنج‌شنبه',
    'Friday': 'جمعه',
    'Saturday': 'شنبه',
  };
  return days[day] || 'نامشخص';
};

export default async function handler(req, res) {
  if (req.method === 'GET' || req.method === 'DELETE') {
    try {
      // Get Tehran time (UTC+3:30)
      const tehranTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tehran' }));
      const currentDay = tehranTime.toLocaleDateString('en-US', { weekday: 'long' });
      const persianCurrentDay = persianDayOfWeek(currentDay);

      // Delete appointments matching the current Persian day of the week
      const result = await prisma.appointment.deleteMany({
        where: {
          weeks: persianCurrentDay, // Matches appointments for the current Persian day
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
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
