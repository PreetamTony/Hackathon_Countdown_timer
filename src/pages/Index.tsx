import CountdownTimer from '@/components/CountdownTimer';
import SplashScreen from '@/components/SplashScreen';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Index = () => {
  const [showTimer, setShowTimer] = useState(false);

  const handleStart = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00FFFF', '#8A2BE2', '#FF1493'],
    });

    // Show timer after a short delay
    setTimeout(() => {
      setShowTimer(true);
    }, 1500);
  };

  const handleReset = () => {
    setShowTimer(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://v1.pinimg.com/videos/mc/720p/21/5e/19/215e19688d4c97463700810c092c04ff.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better content visibility */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showTimer ? (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <SplashScreen onStart={handleStart} />
            </motion.div>
          ) : (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <CountdownTimer onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
