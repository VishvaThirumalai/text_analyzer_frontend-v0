import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Star, Github } from 'lucide-react';
import { useTextAnalysis } from './hooks/useTextAnalysis';
import TextInput from './components/TextInput';
import ToneSelector from './components/ToneSelector';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [text, setText] = useState('');
  const [selectedTone, setSelectedTone] = useState(null);
  const { loading, error, result, analyzeText, reset } = useTextAnalysis();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert('Please enter some text to analyze');
      return;
    }

    await analyzeText(text, selectedTone);
  };

  const handleReset = () => {
    setText('');
    setSelectedTone(null);
    reset();
  };

  const handleCopyNotification = (section) => {
    console.log(`Copied ${section} to clipboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-effect border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  Text Analyzer AI
                </h1>
                <p className="text-gray-600">
                  Extract morals, keywords, and transform tone with AI
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Zap className="w-4 h-4 text-yellow-500" />
                Powered by OpenAI & Transformers
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass-effect rounded-2xl p-6">
                <TextInput
                  value={text}
                  onChange={setText}
                  placeholder="Enter your text here... You can paste paragraphs, stories, articles, or any content you want to analyze. The AI will extract the moral, identify key phrases, and help you transform the tone."
                />
                
                <div className="mt-6">
                  <ToneSelector
                    selectedTone={selectedTone}
                    onToneChange={setSelectedTone}
                    disabled={loading}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading || !text.trim()}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap className="w-5 h-5" />
                    {loading ? 'Analyzing...' : 'Analyze Text'}
                  </button>
                  
                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reset
                  </button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                  >
                    <strong>Error:</strong> {error}
                  </motion.div>
                )}
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-effect rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-600" />
                  Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Moral & Lesson Extraction
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Keyword & Phrase Identification
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Tone Analysis & Transformation
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Multiple Tone Styles
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <AnimatePresence mode="wait">
                {loading && <LoadingSpinner />}
                
                {result && !loading && (
                  <ResultDisplay 
                    result={result} 
                    onCopy={handleCopyNotification}
                  />
                )}
                
                {!result && !loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-effect rounded-2xl p-8 text-center"
                  >
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Ready to Analyze
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Enter your text on the left and click "Analyze Text" to get started. 
                        The AI will extract the moral, identify key phrases, and help you transform the tone.
                      </p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <p>✨ Perfect for stories, articles, emails, and more</p>
                        <p>🚀 Supports up to 10,000 characters</p>
                        <p>🎯 8 different tone transformations</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-effect border-t border-white/20 mt-12"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-600">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <span>© 2024 Text Analyzer AI</span>
              <span className="hidden md:inline">•</span>
              <span>Built with React & FastAPI</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                AI-Powered Analysis
              </span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;