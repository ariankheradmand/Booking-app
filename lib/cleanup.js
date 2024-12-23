import prisma from './prisma';

const cleanupOldAppointments = async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  try {
    await prisma.appointment.deleteMany({
      where: {
        date: {
          lt: yesterday, // حذف رزروهای قبل از امروز
        },
      },
    });
    console.log('رزروهای قدیمی حذف شدند.');
  } catch (error) {
    console.error('خطا در حذف رزروهای قدیمی:', error);
  }
};

cleanupOldAppointments();
