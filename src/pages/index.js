import React, { useEffect, useRef } from "react";
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

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollContainerRef} data-scroll-container>
      <Cabezal />
      <Header />
      <div id="trigger" className="h-1" />

      <h3
        id="proyectos"
        className="w-full pl-5 pr-5 mt-16 md:mt-30 cormorant font-thin items-center"
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
  );
}
