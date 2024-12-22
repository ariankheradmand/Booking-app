import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import "../../app/globals.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      router.push("/admin/dashboard");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center bg-[url('/admin-bg.svg')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <Image
        alt="site-logo"
        className="absolute top-5"
        src="/admin-logo.svg"
        width={120}
        height={116}
      />
      <form onSubmit={handleLogin} className="flex flex-col gap-4 items-center justify-center relative">
        <input
          dir="rtl"
          placeholder="نام کاربری"
          className="bg-white text-black py-2 px-1 rounded-xl placeholder:text-black placeholder:opacity-45"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          dir="rtl"
          type="password"
          placeholder="رمزعبور"
          className="bg-white text-black py-2 px-1 rounded-xl placeholder:text-black placeholder:opacity-45"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-accent w-28 py-2 rounded-xl">ورود</button>
        {error && <p className="text-red-500 bg-red-400 px-2 py-1 rounded-xl border border-red-900 ">{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
