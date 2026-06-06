export default function Newsletter() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop border-b border-surface-variant flex flex-col md:items-center text-center">
      <div className="w-full md:max-w-xl text-left md:text-center">
        <h3 className="font-headline-md text-headline-md uppercase mb-2">STAY CHILL</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">Be the first to know about secret drops and editorial content.</p>
        <form className="space-y-4">
          <div className="border-b border-on-surface pb-2">
            <input className="w-full bg-transparent border-none p-0 focus:ring-0 font-label-caps text-label-caps placeholder:text-on-surface-variant md:text-center" placeholder="YOUR EMAIL ADDRESS" type="email" />
          </div>
          <button className="w-full bg-on-surface text-background py-4 font-button-text text-button-text uppercase tracking-widest hover:opacity-90 transition-opacity">SUBMIT</button>
        </form>
      </div>
    </section>
  );
}
