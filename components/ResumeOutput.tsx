
import React, { useEffect } from 'react';

// A simple Markdown parser to convert markdown to basic HTML for display
// This avoids adding a full library to index.html for this single-file context
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const parsedContent = content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-indigo-300 mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold border-b border-slate-600 pb-2 mt-6 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-extrabold text-center mb-2">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\s*-\s(.*$)/gim, '<li class="ml-6 mb-1">$1</li>')
    .replace(/<\/li>\s*<li/gim, '</li><li') // fix spacing between list items
    .replace(/(<li.*?>[\s\S]*?<\/li>)/gim, '<ul>$1</ul>') // wrap list items in ul
    .replace(/<\/ul>\s*<ul>/g, '') // merge consecutive ul tags
    .replace(/\n/g, '<br />') // new lines
    .replace(/<br \/><ul>/g, '<ul>') // remove br before ul
    .replace(/<\/ul><br \/>/g, '</ul>'); // remove br after ul

  return <div dangerouslySetInnerHTML={{ __html: parsedContent }} />;
};


interface ResumeOutputProps {
  resumeMarkdown: string;
  onStartOver: () => void;
}

const ResumeOutput: React.FC<ResumeOutputProps> = ({ resumeMarkdown, onStartOver }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white">Here's Your Tailored Resume!</h2>
        <p className="text-gray-300 mt-2">Review the generated content and copy it to your preferred document editor.</p>
      </div>
      
      <div className="bg-white text-gray-800 p-8 md:p-12 rounded-lg shadow-2xl font-serif prose-sm lg:prose">
         <SimpleMarkdown content={resumeMarkdown} />
      </div>

      <div className="text-center mt-8 space-x-4">
        <button
          onClick={onStartOver}
          className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        >
          Start Over
        </button>
         <button
          onClick={() => navigator.clipboard.writeText(resumeMarkdown)}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default ResumeOutput;
