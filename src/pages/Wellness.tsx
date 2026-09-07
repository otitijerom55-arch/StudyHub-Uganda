import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Moon, Droplets, Smile, AlertCircle, Phone, BookHeart } from 'lucide-react';

interface MoodEntry {
  id: number;
  mood: string;
  emoji: string;
  note: string;
  date: string;
}

const moods = [
  { label: 'Great', emoji: '😄', color: 'bg-green-100 border-green-300 text-green-700' },
  { label: 'Good', emoji: '😊', color: 'bg-emerald-100 border-emerald-300 text-emerald-700' },
  { label: 'Okay', emoji: '😐', color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
  { label: 'Low', emoji: '😔', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  { label: 'Stressed', emoji: '😰', color: 'bg-red-100 border-red-300 text-red-700' },
];

const wellnessTips = [
  { icon: Moon, title: 'Sleep Well', tip: 'Aim for 7-9 hours of sleep. Avoid screens 30 min before bed.', color: 'text-indigo-600 bg-indigo-50' },
  { icon: Droplets, title: 'Stay Hydrated', tip: 'Drink at least 8 glasses of water daily for optimal brain function.', color: 'text-blue-600 bg-blue-50' },
  { icon: Brain, title: 'Mindfulness', tip: 'Practice 5 minutes of meditation to reduce stress and improve focus.', color: 'text-purple-600 bg-purple-50' },
  { icon: Heart, title: 'Move Your Body', tip: '30 minutes of exercise boosts memory and cognitive function.', color: 'text-red-600 bg-red-50' },
];

const breathingExercises = [
  { name: '4-7-8 Breathing', steps: 'Inhale 4s → Hold 7s → Exhale 8s', duration: '4 cycles' },
  { name: 'Box Breathing', steps: 'Inhale 4s → Hold 4s → Exhale 4s → Hold 4s', duration: '5 minutes' },
  { name: 'Deep Belly Breathing', steps: 'Slow deep breaths focusing on belly expansion', duration: '3 minutes' },
];

const crisisResources = [
  { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 crisis counseling' },
  { name: 'Suicide Prevention Lifeline', number: '988', description: 'Call or text for immediate help' },
  { name: 'SAMHSA Helpline', number: '1-800-662-4357', description: 'Mental health & substance abuse support' },
];

export default function Wellness() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { id: 1, mood: 'Good', emoji: '😊', note: 'Productive study session', date: 'Today' },
    { id: 2, mood: 'Okay', emoji: '😐', note: 'Feeling a bit tired', date: 'Yesterday' },
    { id: 3, mood: 'Great', emoji: '😄', note: 'Aced my test!', date: '2 days ago' },
  ]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [showBreathing, setShowBreathing] = useState(false);
  const [activeBreathing, setActiveBreathing] = useState<number | null>(null);

  const logMood = () => {
    if (selectedMood) {
      const mood = moods.find(m => m.label === selectedMood);
      if (mood) {
        setMoodEntries([
          { id: Date.now(), mood: mood.label, emoji: mood.emoji, note: moodNote || 'No note', date: 'Just now' },
          ...moodEntries
        ]);
        setSelectedMood(null);
        setMoodNote('');
      }
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Wellness Center</h1>
        <p className="text-gray-500 mt-1">Take care of your mind and body</p>
      </div>

      {/* Mood Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6"
      >
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Smile className="w-5 h-5 text-yellow-500" />
          How are you feeling?
        </h2>
        <div className="flex flex-wrap gap-3 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(mood.label)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                selectedMood === mood.label
                  ? mood.color + ' scale-105 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex gap-3"
          >
            <input
              type="text"
              placeholder="Add a note (optional)"
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={logMood}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Log Mood
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Mood History */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Moods</h2>
        <div className="space-y-3">
          {moodEntries.slice(0, 5).map((entry) => (
            <div key={entry.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <span className="text-2xl">{entry.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{entry.mood}</p>
                <p className="text-xs text-gray-500">{entry.note}</p>
              </div>
              <span className="text-xs text-gray-400">{entry.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Wellness Tips */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-pink-500" />
            Daily Wellness Tips
          </h2>
          <div className="space-y-4">
            {wellnessTips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${tip.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{tip.title}</p>
                    <p className="text-xs text-gray-500">{tip.tip}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Breathing Exercises */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Breathing Exercises
          </h2>
          <div className="space-y-3">
            {breathingExercises.map((exercise, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeBreathing === i
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
                onClick={() => setActiveBreathing(activeBreathing === i ? null : i)}
              >
                <p className="text-sm font-medium text-gray-900">{exercise.name}</p>
                <p className="text-xs text-gray-500 mt-1">{exercise.steps}</p>
                <p className="text-xs text-purple-600 mt-1">Duration: {exercise.duration}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Crisis Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100"
      >
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          Crisis Resources
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          If you're in crisis or need immediate support, please reach out:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {crisisResources.map((resource, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-red-500" />
                <p className="text-sm font-medium text-gray-900">{resource.name}</p>
              </div>
              <p className="text-sm font-bold text-red-600">{resource.number}</p>
              <p className="text-xs text-gray-500 mt-1">{resource.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
