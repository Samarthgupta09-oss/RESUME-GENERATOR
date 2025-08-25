
import React, { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import { generateResume } from './services/geminiService';
import type { ResumeData } from './types';
import Header from './components/Header';
import Loader from './components/Loader';
import ResumeOutput from './components/ResumeOutput';

type AppState = 'form' | 'loading' | 'result' | 'error';

export default function App(): React.ReactNode {
  const [appState, setAppState] = useState<AppState>('form');
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCraftResume = async (resumeData: ResumeData) => {
    setAppState('loading');
    setGeneratedResume('');
    setErrorMessage('');
    try {
      const result = await generateResume(resumeData);
      setGeneratedResume(result);
      setAppState('result');
    } catch (error) {
      console.error('Error generating resume:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
      setAppState('error');
    }
  };

  const handleStartOver = () => {
    setAppState('form');
    setGeneratedResume('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 font-sans">
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{backgroundImage: "url('https://picsum.photos/seed/space/1920/1080')"}}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          {appState === 'form' && (
            <>
              <div className="text-center mb-8 md:mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                  AI-Powered <span className="text-indigo-400">Resume Maker</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                  Fill in your details, paste a job description, and leave everything else to generate a tailored resume.
                </p>
              </div>
              <ResumeForm onSubmit={handleCraftResume} />
            </>
          )}

          {appState === 'loading' && <Loader />}
          
          {appState === 'result' && (
            <ResumeOutput resumeMarkdown={generatedResume} onStartOver={handleStartOver} />
          )}

          {appState === 'error' && (
            <div className="text-center max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-md border border-red-500/50 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-red-400 mb-4">An Error Occurred</h2>
              <p className="text-gray-300 mb-6">{errorMessage}</p>
              <button
                onClick={handleStartOver}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
