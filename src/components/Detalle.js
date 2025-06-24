import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Detalle = ({ imagenes }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const baseUrl = "http://localhost:1337";

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

  // 👇 Render personalizado para video
  const render = ({ slide }) => {
    if (slide.type === "custom-video") {
      return (
        <video
          src={slide.src}
          controls
          muted
          playsInline
          preload="metadata"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <div className="">
        {imagenes.map((img, i) => {
          const fullUrl = img.url.startsWith("http") ? img.url : baseUrl + img.url;
          return (
            <div key={img.id || i} onClick={() => handleClick(i)} className="mb-5 cursor-pointer">
              {img.mime.startsWith("image") ? (
                <img src={fullUrl} alt={img.name || ""} className="w-full h-auto" />
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
      />
    </div>
  );
};

export default Detalle;
