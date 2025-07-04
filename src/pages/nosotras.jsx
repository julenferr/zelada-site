// pages/nosotras.jsx
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Cabezal from "../components/cabezal";
import Head from "next/head";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function Nosotras() {

  const scrollContainerRef = useRef(null);
  const scrollInstanceRef = useRef(null);
  const [isContentReady, setIsContentReady] = useState(false);

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
    <>

      <Header />

      <main className="pt-20">
        <div className="px-4 md:px-2">
        	<h2
        		id="proyectos"
        		className="w-full pl-0 pr-0 md:pl-5 md:pr-5 mt-0 md:mt-10 cormorant font-thin items-center"
      			>
        		<img
          			src="/nosotras.svg"
          			alt="Nosotras"
          			data-scroll
          			data-scroll-speed="0.2"
          			className="w-full"
          			style={{ display: "block" }}
        		/>
      		</h2>
        </div>
        <div className="px-5 relative zeta md:col-span-12 grid col-span-4 grid-cols-4 md:grid-cols-12 gap-5 mt-20 mb-0 md:-mt-10">
        	<div className="estudio col-start-1 md:col-start-2 col-span-2 md:col-span-3">
        		<p>Somos un estudio de diseño con fuerte impronta en ilustración.</p>
        	</div>
        	<div className="zeta col-start-0 md:col-start-4 col-span-4 md:col-span-8" data-scroll data-scroll-speed="-0.2">
        		<img src="http://localhost:1337/uploads/zelada_esptein_foto_grande_ced0937239.webp" alt="" />
        	</div>
        </div>

        <p className="px-5 nosotras-parrafo -mt-5 md:-mt-14">Ana Zelada y Natalia Epstein —diseñadora gráfica e ilustradora— trabajan juntas desde  el año 2021. Comparten una manera de abordar cada proyecto basada en el compromiso con la realidad y sus contextos, la atención al detalle, el pensamiento conceptual y una sensibilidad plástica que atraviesa sus producciones.</p>
        <p className="px-5 nosotras-parrafo mt-10 md:mt-20">Desarrollan proyectos de comunicación visual en diversas áreas —arte, cultura, sector institucional, público y privado—, con una sólida trayectoria en el ámbito editorial.</p>

        <div className="px-5 grid grid-cols-4 md:grid-cols-12 gap-5 mt-50">
        	<div className="perfiles col-start-1 md:col-start-2 col-span-4" data-scroll data-scroll-speed="0.2">
        		<img className="zeta" src="http://localhost:1337/uploads/zelada_epstein_ana_80e1fd2e57.webp" alt="" data-scroll data-scroll-speed="-0.1"/>
        		<span className="block neue ml-0 md:ml-30 -mt-20 mb-2">Ana Zelada</span>
        		<p className="ml-0 md:ml-30 w-73 span-2 grid">Aliquam vel aliquet justo. Proin quis eros sodales, varius ligula et, eleifend ex. Morbi tempus efficitur velit id convallis. In hac habitasse platea dictumst. Donec non tortor ut eros elementum porttitor ac id erat.</p>
        	</div>
        	<div className="perfiles col-start-0 md:col-start-8 col-span-4 mt-80 md:mt-120" data-scroll data-scroll-speed="-0.1">
        		<img className="zeta" src="http://localhost:1337/uploads/zelada_epstein_natalia_6e577e4529.webp" alt="" data-scroll data-scroll-speed="-0.2" />
        		<span className="block neue ml-0 md:ml-30 -mt-20 mb-2">Natalia Epstein</span>
        		<p className="ml-0 md:ml-30 w-73 span-2 grid">Aliquam vel aliquet justo. Proin quis eros sodales, varius ligula et, eleifend ex. Morbi tempus efficitur velit id convallis. In hac habitasse platea dictumst. Donec non tortor ut eros elementum porttitor ac id erat.</p>
        	</div>
        </div>
        <div className="mt-70"> 
        	<img src="http://localhost:1337/uploads/nosotras_foto_grande_screen_3cdec8aaa8.webp" alt="" />
        </div>
      </main>

      <Footer />
    </>
  );
}
