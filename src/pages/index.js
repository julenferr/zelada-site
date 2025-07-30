import React, { useEffect, useRef } from "react";
import Head from "next/head"; 
import Galeria from "../components/galeria";
import Marquee from "../components/marquee";
import Cabezal from "../components/cabezal";
import Header from "../components/header";
import Footer from "../components/footer";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function Home() {
  const scrollContainerRef = useRef(null);
  const scrollInstanceRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
      lerp: 0.08,
    });

    scrollInstanceRef.current = scroll;

    // Si hay scroll guardado, lo restauramos
    const savedScroll = sessionStorage.getItem("scrollPosition");
    if (savedScroll) {
      setTimeout(() => {
        scroll.scrollTo(parseInt(savedScroll), {
          duration: 0,
          disableLerp: true,
        });
      }, 100);
    }

    // Guardamos scroll al salir
    const saveScroll = () => {
      const scrollY = scroll.scroll.instance.scroll.y;
      sessionStorage.setItem("scrollPosition", scrollY);
    };

    // También limpiamos si es recarga completa (opcional)
    if (performance.navigation.type === 1) {
      sessionStorage.removeItem("scrollPosition");
    }

    window.addEventListener("beforeunload", saveScroll);
    window.addEventListener("pagehide", saveScroll);

    return () => {
      saveScroll();
      scroll.destroy();
      window.removeEventListener("beforeunload", saveScroll);
      window.removeEventListener("pagehide", saveScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Zeladaepstein - Estudio de diseño</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portfolio de zelada" />
      </Head>

      <div ref={scrollContainerRef} data-scroll-container>
        <Cabezal />
        <Header />
        <div id="trigger" className="h-1" />

        <h3
          id="proyectos"
          className="w-full pl-5 pr-5 mt-10 md:mt-30 cormorant font-thin items-center"
        >
          <img
            src="/proyectos.svg"
            alt="Proyectos"
            data-scroll
            data-scroll-speed="0.1"
            className="w-full"
            style={{ display: "block" }}
          />
        </h3>

        <Galeria />
        <Footer />
      </div>
    </>
  );
}
