import React from 'react';
// import resumeFile from './resume.pdf';

const ResumeView = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">My Resume</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* View Resume */}
        <a
          href={resumeFile}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
        >
          View Resume ↗
        </a>

        {/* Download Resume */}
        <a
          href={resumeFile}
          download="My_Resume.pdf"
          className="text-black font-medium px-6 py-3 rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          Download Resume ↓
        </a>
      </div>
    </div>
  );
};

export default ResumeView;
