import '../components/galeria.css';
import '../pages/trabajo/[id].css';
import '../styles/globals.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps, router: currentRouter }) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Cuando la ruta empieza a cambiar → ocultar
    const handleStart = () => {
      setIsTransitioning(true);
    };

    // Cuando la ruta terminó de cambiar → mostrar
    const handleComplete = () => {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // opcional: para dar tiempo a que monte
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Primera carga
    handleComplete();

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <div
      key={router.asPath} // importante para que el efecto se reinicie
      style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}
