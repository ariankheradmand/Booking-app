export default function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { username, password } = req.body;
  
    // اعتبارسنجی اطلاعات
    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASS
    ) {
      // ایجاد سشن یا توکن
      res.setHeader(
        "Set-Cookie",
        `admin_auth=true; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`
      );
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  }
  