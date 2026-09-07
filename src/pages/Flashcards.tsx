import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RotateCcw, ChevronLeft, ChevronRight, Trash2, Shuffle } from 'lucide-react';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  subject: string;
}

const initialCards: Flashcard[] = [
  { id: 1, front: 'What is the derivative of sin(x)?', back: 'cos(x) — a key UNEB Mathematics concept', subject: 'Mathematics' },
  { id: 2, front: 'Define photosynthesis', back: 'The process by which plants convert light energy into chemical energy (glucose) using CO₂ and water. 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', subject: 'Biology' },
  { id: 3, front: 'When did Uganda gain independence?', back: 'October 9, 1962 — from British colonial rule', subject: 'History' },
  { id: 4, front: 'State Newton\'s Second Law of Motion', back: 'F = ma (Force equals mass times acceleration). Essential for UNEB Physics Paper 1.', subject: 'Physics' },
  { id: 5, front: 'What is the capital city of Uganda?', back: 'Kampala — located in the central region of Uganda', subject: 'Geography' },
  { id: 6, front: 'Who wrote "A Grain of Wheat"?', back: 'Ngũgĩ wa Thiong\'o — important East African literature for UNEB', subject: 'Literature' },
  { id: 7, front: 'What is the chemical formula for sulfuric acid?', back: 'H₂SO₄ — a strong acid commonly tested in UNEB Chemistry', subject: 'Chemistry' },
  { id: 8, front: 'Translate "Hello, how are you?" to Luganda', back: '"Oli otya?" or "Owebale" (formal greeting)', subject: 'Kiswahili' },
  { id: 9, front: 'What is Ohm\'s Law?', back: 'V = IR (Voltage = Current × Resistance)', subject: 'Physics' },
  { id: 10, front: 'Name the longest river in Uganda', back: 'The Nile River — specifically the White Nile flows through Uganda from Lake Victoria', subject: 'Geography' },
];

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');

  const subjects = ['All', ...Array.from(new Set(cards.map(c => c.subject)))];
  const filteredCards = filterSubject === 'All' ? cards : cards.filter(c => c.subject === filterSubject);
  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  const handleAddCard = () => {
    if (newFront && newBack && newSubject) {
      setCards([...cards, { id: Date.now(), front: newFront, back: newBack, subject: newSubject }]);
      setNewFront('');
      setNewBack('');
      setNewSubject('');
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: number) => {
    setCards(cards.filter(c => c.id !== id));
    if (currentIndex >= filteredCards.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Flashcards</h1>
          <p className="text-gray-500 mt-1">Review and memorize key concepts</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Card
        </button>
      </div>

      {/* Add Card Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Create New Flashcard</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Front (Question)"
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Back (Answer)"
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handleAddCard}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                Save Card
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => { setFilterSubject(subject); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filterSubject === subject
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div className="flex flex-col items-center">
          <div
            className="w-full max-w-lg h-72 cursor-pointer mb-8"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="absolute top-4 left-4 text-xs bg-white/20 px-3 py-1 rounded-full">
                  {currentCard.subject}
                </span>
                <p className="text-xl md:text-2xl font-semibold text-center">{currentCard.front}</p>
                <p className="absolute bottom-4 text-xs text-white/60">Click to flip</p>
              </div>
              {/* Back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <span className="absolute top-4 left-4 text-xs bg-white/20 px-3 py-1 rounded-full">
                  Answer
                </span>
                <p className="text-lg md:text-xl text-center">{currentCard.back}</p>
                <p className="absolute bottom-4 text-xs text-white/60">Click to flip back</p>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleShuffle}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Shuffle className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleDelete(currentCard.id)}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Card {currentIndex + 1} of {filteredCards.length}
            </p>
            <div className="w-48 h-2 bg-gray-200 rounded-full mt-2 mx-auto">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No flashcards found. Create some to get started!</p>
        </div>
      )}

      {/* Flashcard Tips */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">🧠 Flashcard Study Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600 mb-4">
          <li>• Review cards regularly using spaced repetition</li>
          <li>• Keep answers concise and focused on one concept</li>
          <li>• Use images and examples to strengthen memory</li>
          <li>• Shuffle cards to avoid order-dependent memorization</li>
        </ul>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://en.wikipedia.org/wiki/Spaced_repetition"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            📖 Learn about spaced repetition
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
          <a
            href="https://www.ansorgatechnology.com/blog/flashcard-study-tips"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            📝 More flashcard strategies
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
