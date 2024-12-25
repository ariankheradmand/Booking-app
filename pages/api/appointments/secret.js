import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function get(req, res) {
    if (req.method === "GET") {
        try {
            // فقط فیلدهای مورد نیاز را انتخاب کنید
            const appointments = await prisma.appointment.findMany({
                select: {
                    weeks: true, // تاریخ نوبت
                    hours: true, // زمان نوبت
                },
            });

            res.status(200).json(appointments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error getting appointment" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
