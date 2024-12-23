import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function get(req , res) {
    if (req.method === "GET") {
        try {
            const appointment = await prisma.appointment.findMany();
        
            res.status(200).json(appointment);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            res.status(500).json({error : "Error getting appointment"})
        }
    }else {
        req.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}