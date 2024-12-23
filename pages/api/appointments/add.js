import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, weeks, hours, service, phoneNumber } = req.body;
      
      const appointment = await prisma.appointment.create({
        data: {
          name,
          weeks,
          hours,
          service,
          phoneNumber
        }
      });

      res.status(200).json(appointment);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error : "Failed to create appointment" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}