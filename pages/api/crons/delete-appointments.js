// pages/api/cron/delete-appointments.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const persianDays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];

export default async function handler(req, res) {
  try {
    // Determine current Persian day of the week
    const date = new Date();
    const currentDayIndex = date.getDay(); // 0 for Sunday in JS, but we use Persian naming
    const currentPersianDay = persianDays[currentDayIndex];

    // Prisma query to delete appointments
    const deleteResult = await prisma.appointment.deleteMany({
      where: {
        weeks: currentPersianDay
      }
    });

    console.log(`Deleted ${deleteResult.count} appointments for ${currentPersianDay}`);

    // Logging for server-side
    res.status(200).json({ message: `Successfully deleted appointments for ${currentPersianDay}`, count: deleteResult.count });
  } catch (error) {
    console.error('Error executing cron job:', error);
    res.status(500).json({ message: 'Failed to execute cron job', error: error.message });
  }
}