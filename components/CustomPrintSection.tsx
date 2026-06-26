'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';
import CustomPrintModal from './CustomPrintModal';

export default function CustomPrintSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full py-24 bg-background overflow-hidden relative border-y border-outline/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 font-bold flex items-center gap-2">
          <PenTool className="w-4 h-4" /> Make It Yours
        </span>
        <h2 className="font-display-xl text-headline-md md:text-headline-lg text-on-background uppercase max-w-2xl">
          Custom Print Studio
        </h2>
        <p className="text-body-lg text-on-surface-variant max-w-xl mt-6 mb-10">
          Step into our 3D customizer. Upload your own graphics for the front and back, choose your preferred fit, and we'll craft a premium 1-of-1 piece just for you.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-primary text-on-primary font-button-text uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all font-bold flex items-center gap-3"
        >
          Customize Your Own
          <span className="material-symbols-outlined">arrow_forward</span>
        </motion.button>
      </div>

      <CustomPrintModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
