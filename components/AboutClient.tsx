import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutClient() {
  return (
    <main style={{ backgroundColor: '#0d0a07', minHeight: '100vh', paddingTop: '80px', color: '#f0e6d3' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '4rem 2rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ height: '1px', width: '40px', backgroundColor: '#7d5b31' }}></div>
              <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Welcome To
              </span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 800, lineHeight: 0.85, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
              <span style={{ color: '#f0e6d3', display: 'block' }}>Chill</span>
              <span className="gold-text" style={{ display: 'block' }}>Co.™</span>
            </h1>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 300, marginBottom: '0.5rem', color: '#c9a96e' }}>
                Oversized Fit.
              </p>
              <p style={{ fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
                Undeniable Difference.
              </p>
            </div>
            
            <p style={{ color: 'rgba(240, 230, 211, 0.7)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '400px', marginBottom: '3rem' }}>
              Chill Co. is more than a brand—it's a mindset. We create oversized garments that blend uncompromising comfort with bold, innovative design deeply rooted in Sri Lankan heritage.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #7d5b31', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ color: '#c9a96e' }}>language</span>
              </div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240, 230, 211, 0.6)' }}>
                Chill with purpose.<br />Wear the difference.
              </span>
            </div>
          </div>
          
          <div style={{ position: 'relative', height: '700px', borderRadius: '4px', overflow: 'hidden' }}>
            <div className="noise-overlay" style={{ position: 'absolute', inset: 0, zIndex: 5 }}></div>
            <Image
              src="/images/about_hero_1785312428965.jpg"
              alt="Fashion editorial for Chill Co."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Floating Badge */}
            <div style={{ 
              position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10,
              backgroundColor: 'rgba(13, 10, 7, 0.8)', backdropFilter: 'blur(8px)',
              border: '1px solid #7d5b31', padding: '1.5rem', transform: 'rotate(-2deg)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e' }}>
                Designed<br />Different.
              </span>
            </div>
          </div>
          
        </div>
      </section>

      <div className="ornament-line" style={{ margin: '0 auto', width: '80%', opacity: 0.3 }}></div>

      {/* Philosophy Section */}
      <section style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1, marginBottom: '1.5rem' }}>
            Made To <span className="gold-text">Stand Out.</span>
          </h2>
          <p style={{ color: 'rgba(240, 230, 211, 0.7)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '600px' }}>
            We push boundaries with innovative designs that challenge the norm. Every piece is meticulously crafted to be a testament to ancient artistry and modern comfort.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="heritage-card" style={{ padding: '3rem', backgroundColor: '#0a0705', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '400px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#7d5b31', marginBottom: '2rem' }}>verified</span>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#c9a96e' }}>Quality First</h3>
              <p style={{ color: 'rgba(240, 230, 211, 0.6)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Premium heavyweight cottons that drape perfectly and last longer than a season. True luxury lies in the details.
              </p>
            </div>
          </div>

          <div className="heritage-card" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', gridColumn: 'auto / span 2' }}>
            <Image
              src="/images/about_quality_1785312441925.jpg"
              alt="Premium fabric detail"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,10,7,0.9) 0%, rgba(13,10,7,0.2) 100%)' }}></div>
            <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', right: '3rem' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#f0e6d3', textTransform: 'uppercase' }}>
                The Everyday <span className="gold-text">Uniform</span>
              </h3>
              <p style={{ color: 'rgba(240, 230, 211, 0.8)', fontSize: '0.95rem', maxWidth: '400px', lineHeight: 1.7 }}>
                Built for comfort. Made for everyday. Effortless style seamlessly blended with rich cultural motifs.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section style={{ position: 'relative', padding: '8rem 2rem', backgroundColor: '#0a0705', borderTop: '1px solid rgba(125, 91, 49, 0.2)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, pointerEvents: 'none' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '40vw' }}>all_inclusive</span>
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '2rem' }}>
            This is <br/><span className="gold-text">Just The Beginning.</span>
          </h2>
          <p style={{ color: 'rgba(240, 230, 211, 0.7)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem auto' }}>
            Thank you for being part of the Chill Co. community. Let's build something different. Together.
          </p>
          <Link href="/shop" className="btn-gold">
            <span>Join The Movement</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
