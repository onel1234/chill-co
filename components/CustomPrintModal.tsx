'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import TShirtRenderer, { PrintSize } from './TShirtRenderer';
import CustomPrintForm, { COLORS, SIZES, PRINT_SIZES } from './CustomPrintForm';

interface CustomPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomPrintModal({ isOpen, onClose }: CustomPrintModalProps) {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].hex);
  const [selectedSize, setSelectedSize] = useState<string>(SIZES[1]); // M
  const [frontPrintSize, setFrontPrintSize] = useState<PrintSize>(PRINT_SIZES[1]); // A4
  const [backPrintSize, setBackPrintSize] = useState<PrintSize>(PRINT_SIZES[1]); // A4
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (data: { name: string; email: string }) => {
    console.log('Submitted Print Request:', {
      ...data,
      frontImage,
      backImage,
      selectedColor,
      selectedSize,
      frontPrintSize,
      backPrintSize
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 pointer-events-none"
          >
            <div className="w-full max-w-6xl max-h-[95vh] bg-background border border-outline/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col pointer-events-auto relative overflow-hidden">
              
              {/* Close button wrapper to keep it outside scroll area */}
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-50">
                <button
                  onClick={onClose}
                  className="p-2 bg-surface-variant/90 backdrop-blur text-on-surface-variant rounded-full hover:bg-outline/20 transition-colors shadow-md border border-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto min-h-0 p-5 sm:p-8 md:p-12 pt-12 sm:pt-8">
                <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
                  <span className="font-label-caps text-[10px] sm:text-xs text-primary tracking-widest uppercase mb-2 sm:mb-3 font-bold">
                    3D Customizer
                  </span>
                  <h2 className="font-display-lg text-headline-sm sm:text-headline-md text-on-background uppercase px-4">
                    Build Your Custom Tee
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                  {/* Left Column: Visual Renderer */}
                  <div className="flex flex-col items-center justify-center order-1 lg:order-1 perspective-1000">
                    <TShirtRenderer 
                      selectedColor={selectedColor} 
                      frontImage={frontImage} 
                      backImage={backImage}
                      frontPrintSize={frontPrintSize}
                      backPrintSize={backPrintSize}
                      isFlipped={isFlipped}
                      onFlipToggle={() => setIsFlipped(!isFlipped)}
                    />
                  </div>

                  {/* Right Column: Interactive Form */}
                  <div className="order-2 lg:order-2">
                    <CustomPrintForm
                      onFrontUpload={setFrontImage}
                      onBackUpload={setBackImage}
                      frontImage={frontImage}
                      backImage={backImage}
                      selectedColor={selectedColor}
                      onColorChange={setSelectedColor}
                      selectedSize={selectedSize}
                      onSizeChange={setSelectedSize}
                      frontPrintSize={frontPrintSize}
                      onFrontPrintSizeChange={setFrontPrintSize}
                      backPrintSize={backPrintSize}
                      onBackPrintSizeChange={setBackPrintSize}
                      isFlipped={isFlipped}
                      onFlipToggle={() => setIsFlipped(!isFlipped)}
                      onSubmit={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
