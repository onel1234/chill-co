"use client";

import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields (Name, Email, and Message).');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(7,5,3,0.85)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          position: 'relative',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP WOODEN / BRASS SCROLL ROLLER */}
        <div style={{ position: 'relative', zIndex: 20, marginBottom: '-6px' }}>
          <div
            style={{
              height: '28px',
              background: 'linear-gradient(180deg, #1b120a 0%, #3e2815 30%, #634324 50%, #3e2815 80%, #170d06 100%)',
              borderRadius: '4px',
              border: '1px solid #7d5b31',
              boxShadow: '0 6px 20px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
            }}
          >
            <div style={{ width: '20px', height: '100%', background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)' }} />
            <span style={{ fontSize: '0.52rem', letterSpacing: '0.22em', color: '#ffe8b5', fontWeight: 700, textTransform: 'uppercase' }}>
              CHILL CO. CONTACT PORTAL
            </span>
            <div style={{ width: '20px', height: '100%', background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)' }} />
          </div>
          {/* Handles */}
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              left: '-10px',
              width: '14px',
              height: '40px',
              background: 'radial-gradient(circle at 30% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%)',
              borderRadius: '6px 0 0 6px',
              border: '1px solid #ffe8b5',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-10px',
              width: '14px',
              height: '40px',
              background: 'radial-gradient(circle at 70% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%)',
              borderRadius: '0 6px 6px 0',
              border: '1px solid #ffe8b5',
            }}
          />
        </div>

        {/* PARCHMENT POPUP BODY */}
        <div
          style={{
            backgroundColor: '#16100a',
            backgroundImage: `
              radial-gradient(circle at 50% 0%, rgba(125,91,49,0.3) 0%, transparent 70%),
              url('/images/scroll_bg.jpg')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderLeft: '3px solid #4a341b',
            borderRight: '3px solid #4a341b',
            padding: '2rem 1.5rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.95), inset 0 0 50px rgba(0,0,0,0.85)',
            position: 'relative',
            borderRadius: '2px',
          }}
        >
          {/* Dark Overlay over Background Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(18,12,7,0.88)',
              zIndex: 1,
            }}
          />

          {/* Liyavela Outer Gold Frame */}
          <div
            style={{
              position: 'absolute',
              inset: '8px',
              border: '1px solid rgba(201,169,110,0.4)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Close X Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 30,
              background: 'rgba(20,13,8,0.8)',
              border: '1px solid #7d5b31',
              color: '#c9a96e',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Close Contact Form"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>

          {/* Modal Content Container */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#c9a96e">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  fontFamily: 'serif',
                  color: '#c9a96e',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Send Us A Message
              </h2>
              <p style={{ fontSize: '0.72rem', color: 'rgba(240,230,211,0.65)', marginTop: '0.35rem', letterSpacing: '0.1em' }}>
                REACH THE CHILL CO. SUPPORT TEAM DIRECTLY
              </p>
            </div>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7d5b31, #3e2815)',
                    border: '2px solid #c9a96e',
                    color: '#ffe8b5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '30px' }}>check</span>
                </div>
                <h3 style={{ color: '#ffe8b5', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Message Received!
                </h3>
                <p style={{ color: 'rgba(240,230,211,0.8)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                  Thank you for reaching out. We have received your inquiry and sent a confirmation to your email. Our team will respond shortly.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setStatus('idle')}
                    style={{
                      background: 'transparent',
                      border: '1px solid #7d5b31',
                      color: '#c9a96e',
                      padding: '0.6rem 1.25rem',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={onClose}
                    className="btn-gold"
                    style={{ padding: '0.6rem 1.5rem' }}
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {status === 'error' && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(186,26,26,0.25)',
                      border: '1px solid #ba1a1a',
                      borderRadius: '2px',
                      color: '#ffdad6',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
                    {errorMessage}
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#c9a96e',
                      fontWeight: 600,
                      marginBottom: '0.4rem',
                    }}
                  >
                    Your Name <span style={{ color: '#ba1a1a' }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(10,7,5,0.75)',
                      border: '1px solid rgba(125,91,49,0.4)',
                      borderRadius: '2px',
                      color: '#f0e6d3',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#c9a96e',
                      fontWeight: 600,
                      marginBottom: '0.4rem',
                    }}
                  >
                    Your Email Address <span style={{ color: '#ba1a1a' }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(10,7,5,0.75)',
                      border: '1px solid rgba(125,91,49,0.4)',
                      borderRadius: '2px',
                      color: '#f0e6d3',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#c9a96e',
                      fontWeight: 600,
                      marginBottom: '0.4rem',
                    }}
                  >
                    Message <span style={{ color: '#ba1a1a' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your inquiry or message here..."
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(10,7,5,0.75)',
                      border: '1px solid rgba(125,91,49,0.4)',
                      borderRadius: '2px',
                      color: '#f0e6d3',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                      minHeight: '100px',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-gold"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.5rem',
                    marginTop: '0.5rem',
                    opacity: status === 'submitting' ? 0.7 : 1,
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  }}
                >
                  <span>
                    {status === 'submitting' ? 'Dispatching Message...' : 'Send Message'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* BOTTOM WOODEN SCROLL ROLLER */}
        <div style={{ position: 'relative', zIndex: 20, marginTop: '-6px' }}>
          <div
            style={{
              height: '28px',
              background: 'linear-gradient(180deg, #1b120a 0%, #3e2815 30%, #634324 50%, #3e2815 80%, #170d06 100%)',
              borderRadius: '4px',
              border: '1px solid #7d5b31',
              boxShadow: '0 -6px 20px rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 12px',
            }}
          >
            <div style={{ width: '20px', height: '100%', background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)' }} />
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(255,232,181,0.6)', textTransform: 'uppercase' }}>
              CHILL CO. COMPLIANCE & SUPPORT
            </span>
            <div style={{ width: '20px', height: '100%', background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)' }} />
          </div>
          {/* Handles */}
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              left: '-10px',
              width: '14px',
              height: '40px',
              background: 'radial-gradient(circle at 30% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%)',
              borderRadius: '6px 0 0 6px',
              border: '1px solid #ffe8b5',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-10px',
              width: '14px',
              height: '40px',
              background: 'radial-gradient(circle at 70% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%)',
              borderRadius: '0 6px 6px 0',
              border: '1px solid #ffe8b5',
            }}
          />
        </div>
      </div>
    </div>
  );
}
