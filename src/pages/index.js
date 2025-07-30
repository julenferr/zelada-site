import React, { useEffect, useRef, useState } from "react";
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
  const [readyToScroll, setReadyToScroll] = useState(false);
  


  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollContainerRef.current,
      smooth: true,
      lerp: 0.08,
    });

    scrollInstanceRef.current = scroll;

    return () => {
      scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("saved-scroll");
    const fromDetail = sessionStorage.getItem("from-detail");

    if (fromDetail === "true" && savedScroll && readyToScroll) {
      const target = parseFloat(savedScroll);
      console.log("🔁 Restaurando scroll a:", target);

      setTimeout(() => {
        // 👇 Forzar que LocomotiveScroll recalculé su layout
        if (scrollInstanceRef.current) {
          scrollInstanceRef.current.update?.();
        }

        scrollInstanceRef.current.scrollTo(target, {
          duration: 0,
          disableLerp: true,
        });

        sessionStorage.removeItem("saved-scroll");
        sessionStorage.removeItem("from-detail");
      }, 500);
    }
  }, [readyToScroll]);





  

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

        <Galeria onReady={() => setReadyToScroll(true)} />
        <Footer />
      </div>
    </>
  );
}