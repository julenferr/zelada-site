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

  // Restaurar scroll si hay guardado
  const savedScroll = sessionStorage.getItem("scrollPosition");

  if (savedScroll) {
    // Esperamos que todo esté pintado, y scroll esté inicializado
    setTimeout(() => {
      requestAnimationFrame(() => {
        scroll.scrollTo(parseInt(savedScroll), {
          duration: 0,
          disableLerp: true,
        });
      });
    }, 300); // tiempo más largo para asegurar carga
  }

  // Guardar scroll al salir
  const saveScroll = () => {
    const scrollY = scroll.scroll?.instance?.scroll?.y || 0;
    sessionStorage.setItem("scrollPosition", scrollY);
  };

  // Si es recarga completa, podés limpiar scroll guardado
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
