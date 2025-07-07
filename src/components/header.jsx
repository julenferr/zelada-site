import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const headerRef = useRef(null);
  const [shrink, setShrink] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const handleScroll = () => {
    if (!headerRef.current) return;

    if (router.pathname === "/") {
      // Página principal: shrink cuando header toca h3#proyectos
      const headerRect = headerRef.current.getBoundingClientRect();
      const proyectos = document.getElementById("proyectos");
      if (!proyectos) return;
      const proyectosRect = proyectos.getBoundingClientRect();

      if (headerRect.bottom >= proyectosRect.top) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    } else if (router.pathname.startsWith("/trabajo/")) {
      // Página detalle trabajo: shrink cuando scroll > 10
      if (window.scrollY > 10) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    } else if (router.pathname === "/nosotras") {
      // En la página nosotras, shrink apenas empiece a scrollear
      if (window.scrollY > 1) {
        setShrink(true);
      } else {
        setShrink(false);
      }

    } else {
      setShrink(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [router.pathname]);


  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 border-b bg-white ${
        shrink ? "shrink" : ""
      }`}
    >
      <nav className="flex justify-between items-center px-5 py-5 transition-all duration-300">
        <ul className="flex gap-2 md:gap-8">
          <li>
            <a href="/">Proyectos</a>
          </li>
          <li>
            <Link href="/nosotras">Nosotras</Link>
          </li>
        </ul>
        <a href="/">
          <img
            className={`logo transition-all z-40 duration-300 w-0 md:w-60 h-8 m-0 ${
              shrink ? "shrink" : ""
          }`}
            src="/logo-estudio.svg"
            alt="Logo del estudio Zelada Epstein"
          />
        </a>
      </nav>
    </header>
  );
}
