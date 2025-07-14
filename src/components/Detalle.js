import React, { useState, useRef } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

// Componente separado para el video con botón de play
const VideoSlide = ({ src }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handlePause = () => setPlaying(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        src={src}
        controls
        muted
        playsInline
        preload="metadata"
        onPause={handlePause}
        onEnded={handlePause}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
        }}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg viewBox="0 0 24 24" width="40" height="40" fill="#fff">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}
    </div>
  );
};

const Detalle = ({ imagenes }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

  const slides = imagenes
    .map((item) => {
      const fullUrl = item.url.startsWith("http") ? item.url : baseUrl + item.url;

      if (item.mime.startsWith("image")) {
        return { type: "image", src: fullUrl };
      } else if (item.mime.startsWith("video")) {
        return {
          type: "custom-video",
          src: fullUrl,
          mime: item.mime,
        };
      }
      return null;
    })
    .filter(Boolean);

  const handleClick = (i) => {
    setIndex(i);
    setOpen(true);
  };

  // ahora simplemente usa el componente VideoSlide
  const render = ({ slide }) => {
    if (slide.type === "custom-video") {
      return <VideoSlide src={slide.src} />;
    }
    return null;
  };

  return (
    <div>
      <div>
        {imagenes.map((img, i) => {
          const fullUrl = img.url.startsWith("http") ? img.url : baseUrl + img.url;
          return (
            <div
              key={img.id || i}
              onClick={() => handleClick(i)}
              className="mb-5 cursor-pointer"
              style={{ position: "relative", width: "100%" }}
            >
              {img.mime.startsWith("image") ? (
                <Image
                  src={fullUrl}
                  alt={img.name || ""}
                  width={1200}
                  height={800}
                />
              ) : (
                <video
                  src={fullUrl}
                  className="w-full h-auto"
                  controls
                  muted
                  preload="metadata"
                  playsInline
                />
              )}
            </div>
          );
        })}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        render={{ slide: render }}
        on={{ view: ({ index }) => setIndex(index) }}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 4,
          doubleTapDelay: 300,
          wheelZoomRatio: 0.2,
          pinchZoom: true,
          scrollToZoom: true,
        }}
      />
    </div>
  );
};

export default Detalle;
