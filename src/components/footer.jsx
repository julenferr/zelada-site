// componente footer

export default function Footer() {
  return (
    <footer data-scroll data-scroll-speed="-0.2" id="footer" className="pt-5 gap-5 relative flex justify-between flex-col">
    	<img data-scroll data-scroll-repeat="repeat" data-scroll-delay="5" data-scroll-class="is-inview" className="in-view pl-5 pr-5 col-span-12" src="/logo-blanco.svg" alt="Logo estudio Zelada Epstein" />
    	<div className="pl-5 pr-5 col-span-12 grid grid-cols-4 md:grid-cols-12">
    		<p className="col-start-1 md:col-start-2 col-span-12 md:col-span-3 font-light md:mb-0 mb-10">Somos un estudio de diseño con fuerte impronta en la <i>ilustración</i>.</p>
    		<ul className="col-start-1 md:col-start-8 col-span-12 md:col-span-3">
    			<li className="mb-7 mt-2">
    			   <span className="mb-2" >CONTACTANOS</span>
    			   <a className="ml-9" href="#">hola@zeladaepstein.com.ar</a>
    			</li>
    			<li>
    			   <span className="mb-2">DIRECCIÓN</span>
    			   <a className="ml-9 block" href="#">Avenida General Mosconi 2615, Buenos Aires, Argentina</a>
    			</li>
    		</ul>
    	</div>
    	<div className="pl-5 pr-5 grid grid-cols-4 md:grid-cols-12 gap-5 text-white info pt-5 pb-5">
    		<span className="col-start-1 md:col-start-2 col-span-2 md:col-span-3">COPYRIGHT ZELADAEPSTEIN 2025</span>
    		<span className="col-start-3 md:col-start-8 col-span-4 md:col-span-3 font-light">WEB X JULENFER</span>
    	</div>	
    </footer>
  );
}