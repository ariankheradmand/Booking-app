import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setShowLogo(true); // Trigger animation on component mount
  }, []);

  return (
    <nav className="h-36 w-full bg-accent flex items-center justify-center rounded-b-xl nav-show mb-3">
      <Image
        className="absolute left-0 top-36 z-10"
        alt="floral-design"
        src="floral-design.svg"
        width={150}
        height={150}
      />
      <Image
        src="/Main-Logo.svg"
        width={150}
        height={100}
        className={`transition-all duration-500 ${showLogo ? "logo-enter-active" : "logo-enter"}`}
        alt="Main Logo"
      />
    </nav>
  );
}
