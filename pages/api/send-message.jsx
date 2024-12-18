import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 10, // حداکثر 10 درخواست
});

export default async function handler(req, res) {
  limiter(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Method not allowed" });
    }

    const { name, phone, selectedOption } = req.body;

    // اعتبارسنجی
    if (!name || typeof name !== "string" || name.length < 3) {
      return res.status(400).send({ message: "نام نامعتبر است." });
    }

    if (!phone || !/^\d{10,15}$/.test(phone)) {
      return res.status(400).send({ message: "شماره تلفن نامعتبر است." });
    }

    if (!selectedOption) {
      return res.status(400).send({ message: "لطفاً یک گزینه انتخاب کنید." });
    }

    // توکن و Chat ID از متغیرهای محیطی
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const message = `💬 مشاوره رایگان:\n\n👤 نام: ${name}\n📞 شماره تماس: ${phone}\n📝 فیلد انتخاب شده: ${selectedOption}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      );

      if (response.ok) {
        res.status(200).send({ message: "Message sent successfully" });
      } else {
        const errorData = await response.json();
        console.error("Telegram API Error:", errorData);
        res
          .status(500)
          .send({ message: "Failed to send message", error: errorData });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "Error sending message", error });
    }
  });
}
