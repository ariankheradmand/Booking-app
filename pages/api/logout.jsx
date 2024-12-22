export default function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    // حذف کوکی admin_auth
    res.setHeader(
      "Set-Cookie",
      `admin_auth=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
    );
  
    return res.status(200).json({ success: true });
  }
  