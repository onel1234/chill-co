export default function Manifesto() {
  return (
    <section className="py-section-gap bg-surface-container-low px-margin-mobile md:px-margin-desktop relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-primary/20 opacity-50"></div>
      <div className="relative z-10 md:max-w-2xl">
        <span className="font-label-caps text-label-caps text-on-surface-variant block mb-4">THE MANIFESTO</span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase mb-stack-md leading-tight">Comfort is<br/>the ultimate<br/><span className="text-primary italic">Rebellion.</span></h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-stack-lg">
          We believe streetwear shouldn't just be seen—it should be felt. Our fabrics are sourced from sustainable mills and treated for maximum softness without sacrificing the structural silhouette that defines urban style.
        </p>
        <a className="font-label-caps text-label-caps text-primary flex items-center gap-2 group w-max" href="#">
          READ THE STORY 
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}
