import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import "../../app/globals.css";

export async function getServerSideProps(context) {
  const { req } = context;
  const adminAuth = req.cookies.admin_auth;

  if (adminAuth) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage("ورود موفقیت‌آمیز بود!"); // Set the success message
        setTimeout(() => {
          router.push("/admin/dashboard"); // Redirect after showing success message for a brief moment
        }, 1500); // Show success message for 1.5 seconds
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (error) {
      setError("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[url('/admin-bg.svg')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
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
          className="bg-white text-black py-2 px-3 rounded-xl placeholder:text-black placeholder:opacity-45 nav-show"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <input
          dir="rtl"
          type="password"
          placeholder="رمزعبور"
          className="bg-white text-black py-2 px-3 rounded-xl placeholder:text-black placeholder:opacity-45 nav-show"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="bg-accent w-28 py-2 rounded-xl nav-show"
          disabled={isLoading}
        >
          {isLoading ? 'در حال بارگذاری...' : 'ورود'}
        </button>
        {error && <p className="text-red-500 bg-red-400 px-2 py-1 rounded-xl border border-red-900 ">{error}</p>}
        {successMessage && <p dir="rtl" className="text-green-800 bg-green-400 px-2 py-1 rounded-xl border border-green-900 ">{successMessage}</p>}
        {isLoading && <div className="loading-overlay"></div>}
      </form>
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;