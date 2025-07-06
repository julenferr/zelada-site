import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Detalle from "../../components/Detalle";
import Header from "../../components/header";
import Footer from "../../components/footer";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function TrabajoDetalle() {
  const router = useRouter();
  const { id } = router.query;

  const [trabajo, setTrabajo] = useState(null);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const locoScrollRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

useEffect(() => {
  if (!id) return;

  const fetchTrabajo = async () => {
    try {
      console.log("🔍 Buscando trabajo en:", `${API_URL}/api/trabajos/${id}?populate=*&publicationState=preview`);
      const res = await fetch(`${API_URL}/api/trabajos/${id}?populate=*&publicationState=preview`);
      const data = await res.json();

      if (data && data.data) {
        setTrabajo(data.data);
        console.log("✅ Trabajo recibido:", data.data);
      } else {
        console.warn("⚠️ No se encontró data para ese ID");
      }
    } catch (error) {
      console.error("❌ Error fetching trabajo:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTrabajo();
}, [id]);


  useEffect(() => {
    if (scrollRef.current && typeof window !== "undefined") {
      locoScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.07,
        multiplier: 1.1,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      });

      return () => {
        if (locoScrollRef.current) locoScrollRef.current.destroy();
      };
    }
  }, [loading]);

  if (loading) return <p>Cargando...</p>;
  if (!trabajo) return <p>No se encontró el trabajo.</p>;

  // ✅ ahora accedemos directo a las propiedades
  const { titulo, descripcion, imagenes } = trabajo;

  return (
    <div id="detalle-trabajo">
      <Header />

      <div
        ref={scrollRef}
        data-scroll-container
        className="detalle-trabajo pb-30 pt-20 grid grid-cols-4 md:grid-cols-12 gap-5">
        <div className="pl-5 pr-5 relative md:sticky md:top-20"
          style={{
            gridColumn: "span 4",
            alignSelf: "start",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => router.back()}
            className="mb-8 text-sm text-purple-600 hover:underline"
          >
            <img
              className="flecha-volver"
              src="/flecha-abajo-zelada.svg"
              alt="flecha hacia atrás"
            />
          </button>
          <h2 className="pb-8">{titulo}</h2>
          <p style={{ whiteSpace: "pre-line" }}>{descripcion}</p>
        </div>

        <div className="col-span-0 md:col-span-2">{/* espacio en blanco */}</div>

        <div className="col-span-4 md:col-span-6">
          <Detalle imagenes={imagenes} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
