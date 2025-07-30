import React, { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import Link from "next/link";
import Image from "next/image";

export default function Galeria({ onReady }) {
  const [trabajos, setTrabajos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const filtrosRef = useRef(null);
  const [scrolled48, setScrolled48] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  //console.log("🌍 API_URL en runtime:", API_URL);

  useEffect(() => {
    const fetchTrabajos = async () => {
      try {
        //console.log("✅ URL FETCH:", `${API_URL}/api/trabajos?populate=*&pagination[limit]=100&sort=orden:asc`);
        const res = await fetch(`${API_URL}/api/trabajos?populate=*&pagination[limit]=100&sort=orden:asc`);
        const data = await res.json();
        //console.log("🚀 RAW API DATA:", JSON.stringify(data, null, 2));
        setTrabajos(data.data || []);
        if (onReady) onReady();
      } catch (error) {
        //console.error("❌ Error al obtener trabajos:", error);
      }
    };



    fetchTrabajos();
  }, [API_URL]);



  useEffect(() => {
    function onScroll() {
      if (!filtrosRef.current) return;
      const rect = filtrosRef.current.getBoundingClientRect();
      setScrolled48(rect.top <= 48);
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categoriasUnicas = [
    "Todos",
    ...new Set(
      trabajos
        .flatMap((t) => t.categorias?.map((c) => c.nombre) || [])
        .filter(Boolean)
    ),
  ];

  const trabajosFiltrados =
    categoriaSeleccionada === "Todos"
      ? trabajos
      : trabajos.filter((t) =>
          t.categorias?.some((c) => c.nombre === categoriaSeleccionada)
        );

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
  };

  const getCloudinaryUrl = (filePath) => {
    if (!filePath) return "";
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    return `https://res.cloudinary.com/dxwolohnw/image/upload/zelada-portfolio/${fileName}`;
  };

  return (
    <div className="galeria-container pb-60">
      <div
        ref={filtrosRef}
        className={`filtros sticky md:top-12 top-10 pt-2 pb-2 pl-5 pr-5 transition-all duration-300 ${
          scrolled48 ? "filtros-scrolled" : ""
        }`}
      >
        {categoriasUnicas.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaSeleccionada(cat)}
            className={categoriaSeleccionada === cat ? "activo" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid pr-5 pl-5"
        columnClassName="masonry-column"
      >
        {trabajosFiltrados.map((trabajo) => {
          //console.log("🎯 Trabajo individual:", JSON.stringify(trabajo, null, 2));

          const portadaUrl = trabajo.portada?.url;

          return (
            <Link
              key={trabajo.id}
              href={`/trabajo/${trabajo.slug}`}
              className="masonry-item"
              data-scroll
              data-scroll-class="is-inview"
              onClick={() => {
                const scrollY = window.scrollY || window.pageYOffset;
                sessionStorage.setItem("saved-scroll", scrollY);
                sessionStorage.setItem("from-detail", "true");
              }}
            >
              {portadaUrl ? (
                <img
                  src={portadaUrl}
                  alt={trabajo.titulo}
                  width={700}
                  height={300}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAADwb0VmAAAAG0lEQVR42mNgGAWjYBSMglEwCkbEGDCEGwAAQbcDTUpAap8AAAAASUVORK5CYII="
                />
              ) : (
                <div className="bg-gray-200 aspect-[4/3]"></div>
              )}
              <span className="volanta-home block uppercase pt-5 saol">{trabajo.volantaHome}</span>
              <h3 className="p-0 pt-2 pb-10">{trabajo.tituloHome}</h3>
            </Link>
          );
        })}
      </Masonry>
    </div>
  );
}