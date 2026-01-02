"use client";

import React from 'react';
import { motion } from 'framer-motion';
import '@lottiefiles/dotlottie-wc';

export const HeroLottie: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-10 relative overflow-hidden">
            {/* Decorative background glow for the animation */}


            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <div id="lottie-container" className="relative">
                    {/* @ts-ignore - dotlottie-wc is a custom element */}
                    <dotlottie-wc
                        src="https://lottie.host/bc971605-3ab4-42e6-b21c-fd0769aa451a/zEFOPt6KpO.json"
                        style={{ width: '500px', height: '500px', maxWidth: '100%' }}
                        autoplay
                        loop
                    />
                </div>
            </motion.div>
        </div>
    );
};
