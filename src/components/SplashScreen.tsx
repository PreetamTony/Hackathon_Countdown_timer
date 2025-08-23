import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code, Cpu, Zap, Terminal, Server, CpuIcon, ZapIcon, TerminalIcon, ServerIcon } from "lucide-react";

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen = ({ onStart }: SplashScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[Code, Cpu, Zap, Server].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-neon-purple/30"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(index) * 20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${20 + index * 20}%`,
              top: `${20 + index * 15}%`,
            }}
          >
            <Icon size={40} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-7xl md:text-9xl font-bold mb-8 gradient-text leading-tight"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          Make-A-Thon
        </motion.h1>

        <div className="relative my-12">
          <motion.div
            className="relative z-10 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl md:text-8xl font-bold text-neon-cyan/90 mb-2">2.0</div>
            <div className="text-2xl md:text-3xl font-light text-neon-cyan/80 tracking-wider">24 HOURS HACKATHON</div>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-neon-cyan/20 blur-sm"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-neon-purple/20 blur-sm"
            animate={{
              y: [0, 10, 0],
              x: [0, -10, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6,
              delay: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-1/2 -right-8 w-16 h-16 rounded-full bg-white/5 blur-sm"
            animate={{
              y: [0, -20, 0],
              x: [0, -10, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="relative bg-gradient-primary hover:bg-gradient-primary text-primary-foreground 
                     px-16 py-8 text-2xl font-bold rounded-2xl
                     glow-cyan hover:animate-pulse-glow
                     transition-all duration-300 transform hover:scale-105
                     border-2 border-neon-cyan/50"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px hsl(var(--neon-cyan))",
                  "0 0 20px hsl(var(--neon-cyan))",
                  "0 0 10px hsl(var(--neon-cyan))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              START COUNTDOWN
            </motion.span>
          </Button>
        </motion.div>

        <motion.div
          className="mt-8 text-muted-foreground/60 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Click to begin the ultimate hackathon experience
        </motion.div>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
    </div>
  );
};

export default SplashScreen;