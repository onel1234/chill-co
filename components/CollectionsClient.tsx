import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CollectionsClient() {
  return (
    <main style={{ backgroundColor: '#0d0a07', minHeight: '100vh', paddingTop: '80px', color: '#f0e6d3' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '70vh', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image
          src="/images/collection_hero_1785312373972.jpg"
          alt="Kandyan dancer inspired streetwear collection"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.6 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(13,10,7,0.8) 0%, rgba(13,10,7,0.3) 50%, rgba(13,10,7,1) 100%)',
        }} />
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem', maxWidth: '800px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600, marginBottom: '1.5rem' }}>
            Est. 2024 · Designed Different
          </p>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            <span style={{ color: '#f0e6d3', display: 'block' }}>The</span>
            <span className="gold-text" style={{ display: 'block' }}>Collections</span>
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'rgba(240, 230, 211, 0.7)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            Pushing boundaries with innovative designs that challenge the norm. Ancient Sri Lankan heritage meets modern oversized silhouettes.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Collection 1: Staple / Essential */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '8rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '600px', borderRadius: '4px', overflow: 'hidden' }}>
            <Image 
              src="/images/collection_essential_1785312385598.jpg" 
              alt="Essentials Collection" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,10,7,0.9), transparent)' }} />
          </div>
          <div style={{ padding: '2rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em' }}>01</span>
              <div style={{ height: '1px', width: '40px', backgroundColor: '#7d5b31' }}></div>
              <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Heritage</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', lineHeight: 1 }}>
              Heritage
            </h2>
            <p style={{ color: 'rgba(240, 230, 211, 0.7)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '450px' }}>
              Premium heavyweight fabrics. Oversized fit. The foundation of the Chill Co. aesthetic, designed for everyday wear without compromising on luxury.
            </p>
            <Link href="#" className="btn-gold">
              <span>Explore Essentials</span>
            </Link>
          </div>
        </div>

        {/* Collection 2: Kinetic */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '8rem', alignItems: 'center', direction: 'rtl' }}>
          <div style={{ position: 'relative', height: '600px', borderRadius: '4px', overflow: 'hidden', direction: 'ltr' }}>
            <Image 
              src="/images/collection_kinetic_1785312397247.jpg" 
              alt="Urban Kinetic Collection" 
              fill 
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,10,7,0.9), transparent)' }} />
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', border: '1px solid #7d5b31', padding: '0.5rem 1rem', fontSize: '0.65rem', letterSpacing: '0.2em', color: '#c9a96e', textTransform: 'uppercase' }}>
              New Drop
            </div>
          </div>
          <div style={{ padding: '2rem 0', direction: 'ltr' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em' }}>02</span>
              <div style={{ height: '1px', width: '40px', backgroundColor: '#7d5b31' }}></div>
              <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Latest Drops</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem', lineHeight: 1 }}>
              Latest Drops
            </h2>
            <p style={{ color: 'rgba(240, 230, 211, 0.7)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '450px' }}>
              Dynamic fits featuring subtle traditional Sri Lankan art graphics. A collision of high energy streetwear and ancient storytelling.
            </p>
            <Link href="#" className="btn-gold">
              <span>View Collection</span>
            </Link>
          </div>
        </div>

        {/* Collection 3: Exclusive */}
        <div style={{ position: 'relative', height: '80vh', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(125, 91, 49, 0.3)' }}>
          <Image 
            src="/images/collection_exclusive_1785312409173.jpg" 
            alt="The Signature Series" 
            fill 
            sizes="100vw"
            style={{ objectFit: 'cover', opacity: 0.7 }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,10,7,0.9) 0%, rgba(13,10,7,0.2) 100%)' }} />
          
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem', width: '100%' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', border: '1px solid #7d5b31', padding: '0.5rem 1.5rem', backgroundColor: 'rgba(13, 10, 7, 0.5)', backdropFilter: 'blur(4px)' }}>
              <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em' }}>03</span>
              <div style={{ height: '1px', width: '20px', backgroundColor: '#7d5b31' }}></div>
              <span style={{ color: '#c9a96e', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Exclusive</span>
            </div>
            <h2 className="shimmer-text" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
              The Signature<br />Series
            </h2>
            <Link href="#" className="btn-gold" style={{ backgroundColor: 'rgba(13, 10, 7, 0.8)' }}>
              <span>Shop Signature</span>
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
