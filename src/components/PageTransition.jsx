import React, {
  useEffect,
  useState,
  useRef,
  isValidElement,
  cloneElement,
} from "react";
import { useRouter } from "next/router";

export default function PageTransition({ children }) {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleStart = () => {
      clearTimeout(timeoutRef.current);
      setShowOverlay(true);
      setLoading(true);
      setContentReady(false);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      clearTimeout(timeoutRef.current);
    };
  }, [router]);

  // Control del scroll del body
  useEffect(() => {
    if (showOverlay) {
      document.body.classList.add("transition-active");
    } else {
      document.body.classList.remove("transition-active");
    }
  }, [showOverlay]);

  // Función que se llama cuando el contenido está listo
  const onContentReady = () => {
    setContentReady(true);
    timeoutRef.current = setTimeout(() => {
      setShowOverlay(false);
    }, 500); // tiempo para que la animación de salida termine
  };

  return (
    <>
      {showOverlay && (
        <div
          className={`page-transition-overlay ${loading ? "loading" : "loaded"}`}
        />
      )}

      <div className={`page-content ${showOverlay ? "transition-hidden" : ""}`}>
        {isValidElement(children)
          ? cloneElement(children, { onContentReady })
          : children}
      </div>

      <style jsx>{`
        .page-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #1d1d1d;
          z-index: 9999;
        }

        .page-transition-overlay.loading {
          animation: slideIn 0.7s forwards;
        }

        .page-transition-overlay.loaded {
          animation: slideOut 0.7s forwards;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>

      <style jsx global>{`
        body.transition-active {
          overflow: hidden;
        }

        .page-content.transition-hidden {
          visibility: hidden;
        }
      `}</style>
    </>
  );
}
