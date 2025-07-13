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
  const [data, setData] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://zeladaepstein.com.ar";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`🔍 Fetching desde ${API_URL}/api/nosotrasses?populate=*`);
        const res = await fetch(`${API_URL}/api/nosotrasses?populate=*`);
        const json = await res.json();
        console.log("✅ DATA RAW:", json);

        if (json.data && json.data.length > 0) {
          setData(json.data[0]); // ✅ SIN .attributes
        } else {
          console.warn("⚠️ No hay datos cargados en nosotrasses");
          setData({});
        }
      } catch (err) {
        console.error("❌ Error fetching nosotrasses:", err);
      }
    };

    fetchData();
  }, []);


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
  document.body.classList.add('nosotras-body');

  return () => {
    document.body.classList.remove('nosotras-body');
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
        <div className="fondis px-5 relative zeta md:col-span-12 grid col-span-4 grid-cols-4 md:grid-cols-12 gap-5 mt-10 mb-0 md:-mt-10">
        	<div className="estudio col-start-1 md:col-start-2 col-span-2 md:col-span-3">
        		<p className="blend md:block hidden">Somos un estudio de diseño con fuerte impronta en ilustración.</p>
        	</div>
        	<div className="zeta col-start-0 md:col-start-4 col-span-4 md:col-span-8" data-scroll data-scroll-speed="-0.1">
            {data?.portada?.url && (
              <img src={`${data.portada.url}`} alt="Portada" />
            )}
        	</div>
        </div>

        
        <p className="px-5 nosotras-parrafo mt-10 md:mt-14">
          {data?.parrafo1}
        </p>
        <p className="px-5 nosotras-parrafo mt-10 md:mt-20">
          {data?.parrafo2}
        </p>


        <div className="px-5 grid grid-cols-4 md:grid-cols-12 gap-5 md:mt-30 mt-0">
        	<div className="perfiles col-start-1 md:col-start-2 col-span-4 relative isolate" data-scroll data-scroll-speed="0.1">
            {data?.imagenAna?.url && (
              <img src={`${data.imagenAna.url}`} className="zeta" alt="Portada" data-scroll data-scroll-speed="-0.1" />
            )}
        		<span className="block ml-0 md:ml-0 mt-10 mb-5 blend saol" >Ana Zelada</span>
        		<p className="ml-0 md:ml-0 span-4 grid" style={{ whiteSpace: "pre-line" }}>
              {data?.bioAna}
            </p>
        	</div>
        	<div className="perfiles col-start-0 md:col-start-8 col-span-4 mt-20 md:mt-120" data-scroll data-scroll-speed="0.2">
        		{data?.imagenAna?.url && (
              <img src={`${data.imagenNati.url}`} className="zeta" alt="Portada" data-scroll data-scroll-speed="-0.1"/>
            )}
        		<span className="block ml-0 md:ml-0 mt-10 mb-5 blend saol">Natalia Epstein</span>
        		<p className="ml-0 md:ml-0 span-4 grid" style={{ whiteSpace: "pre-line" }} >
              {data?.bioNati}
            </p>
        	</div>
        </div>
        <p className="px-5 nosotras-parrafo mt-10 md:mt-20" data-scroll data-scroll-speed="0.2">
          Conciben la imagen como una herramienta central de comunicación, buscando transmitir ideas con claridad, profundidad y sensibilidad en cada pieza.
        </p>
        <div className="-mt-10"> 
        	{data?.imagenFull?.url && (
              <img src={`${data.imagenFull.url}`} className="zeta" alt="Portada" data-scroll data-scroll-speed="-0.1"/>
            )}        </div>
      </main>

      <Footer />
    </>
  );
}
