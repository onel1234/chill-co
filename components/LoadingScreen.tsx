"use client";

import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress to fill the t-shirt
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 180);

    // Hide the loader after a set time
    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setLoading(false), 800); // Wait for fade out animation
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl transition-all duration-[800ms] ease-in-out ${
        animateOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background abstract shapes for glassmorphism effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-primary/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] bg-secondary-container/20 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className={`relative overflow-hidden flex flex-col items-center transition-transform duration-[1000ms] ${
          animateOut ? 'translate-y-[-20px]' : 'translate-y-0'
        }`}>
          <img 
            alt="Chill Co. Logo" 
            className="w-auto h-[50px] md:h-[65px] object-contain drop-shadow-2xl transition-all duration-500 ease-in-out hover:scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqB65R-CNaUPWxe_JwjGRHxiS3EUkEaXgG_Ykp-m9DV7dZVVB2qnF0O1xUNp6ioaAH7YSjRh1PAkQrEacFEWd3ju5pOJ4rXlPTBID9lpaGpjs_02jZwIsNjKKKPA5WYRj0rclafY-H2LtxCzFRxb7nyftQ-rr0G6RYnF-CnkK305lo-IqnWrNri_UUhYERexGtllSN_-WafAqC7s1ZWKuvcHAWDKK4NqZyTA-qs7UtMfISab21PmlHbupj6bYL8Rxyrmbo3LtTvSs" 
          />
        </div>

        {/* Cute Clothing Animation */}
        <div className="mt-16 flex flex-col items-center">
           
           <div className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-xl">
             {/* Background T-Shirt (Empty) */}
             <svg className="w-full h-full text-surface-variant/50" viewBox="0 0 24 24" fill="currentColor">
               <path d="M21.58,6.86l-3.23-1.61C17.51,4.82,16.59,4,15.54,4H15c0,1.66-1.34,3-3,3S9,5.66,9,4H8.46C7.41,4,6.49,4.82,5.65,5.25 L2.42,6.86C1.98,7.09,1.75,7.6,1.91,8.07l1.45,4.36c0.16,0.47,0.67,0.73,1.14,0.56l2-0.74V20c0,0.55,0.45,1,1,1h8 c0.55,0,1-0.45,1-1v-7.76l2,0.74c0.47,0.18,0.98-0.09,1.14-0.56l1.45-4.36C22.25,7.6,22.02,7.09,21.58,6.86z"/>
             </svg>
             
             {/* Foreground Colored T-Shirt (Fills up from bottom) */}
             <div 
               className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-300 ease-out text-primary"
               style={{ height: `${Math.min(progress, 100)}%` }}
             >
               <svg className="w-20 h-20 md:w-24 md:h-24 absolute bottom-0 left-0" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M21.58,6.86l-3.23-1.61C17.51,4.82,16.59,4,15.54,4H15c0,1.66-1.34,3-3,3S9,5.66,9,4H8.46C7.41,4,6.49,4.82,5.65,5.25 L2.42,6.86C1.98,7.09,1.75,7.6,1.91,8.07l1.45,4.36c0.16,0.47,0.67,0.73,1.14,0.56l2-0.74V20c0,0.55,0.45,1,1,1h8 c0.55,0,1-0.45,1-1v-7.76l2,0.74c0.47,0.18,0.98-0.09,1.14-0.56l1.45-4.36C22.25,7.6,22.02,7.09,21.58,6.86z"/>
               </svg>
             </div>

             {/* Little sparkles popping up when near full */}
             {progress > 80 && (
               <div className="absolute -top-4 -right-4 text-primary-container animate-bounce">
                 <span className="material-symbols-outlined text-sm">auto_awesome</span>
               </div>
             )}
             {progress > 90 && (
               <div className="absolute top-4 -left-6 text-secondary animate-bounce" style={{ animationDelay: '0.2s' }}>
                 <span className="material-symbols-outlined text-xs">auto_awesome</span>
               </div>
             )}
           </div>

           {/* Animated Text */}
           <div className="mt-8 font-label-caps text-label-caps text-on-surface/60 tracking-[0.3em] uppercase flex items-center justify-center gap-[2px]">
             <span className="inline-block animate-pulse">S</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>t</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>i</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>t</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>c</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>h</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>i</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.7s' }}>n</span>
             <span className="inline-block animate-pulse mr-2" style={{ animationDelay: '0.8s' }}>g</span>
             
             <span className="inline-block animate-pulse">y</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>o</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>u</span>
             <span className="inline-block animate-pulse mr-2" style={{ animationDelay: '0.3s' }}>r</span>
             
             <span className="inline-block animate-pulse">v</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>i</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>b</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>e</span>
             <span className="inline-block animate-pulse ml-1" style={{ animationDelay: '0.4s' }}>.</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>.</span>
             <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>.</span>
           </div>
        </div>
      </div>
    </div>
  );
}
