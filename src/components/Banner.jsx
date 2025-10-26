import { useState, useEffect } from "react";
import BannerDesktop from "../assets/banner-desktop.png";
import BannerMobile from "../assets/banner-mobile.png";

function Banner() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <figure className="banner1">
      <img
        src={isMobile ? BannerMobile : BannerDesktop}
        alt="logo"
      />
    </figure>
  );
}

export default Banner;
