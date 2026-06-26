'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, PaintBucket, Ruler, Scaling, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { PrintSize } from './TShirtRenderer';

export const COLORS = [
  { name: 'White', hex: '#F9F9F9' },
  { name: 'Black', hex: '#222222' },
];

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
export const PRINT_SIZES: PrintSize[] = ['Logo', 'A4', 'A3', 'Oversized'];

interface CustomPrintFormProps {
  onFrontUpload: (imageUrl: string) => void;
  onBackUpload: (imageUrl: string) => void;
  frontImage: string | null;
  backImage: string | null;
  selectedColor: string;
  onColorChange: (color: string) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  frontPrintSize: PrintSize;
  onFrontPrintSizeChange: (size: PrintSize) => void;
  backPrintSize: PrintSize;
  onBackPrintSizeChange: (size: PrintSize) => void;
  isFlipped: boolean;
  onFlipToggle: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
}

export default function CustomPrintForm({
  onFrontUpload,
  onBackUpload,
  frontImage,
  backImage,
  selectedColor,
  onColorChange,
  selectedSize,
  onSizeChange,
  frontPrintSize,
  onFrontPrintSizeChange,
  backPrintSize,
  onBackPrintSizeChange,
  isFlipped,
  onFlipToggle,
  onSubmit,
}: CustomPrintFormProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dropzone for Front
  const onDropFront = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFrontUpload(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [onFrontUpload]);
  const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({ onDrop: onDropFront, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }, maxFiles: 1 });

  // Dropzone for Back
  const onDropBack = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onBackUpload(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [onBackUpload]);
  const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({ onDrop: onDropBack, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }, maxFiles: 1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
    setIsSubmitted(true);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center p-8 bg-primary-container rounded-3xl"
          >
            <CheckCircle2 className="w-16 h-16 text-on-primary-container mb-4" />
            <h3 className="font-display-md text-headline-sm text-on-primary-container mb-2 uppercase">Request Sent</h3>
            <p className="text-on-primary-container/80 mb-6">
              We've received your custom print request. We'll be in touch shortly!
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                onFrontUpload('');
                onBackUpload('');
              }}
              className="px-6 py-3 bg-on-primary-container text-primary-container font-button-text uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity font-bold"
            >
              Start New Request
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Step 1: Upload */}
            <div className={`transition-opacity duration-300 ${step < 1 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-on-primary text-xs font-bold">1</span>
                  <h3 className="font-title-lg text-title-lg text-on-background uppercase">Upload Design</h3>
                </div>
                <button 
                  onClick={onFlipToggle}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-variant rounded-full text-xs font-button-text uppercase tracking-widest hover:bg-surface-variant/80 transition-colors border border-outline/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isFlipped ? 'View Front' : 'View Back'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Front Side Config */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-label-caps uppercase tracking-widest text-on-surface-variant flex items-center gap-1">
                      <Scaling className="w-3 h-3" /> Front Size
                    </label>
                    <select 
                      value={frontPrintSize}
                      onChange={(e) => onFrontPrintSizeChange(e.target.value as PrintSize)}
                      className="w-full text-sm p-2 rounded-lg bg-surface border border-outline/20 outline-none focus:border-primary"
                    >
                      {PRINT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div
                    {...getRootPropsFront()}
                    onClick={(e) => {
                      if (isFlipped) onFlipToggle();
                      getRootPropsFront().onClick?.(e);
                    }}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center h-28 sm:h-32 ${
                      !isFlipped ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-outline/50 hover:border-primary/50 bg-surface'
                    }`}
                  >
                    <input {...getInputPropsFront()} />
                    {frontImage ? (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="w-6 h-6 text-primary mb-2" />
                        <span className="text-xs font-bold text-primary uppercase">Front Added</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-outline mb-1 sm:mb-2" />
                        <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Upload Front</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Back Side Config */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-label-caps uppercase tracking-widest text-on-surface-variant flex items-center gap-1">
                      <Scaling className="w-3 h-3" /> Back Size
                    </label>
                    <select 
                      value={backPrintSize}
                      onChange={(e) => onBackPrintSizeChange(e.target.value as PrintSize)}
                      className="w-full text-sm p-2 rounded-lg bg-surface border border-outline/20 outline-none focus:border-primary"
                    >
                      {PRINT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div
                    {...getRootPropsBack()}
                    onClick={(e) => {
                      if (!isFlipped) onFlipToggle();
                      getRootPropsBack().onClick?.(e);
                    }}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center h-28 sm:h-32 ${
                      isFlipped ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-outline/50 hover:border-primary/50 bg-surface'
                    }`}
                  >
                    <input {...getInputPropsBack()} />
                    {backImage ? (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="w-6 h-6 text-primary mb-2" />
                        <span className="text-xs font-bold text-primary uppercase">Back Added</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 text-outline mb-1 sm:mb-2" />
                        <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Upload Back</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {(frontImage || backImage) && step === 1 && (
                <button onClick={() => setStep(2)} className="w-full mt-4 py-3 bg-on-background text-background font-bold uppercase tracking-widest rounded-xl hover:opacity-90">
                  Continue
                </button>
              )}
            </div>

            {/* Step 2: Customize */}
            <div className={`transition-opacity duration-300 ${step < 2 ? 'opacity-50 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${step >= 2 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>2</span>
                <h3 className="font-title-lg text-title-lg text-on-background uppercase">Customize Tee</h3>
              </div>
              
              <div className="space-y-6 bg-surface-variant/30 p-5 rounded-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Colors */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <PaintBucket className="w-4 h-4 text-on-surface-variant" />
                      <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant">Color</span>
                    </div>
                    <div className="flex gap-3">
                      {COLORS.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => onColorChange(color.hex)}
                          className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === color.hex ? 'border-primary ring-2 ring-primary/30' : 'border-outline/30'}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Ruler className="w-4 h-4 text-on-surface-variant" />
                      <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant">Fit</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => onSizeChange(size)}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                            selectedSize === size
                              ? 'bg-primary text-on-primary shadow-md'
                              : 'bg-surface text-on-surface border border-outline/20 hover:border-primary/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {step === 2 && (
                  <button onClick={() => setStep(3)} className="w-full mt-2 py-3 bg-on-background text-background font-bold uppercase tracking-widest rounded-xl hover:opacity-90">
                    Next Details
                  </button>
                )}
              </div>
            </div>

            {/* Step 3: Details */}
            <div className={`transition-opacity duration-300 ${step < 3 ? 'opacity-50 pointer-events-none h-0 overflow-hidden' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${step >= 3 ? 'bg-primary text-on-primary' : 'bg-surface-variant text-on-surface-variant'}`}>3</span>
                <h3 className="font-title-lg text-title-lg text-on-background uppercase">Your Details</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-outline/30 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!name || !email}
                  className="w-full py-4 bg-primary text-on-primary font-button-text uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity font-bold disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
