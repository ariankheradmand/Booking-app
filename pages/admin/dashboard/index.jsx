import { useRouter } from "next/router";
import Sections from "./sections";
import Adding from "./adding";
import Image from "next/image";
import "../../../app/globals.css";
export async function getServerSideProps(context) {
  const { req } = context;
  const adminAuth = req.cookies.admin_auth;

  // اگر کوکی معتبر نیست، کاربر را به صفحه اصلی منتقل کن
  if (!adminAuth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // در صورت معتبر بودن کوکی، صفحه به طور معمول رندر می‌شود
  return {
    props: {}, // می‌توانید اطلاعات دیگری هم پاس دهید
  };
}

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });

    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[url('/admin-bg.svg')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
       <Image
        alt="site-logo"
        className="top-5"
        src="/admin-logo.svg"
        width={120}
        height={116}
      />
      <Adding />
      <Sections />
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg absolute right-2 top-2"
      >
        خروج
      </button>
    </div>
  );
}
