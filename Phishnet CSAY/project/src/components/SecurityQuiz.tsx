import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';
import { quizQuestions } from '../mockData';
import { QuizQuestion } from '../types';

export function SecurityQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (!questions.length) return null;

  if (completed) {
    const percentage = (score / questions.length) * 100;
    let message = '';
    let icon = null;
    
    if (percentage >= 90) {
      message = 'Excellent! You\'re a phishing detection expert!';
      icon = <Trophy className="w-16 h-16 text-yellow-500" />;
    } else if (percentage >= 70) {
      message = 'Good job! You have solid knowledge of phishing threats.';
      icon = <CheckCircle2 className="w-16 h-16 text-green-500" />;
    } else if (percentage >= 50) {
      message = 'Not bad, but there\'s room for improvement.';
      icon = <Brain className="w-16 h-16 text-blue-500" />;
    } else {
      message = 'You should review the security guide to better protect yourself.';
      icon = <AlertTriangle className="w-16 h-16 text-orange-500" />;
    }

    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-6">{icon}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 mb-4">
              <span className="text-2xl font-bold text-blue-600">{Math.round(percentage)}%</span>
            </div>
            <p className="text-lg text-gray-700 mb-2">
              You scored {score} out of {questions.length} questions correctly!
            </p>
            <p className="text-gray-600">{message}</p>
          </div>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 rounded-xl">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Awareness Quiz</h2>
          <p className="text-gray-500">Test your knowledge about phishing threats</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-sm font-medium text-blue-600">Score: {score}</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                showExplanation
                  ? index === question.correctAnswer
                    ? 'bg-green-50 border-green-200'
                    : index === selectedAnswer
                    ? 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                  : 'hover:bg-gray-50 border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {showExplanation && index === question.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
                {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
                <span className="text-gray-700">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-blue-900">{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </button>
        )}
      </div>
    </div>
  );
}