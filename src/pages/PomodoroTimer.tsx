import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee, Brain, SkipForward } from 'lucide-react';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const MODES: Record<TimerMode, { label: string; minutes: number; color: string }> = {
  focus: { label: 'Focus Time', minutes: 25, color: 'from-indigo-500 to-purple-600' },
  shortBreak: { label: 'Short Break', minutes: 5, color: 'from-green-500 to-emerald-500' },
  longBreak: { label: 'Long Break', minutes: 15, color: 'from-blue-500 to-cyan-500' },
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (mode === 'focus') {
      setSessions((prev) => prev + 1);
      setTotalFocusMinutes((prev) => prev + MODES.focus.minutes);
      // Auto switch to break
      if ((sessions + 1) % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('focus');
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode].minutes * 60);
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const skipToNext = () => {
    handleTimerComplete();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = 1 - timeLeft / (MODES[mode].minutes * 60);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Study Timer</h1>
        <p className="text-gray-500 mt-1">Stay focused with the Pomodoro technique</p>
      </div>

      {/* Mode Selector */}
      <div className="flex justify-center gap-3 mb-8">
        {(Object.keys(MODES) as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              mode === m
                ? `bg-gradient-to-r ${MODES[m].color} text-white shadow-lg`
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {m === 'focus' && <Brain className="w-4 h-4 inline mr-1.5" />}
            {m === 'shortBreak' && <Coffee className="w-4 h-4 inline mr-1.5" />}
            {m === 'longBreak' && <Coffee className="w-4 h-4 inline mr-1.5" />}
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="flex justify-center mb-8">
        <motion.div
          className="relative w-72 h-72 md:w-80 md:h-80"
          animate={{ scale: isRunning ? [1, 1.01, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - progress)}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={mode === 'focus' ? '#6366f1' : mode === 'shortBreak' ? '#10b981' : '#3b82f6'} />
                <stop offset="100%" stopColor={mode === 'focus' ? '#9333ea' : mode === 'shortBreak' ? '#059669' : '#06b6d4'} />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl md:text-6xl font-mono font-bold text-gray-900">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-sm text-gray-500 mt-2">{MODES[mode].label}</span>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={resetTimer}
          className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className={`p-5 rounded-2xl bg-gradient-to-r ${MODES[mode].color} text-white shadow-lg`}
        >
          {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </motion.button>
        <button
          onClick={skipToNext}
          className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <SkipForward className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <p className="text-2xl font-bold text-indigo-600">{sessions}</p>
          <p className="text-xs text-gray-500">Sessions</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <p className="text-2xl font-bold text-purple-600">{totalFocusMinutes}</p>
          <p className="text-xs text-gray-500">Focus Min</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 text-center">
          <p className="text-2xl font-bold text-green-600">{Math.floor(sessions / 4)}</p>
          <p className="text-xs text-gray-500">Cycles</p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">🍅 Pomodoro Technique</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Work for 25 minutes with full focus</li>
          <li>• Take a 5-minute short break</li>
          <li>• After 4 sessions, take a 15-minute long break</li>
          <li>• Repeat the cycle throughout your study day</li>
          <li>• Eliminate distractions during focus time</li>
        </ul>
      </div>
    </div>
  );
}
