export default function Cabezal() {
  return (
    <div className="cabezal flex flex-col justify-between pt-5">
    
      <div class="marquee" data-scroll data-scroll-speed="-0.2">
        <div class="marquee-track">
          <div class="marquee-group">
            <img src="https://res.cloudinary.com/dxwolohnw/image/upload/v1752450532/zelada_epstein_logo_dc262473b5.svg" alt="Zelada Epstein Logo" />
            <img src="https://res.cloudinary.com/dxwolohnw/image/upload/v1752450532/zelada_epstein_logo_dc262473b5.svg" alt="Zelada Epstein Logo" />
            <img src="https://res.cloudinary.com/dxwolohnw/image/upload/v1752450532/zelada_epstein_logo_dc262473b5.svg" alt="Zelada Epstein Logo" />
          </div>
          <div class="marquee-group">
            <img src="https://res.cloudinary.com/dxwolohnw/image/upload/v1752450532/zelada_epstein_logo_dc262473b5.svg" alt="Zelada Epstein Logo" />
            <img src="https://res.cloudinary.com/dxwolohnw/image/upload/v1752450532/zelada_epstein_logo_dc262473b5.svg" alt="Zelada Epstein Logo" />
            <img src="https://res.cloudinary.com/dxwolohnw/image/upload/v1752450532/zelada_epstein_logo_dc262473b5.svg" alt="Zelada Epstein Logo" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-5 pl-5 pr-5 pb-20 md:pb-5">
        <div className="col-span-1">
          <img className="flecha-abajo" src="/flecha-abajo-zelada.svg" alt="Flecha hacia abajo" />
        </div>
        <div className="col-span-3"> </div>
        <div className="bloque-h2 col-span-8 z-10">
          <h2>Zelada • Epstein es un estudio de diseño con fuerte impronta en la  <i>ilustración</i>. Desarrolla proyectos de comunicación visual en diversas áreas —arte, cultura, sector institucional, público y privado—, con una sólida trayectoria en el ámbito editorial.</h2>
        </div>
      </div>
    </div>


  );
}
