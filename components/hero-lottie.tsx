"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const HeroLottie: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Only import and register the web component on the client
        import('@lottiefiles/dotlottie-wc');
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ width: '500px', height: '500px' }} />;
    }

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
