'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export type PrintSize = 'Logo' | 'A4' | 'A3' | 'Oversized';

interface TShirtRendererProps {
  selectedColor: string;
  frontImage: string | null;
  backImage: string | null;
  frontPrintSize: PrintSize;
  backPrintSize: PrintSize;
  isFlipped: boolean;
  onFlipToggle: () => void;
}

const getPrintSizeClasses = (size: PrintSize, isFront: boolean) => {
  switch (size) {
    case 'Logo': return isFront ? 'w-[15%] h-[15%] top-[25%] left-[65%]' : 'w-[15%] h-[15%] top-[22%] left-[50%]';
    case 'A4': return 'w-[25%] h-[35%] top-[30%] left-[50%]';
    case 'A3': return 'w-[35%] h-[45%] top-[28%] left-[50%]';
    case 'Oversized': return 'w-[45%] h-[55%] top-[25%] left-[50%]';
    default: return 'w-[25%] h-[35%] top-[30%] left-[50%]';
  }
};

export default function TShirtRenderer({ 
  selectedColor, 
  frontImage, 
  backImage, 
  frontPrintSize,
  backPrintSize,
  isFlipped,
  onFlipToggle
}: TShirtRendererProps) {
  const frontPrintClasses = getPrintSizeClasses(frontPrintSize, true);
  const backPrintClasses = getPrintSizeClasses(backPrintSize, false);
  
  const isBlack = selectedColor === '#222222';
  const frontSrc = isBlack ? '/images/black-tshirt.png' : '/images/blank-tshirt.png';
  const backSrc = isBlack ? '/images/black-tshirt-back.png' : '/images/blank-tshirt-back.png';

  return (
    <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden bg-surface-variant flex flex-col items-center justify-center p-4 [perspective:1000px]">
      
      {/* 3D Container */}
      <motion.div 
        className="relative w-full h-full rounded-2xl flex items-center justify-center [transform-style:preserve-3d]" 
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
      >
        
        {/* FRONT SIDE */}
        <div className="absolute inset-0 z-10 w-full h-full [backface-visibility:hidden]">
          {/* T-Shirt Image with blend mode */}
          <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-95">
            <Image
              src={frontSrc}
              alt="Blank T-Shirt Front"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              draggable={false}
            />
          </div>

          {/* Uploaded Image Overlay (chest area) */}
          {frontImage && (
            <div className={`absolute z-20 -translate-x-1/2 flex items-start justify-center overflow-hidden drop-shadow-md transition-all duration-300 ${frontPrintClasses}`}>
              <Image
                src={frontImage}
                alt="Front design"
                width={300}
                height={400}
                className="object-contain w-full h-auto max-h-full"
                draggable={false}
              />
            </div>
          )}

          {!frontImage && (
            <div className={`absolute z-20 -translate-x-1/2 opacity-30 border-2 border-dashed border-current rounded-lg flex items-center justify-center transition-all duration-300 pointer-events-none ${frontPrintClasses}`}>
              <span className="text-[10px] uppercase font-label-caps tracking-widest text-center">Front Area</span>
            </div>
          )}
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 z-10 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* T-Shirt Image with blend mode */}
          <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-95">
            <Image
              src={backSrc}
              alt="Blank T-Shirt Back"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              draggable={false}
            />
          </div>

          {/* Uploaded Image Overlay (back area) */}
          {backImage && (
            <div className={`absolute z-20 -translate-x-1/2 flex items-start justify-center overflow-hidden drop-shadow-md transition-all duration-300 ${backPrintClasses}`}>
              <Image
                src={backImage}
                alt="Back design"
                width={300}
                height={400}
                className="object-contain w-full h-auto max-h-full"
                draggable={false}
              />
            </div>
          )}

          {!backImage && (
            <div className={`absolute z-20 -translate-x-1/2 opacity-30 border-2 border-dashed border-current rounded-lg flex items-center justify-center transition-all duration-300 pointer-events-none ${backPrintClasses}`}>
              <span className="text-[10px] uppercase font-label-caps tracking-widest text-center">Back Area</span>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Rotate Button */}
      <button 
        onClick={onFlipToggle}
        className="absolute bottom-6 flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full z-50 shadow-sm border border-outline/10 hover:bg-background transition-colors cursor-pointer group"
      >
        <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">360</span>
        <span className="text-xs font-label-caps tracking-widest uppercase font-semibold">Click to rotate</span>
      </button>
    </div>
  );
}
