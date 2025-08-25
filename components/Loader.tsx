
import React, { useState, useEffect } from 'react';

const messages = [
  "Analyzing your experience...",
  "Cross-referencing with job requirements...",
  "Highlighting your key skills...",
  "Crafting impactful bullet points...",
  "Polishing the final draft...",
  "Almost there, preparing your masterpiece!"
];

const Loader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900/80 backdrop-blur-md rounded-xl max-w-lg mx-auto">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
      <h2 className="text-2xl font-semibold text-white mt-6">Generating Your Resume</h2>
      <p className="text-gray-300 mt-2 transition-opacity duration-500">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default Loader;
