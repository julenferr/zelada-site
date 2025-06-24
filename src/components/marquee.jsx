//componente de marquee

export default function Marquee() {
  return (
    <div className="overflow-hidden w-full">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(8)].map((_, i) => (
          <img
            key={i}
            className="w-32 h-auto mx-4"
            src="/logo-estudio.svg"
            alt={`logo-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
