import React, { useState, useRef, useEffect } from "react";

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

  useEffect(() => {
    if (videoRef.current) {
      // ⚠️ Fuerza que el navegador renderice un frame visible
      videoRef.current.currentTime = 0.1;
    }
  }, []);

  return (
    <div style={{ position: "relative", height: "100%" }}>
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
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
      {!playing && (
        <button
          className="boton-ocultar"
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
