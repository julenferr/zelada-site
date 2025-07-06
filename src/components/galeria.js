import React, { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import Link from "next/link";

export default function Galeria() {
  const [trabajos, setTrabajos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const filtrosRef = useRef(null);
  const [scrolled48, setScrolled48] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

useEffect(() => {
  const fetchTrabajos = async () => {
    try {
      console.log("✅ URL FETCH:", `${API_URL}/api/trabajos?populate=*&pagination[limit]=100`);
      const res = await fetch(`${API_URL}/api/trabajos?populate=*&pagination[limit]=100`);
      const data = await res.json();
      setTrabajos(data.data || []);
    } catch (error) {
      console.error("❌ Error al obtener trabajos:", error);
    }
  };

  fetchTrabajos();
}, []);


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
    "Todas",
    ...new Set(
      trabajos
        .flatMap((t) => t.categorias?.map((c) => c.nombre) || [])
        .filter(Boolean)
    ),
  ];

  const trabajosFiltrados =
    categoriaSeleccionada === "Todas"
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
    // Extrae solo el nombre del archivo
    const parts = filePath.split("/");
    const fileName = parts[parts.length - 1];
    // Construye la URL de Cloudinary
    return `https://res.cloudinary.com/dxwolohnw/image/upload/zelada-portfolio/${fileName}`;
  };

  return (
    <div className="galeria-container pb-60">
      <div
        ref={filtrosRef}
        className={`filtros sticky top-12 pt-2 pb-2 pl-5 pr-5 transition-all duration-300 ${
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
        const portadaUrl = trabajo.portada?.url;

        return (
          <Link
            key={trabajo.id}
            href={`/trabajo/${trabajo.id}`}
            className="masonry-item"
            data-scroll
            data-scroll-class="is-inview"
          >
            {portadaUrl ? (
              <img
                src={portadaUrl}
                alt={trabajo.titulo}
                className="w-full h-auto"
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
