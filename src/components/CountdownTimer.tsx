import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect, useState, useCallback, useMemo } from 'react';

interface CountdownTimerProps {
  onReset: () => void;
}

const CountdownTimer = ({ onReset }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [isActive, setIsActive] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [lastDigits, setLastDigits] = useState({ hours: '', minutes: '', seconds: '' });

  // Format time into HH:MM:SS
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  }, []);

  const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft]);

  // Progress calculation (0 to 1)
  const progress = 1 - (timeLeft / (24 * 60 * 60));

  // Milestone alerts
  const getMilestoneColor = useCallback(() => {
    const hoursLeft = Math.floor(timeLeft / 3600);
    const minutesLeft = Math.floor(timeLeft / 60);
    
    if (timeLeft <= 60) return 'border-red-500 glow-red'; // Last minute
    if (minutesLeft <= 5) return 'border-orange-500 glow-orange'; // 5 min left
    if (minutesLeft <= 10) return 'border-yellow-500 glow-yellow'; // 10 min left
    if (hoursLeft <= 1) return 'border-neon-pink glow-pink'; // 1 hour left
    if (hoursLeft <= 6) return 'border-neon-purple glow-purple'; // 6 hours left
    if (hoursLeft <= 12) return 'border-amber-400 glow-amber'; // 12 hours left
    
    return 'border-neon-cyan glow-cyan';
  }, [timeLeft]);

  // Timer countdown effect
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer finished - trigger celebration
          confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00FFFF', '#8A2BE2', '#FF1493'],
          });
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Track digit changes for animations
  useEffect(() => {
    setLastDigits(formattedTime);
  }, [formattedTime]);

  // Time adjustment functions
  const adjustTime = (minutes: number) => {
    setTimeLeft((prev) => Math.max(0, prev + minutes * 60));
  };

  const resetTimer = () => {
    setTimeLeft(24 * 60 * 60);
    setIsActive(true);
    onReset();
  };

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Toggle controls visibility
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  if (timeLeft === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <motion.h1
            className="text-8xl font-bold gradient-text mb-8"
            animate={{
              textShadow: [
                "0 0 20px hsl(var(--neon-cyan))",
                "0 0 40px hsl(var(--neon-pink))",
                "0 0 20px hsl(var(--neon-purple))",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            HACKATHON OVER!
          </motion.h1>
          
          <motion.p
            className="text-3xl text-neon-cyan mb-12"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Time to showcase your amazing creations!
          </motion.p>

          <Button
            onClick={resetTimer}
            className="bg-gradient-primary hover:bg-gradient-primary text-primary-foreground 
                     px-12 py-6 text-xl font-bold rounded-xl glow-cyan"
          >
            <RotateCcw className="mr-2" size={24} />
            Reset Timer
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan/20 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 2, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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

      <div className="w-full max-w-6xl mx-auto">
        {/* Main Timer Display */}
        <motion.div
          className={`glass rounded-3xl p-12 mb-12 relative overflow-hidden ${getMilestoneColor()}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Progress Ring Background */}
          <div className="absolute inset-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                className="opacity-20"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--neon-cyan))"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="283"
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 283 - (283 * progress) }}
                transition={{ duration: 1 }}
                className="glow-cyan"
              />
            </svg>
          </div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-light mb-8 gradient-text">MAKE-A-THON 2.0 ENDS IN</h2>
            
            <motion.div
              className="flex justify-center items-center space-x-6 mb-8"
              key={`${formattedTime.hours}-${formattedTime.minutes}-${formattedTime.seconds}`}
            >
              {/* Hours */}
              <motion.div
                className="timer-digit text-9xl font-mono font-bold text-neon-cyan"
                animate={{ rotateX: [0, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {formattedTime.hours}
              </motion.div>
              <span className="text-6xl text-neon-purple font-bold">:</span>
              
              {/* Minutes */}
              <motion.div
                className="timer-digit text-9xl font-mono font-bold text-neon-cyan"
                animate={{ rotateX: [0, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {formattedTime.minutes}
              </motion.div>
              <span className="text-6xl text-neon-purple font-bold">:</span>
              
              {/* Seconds */}
              <motion.div
                className="timer-digit text-9xl font-mono font-bold text-neon-cyan"
                animate={{ 
                  rotateX: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 0.5 }}
              >
                {formattedTime.seconds}
              </motion.div>
            </motion.div>

            <div className="text-xl text-muted-foreground/80 space-x-8">
              <span>HOURS</span>
              <span>MINUTES</span>
              <span>SECONDS</span>
            </div>
          </div>
        </motion.div>

        {/* Controls Toggle Button */}
        <motion.div 
          className="flex justify-center mb-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={toggleControls}
            variant="ghost"
            className="group bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-300 px-6 py-2 rounded-full"
          >
            <span className="mr-2">{showControls ? 'Hide Controls' : 'Show Controls'}</span>
            <motion.span
              animate={{ rotate: showControls ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              ▼
            </motion.span>
          </Button>
        </motion.div>

        {/* Control Buttons */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: showControls ? 1 : 0,
            height: showControls ? 'auto' : 0,
            marginBottom: showControls ? '2rem' : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Add Time Buttons */}
          <Card className="glass p-6 text-center bg-gradient-to-br from-cyan-900/30 to-cyan-500/10 border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
              Add Time
            </h3>
            <div className="space-y-3">
              <Button
                onClick={() => adjustTime(5)}
                variant="ghost"
                className="w-full group bg-cyan-900/40 hover:bg-cyan-800/60 text-cyan-100 hover:text-white border border-cyan-700/50 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Plus size={16} className="mr-2 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>5m</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">+5 min</span>
              </Button>
              <Button
                onClick={() => adjustTime(10)}
                variant="ghost"
                className="w-full group bg-cyan-900/40 hover:bg-cyan-800/60 text-cyan-100 hover:text-white border border-cyan-700/50 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Plus size={16} className="mr-2 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>10m</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">+10 min</span>
              </Button>
              <Button
                onClick={() => adjustTime(30)}
                variant="ghost"
                className="w-full group bg-cyan-900/40 hover:bg-cyan-800/60 text-cyan-100 hover:text-white border border-cyan-700/50 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Plus size={16} className="mr-2 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>30m</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">+30 min</span>
              </Button>
              <Button
                onClick={() => adjustTime(60)}
                variant="ghost"
                className="w-full group bg-cyan-900/40 hover:bg-cyan-800/60 text-cyan-100 hover:text-white border border-cyan-700/50 hover:border-cyan-400/50 transition-all duration-300"
              >
                <Plus size={16} className="mr-2 text-cyan-300 group-hover:scale-110 transition-transform" />
                <span>1h</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">+1 hour</span>
              </Button>
            </div>
          </Card>

          <Card className="glass p-6 text-center bg-gradient-to-br from-purple-900/30 to-purple-500/10 border-purple-500/20">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-fuchsia-300 text-transparent bg-clip-text">
              Remove Time
            </h3>
            <div className="space-y-3">
              <Button
                onClick={() => adjustTime(-5)}
                variant="ghost"
                className="w-full group bg-purple-900/40 hover:bg-purple-800/60 text-purple-100 hover:text-white border border-purple-700/50 hover:border-purple-400/50 transition-all duration-300"
              >
                <Minus size={16} className="mr-2 text-purple-300 group-hover:scale-110 transition-transform" />
                <span>5m</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">-5 min</span>
              </Button>
              <Button
                onClick={() => adjustTime(-10)}
                variant="ghost"
                className="w-full group bg-purple-900/40 hover:bg-purple-800/60 text-purple-100 hover:text-white border border-purple-700/50 hover:border-purple-400/50 transition-all duration-300"
              >
                <Minus size={16} className="mr-2 text-purple-300 group-hover:scale-110 transition-transform" />
                <span>10m</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">-10 min</span>
              </Button>
              <Button
                onClick={() => adjustTime(-30)}
                variant="ghost"
                className="w-full group bg-purple-900/40 hover:bg-purple-800/60 text-purple-100 hover:text-white border border-purple-700/50 hover:border-purple-400/50 transition-all duration-300"
              >
                <Minus size={16} className="mr-2 text-purple-300 group-hover:scale-110 transition-transform" />
                <span>30m</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">-30 min</span>
              </Button>
              <Button
                onClick={() => adjustTime(-60)}
                variant="ghost"
                className="w-full group bg-purple-900/40 hover:bg-purple-800/60 text-purple-100 hover:text-white border border-purple-700/50 hover:border-purple-400/50 transition-all duration-300"
              >
                <Minus size={16} className="mr-2 text-purple-300 group-hover:scale-110 transition-transform" />
                <span>1h</span>
                <span className="ml-auto text-xs opacity-70 group-hover:opacity-100">-1 hour</span>
              </Button>
            </div>
          </Card>

          <Card className="glass p-6 text-center col-span-2 bg-gradient-to-br from-pink-900/30 to-rose-500/10 border-pink-500/20">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-rose-300 text-transparent bg-clip-text">
              Timer Control
            </h3>
            <div className="space-y-3">
              <Button
                onClick={toggleTimer}
                className="w-full group bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-pink-500/20"
              >
                <span className="relative z-10">
                  {isActive ? 'Pause Timer' : 'Resume Timer'}
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              </Button>
              <Button
                onClick={resetTimer}
                variant="ghost"
                className="w-full group bg-rose-900/40 hover:bg-rose-800/60 text-rose-100 hover:text-white border border-rose-700/50 hover:border-rose-400/50 transition-all duration-300"
              >
                <RotateCcw size={16} className="mr-2 text-rose-300 group-hover:rotate-180 transition-transform duration-500" />
                <span>Reset Timer</span>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="glass rounded-full p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-4 bg-gradient-primary rounded-full glow-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;