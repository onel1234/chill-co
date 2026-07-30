'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle } from 'lucide-react';
import TShirtRenderer, { PrintSize } from './TShirtRenderer';
import CustomPrintForm, { COLORS, SIZES, PRINT_SIZES } from './CustomPrintForm';

interface CustomPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomPrintModal({ isOpen, onClose }: CustomPrintModalProps) {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].hex);
  const [selectedSize, setSelectedSize] = useState<string>(SIZES[1]); // M
  const [frontPrintSize, setFrontPrintSize] = useState<PrintSize>(PRINT_SIZES[1]); // A4
  const [backPrintSize, setBackPrintSize] = useState<PrintSize>(PRINT_SIZES[1]); // A4
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  /** Converts a File to a data:image/...;base64,... string */
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFrontUpload = (imageUrl: string, file: File) => {
    setFrontImage(imageUrl);
    setFrontFile(file);
  };

  const handleBackUpload = (imageUrl: string, file: File) => {
    setBackImage(imageUrl);
    setBackFile(file);
  };

  const handleSubmit = async (data: { name: string; email: string }) => {
    setIsLoading(true);
    setSubmitResult(null);
    setErrorMessage('');

    try {
      // Convert uploaded files to base64 for server-side emailing
      const [frontImageBase64, backImageBase64] = await Promise.all([
        frontFile ? fileToBase64(frontFile) : Promise.resolve(undefined),
        backFile ? fileToBase64(backFile) : Promise.resolve(undefined),
      ]);

      // Resolve the human-readable color name
      const colorObj = COLORS.find((c) => c.hex === selectedColor);
      const colorName = colorObj?.name ?? selectedColor;

      const response = await fetch('/api/mail/custom-print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          color: selectedColor,
          colorName,
          size: selectedSize,
          frontPrintSize,
          backPrintSize,
          frontImageBase64,
          backImageBase64,
        }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        throw new Error(json.error ?? `Request failed with status ${response.status}`);
      }

      setSubmitResult('success');
    } catch (err) {
      console.error('Custom print submission error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitResult('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFrontImage(null);
    setFrontFile(null);
    setBackImage(null);
    setBackFile(null);
    setSelectedColor(COLORS[0].hex);
    setSelectedSize(SIZES[1]);
    setFrontPrintSize(PRINT_SIZES[1]);
    setBackPrintSize(PRINT_SIZES[1]);
    setIsFlipped(false);
    setSubmitResult(null);
    setErrorMessage('');
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
            className="fixed inset-0 z-[300] bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[300] flex items-center justify-center sm:p-4 pointer-events-none"
          >
            <div className="w-full h-full sm:max-w-6xl sm:max-h-[95vh] bg-background sm:border border-outline/10 sm:rounded-3xl shadow-2xl flex flex-col pointer-events-auto relative overflow-hidden">
              
              {/* Sticky Header with Close Button */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-outline/10 bg-background/95 backdrop-blur z-50 shrink-0">
                <span className="font-label-caps text-[10px] sm:text-xs text-primary tracking-widest uppercase font-bold">
                   Close Customizer
                </span>
                <button
                  onClick={onClose}
                  className="p-3 bg-surface-variant text-on-surface-variant rounded-full hover:bg-outline/20 transition-colors shadow-md border border-white/10 flex items-center justify-center"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto min-h-0 p-5 sm:p-8 md:p-12 pt-6 sm:pt-8">

                {/* Success State */}
                <AnimatePresence mode="wait">
                  {submitResult === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center text-center p-8 bg-primary-container rounded-3xl min-h-[400px]"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-on-primary-container/10 flex items-center justify-center mb-6"
                      >
                        <svg className="w-10 h-10 text-on-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="font-display-md text-headline-sm text-on-primary-container mb-2 uppercase">Request Sent!</h3>
                      <p className="text-on-primary-container/70 mb-2 max-w-xs">
                        We&apos;ve received your design and will be in touch within 24–48 hours.
                      </p>
                      <p className="text-on-primary-container/50 text-sm mb-8">
                        A confirmation email has been sent to your inbox.
                      </p>
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-on-primary-container text-primary-container font-button-text uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity font-bold"
                      >
                        Start New Request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="flex flex-col items-center text-center mb-8 sm:mb-10 hidden sm:flex">
                        <span className="font-label-caps text-[10px] sm:text-xs text-primary tracking-widest uppercase mb-2 sm:mb-3 font-bold">
                          3D Customizer
                        </span>
                        <h2 className="font-display-lg text-headline-sm sm:text-headline-md text-on-background uppercase px-4">
                          Build Your Custom Tee
                        </h2>
                      </div>

                      {/* Error Toast */}
                      <AnimatePresence>
                        {submitResult === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-3 mb-6 px-4 py-3 bg-error/10 border border-error/30 rounded-xl text-error text-sm"
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{errorMessage || 'Failed to send request. Please try again.'}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

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
                            onFrontUpload={handleFrontUpload}
                            onBackUpload={handleBackUpload}
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
                            isLoading={isLoading}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
