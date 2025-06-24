// Aquí importamos CSS global UNA SOLA VEZ para toda la app
import '../components/galeria.css';
import '../pages/trabajo/[id].css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}