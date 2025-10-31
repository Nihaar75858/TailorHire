import React from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText } from "lucide-react";

const PublicDashBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 flex flex-col items-center justify-center text-gray-800">
      <div className="text-8xl justify-center text-center text-white pt-15 pb-6">
        Welcome to TailorHire
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        {/* Primary Button */}
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition duration-200">
          Try TailorHire ↗
        </button>

        {/* Secondary Buttons */}
        <button
          onClick={() => navigate("/register")}
          className="text-black font-medium px-6 py-3 hover:underline"
        >
          Sign Up →
        </button>
        <button
          onClick={() => navigate("/formwizard")}
          className="text-black font-medium px-6 py-3 hover:underline"
        >
          Add your Resume →
        </button>
      </div>

      <div className="w-full max-w-6xl mt-12 space-y-12">
        {/* Top Two Cards */}
        <div className="grid md:grid-cols-2 gap-6 px-6">
          {/* Left Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Enhance your productivity with trusted AI agents for every team
              </h3>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:opacity-80">
                Chat now
              </button>
              <div className="mt-6 bg-gray-100 rounded-lg p-4">
                {/* Image Placeholder */}
                <img
                  src="/productivity.png"
                  alt="Productivity preview"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-black rounded-2xl shadow-lg p-6 flex flex-col justify-between text-white">
            <div>
              <h3 className="text-xl font-semibold">
                Power your AI and agents with the #1 web search API for LLMs
              </h3>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 bg-white text-black px-4 py-2 rounded-full hover:opacity-80"
              >
                Get started
              </button>
              <div className="mt-6 bg-purple-900 rounded-lg p-4 text-green-300 font-mono text-sm overflow-auto">
                <pre>{`import requests

def get_snippets_for_query(query):
    headers = {"X-API-Key": "YOUR_API_KEY"}
    params = {"query": query}
    return requests.get(
        f"https://api.ycd-index.io/search",
        params=params,
        headers=headers,
    ).json()

results = get_snippets_for_query("reasons to smile")`}</pre>
              </div>
              <div className="mt-6 p-4">
                <p>Try with our different models:</p>
                <img
                  src="/models.png"
                  alt="Productivity preview"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <section className="w-full px-6 py-16 px-8 flex flex-col md:flex-row items-center justify-between text-white">
          {/* Left Side */}
          <div className="md:w-1/2 mb-5 md:mb-0 text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Trusted by the best
            </h2>
            <p className="text-lg text-orange-100 leading-relaxed max-w-md">
              Join thousands of professionals and businesses who rely on our
              platform for seamless collaboration, trusted performance, and
              next-level results.
            </p>
          </div>

          {/* Right Side */}
          <div
            className="md:w-1/2 flex bg-gradient-to-r from-white via-orange-100 to-orange-550 h-full"
            style={{
              clipPath: "polygon(0 100%, 25% 0%, 100% 0, 100% 100%)",
            }}
          >
            <div className="pl-15">
              <img
                src="/companies.png"
                alt="Trusted companies logos"
                className="w-72 h-auto z-0"
              />
            </div>
          </div>
        </section>

        <section className="text-white py-24 flex flex-col items-center justify-center text-center">
          {/* Headings */}
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Ready to start your AI career path?
            </h2>
            <p className="text-xl md:text-2xl text-orange-50">
              Get the best results by uploading
            </p>
          </div>

          {/* Upload Cards */}
          <div className="mt-16 flex flex-col md:flex-row gap-10 justify-center w-full max-w-5xl px-6">
            {/* Resume Upload */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 w-full md:w-1/2 transition hover:scale-[1.02] hover:bg-white/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/10 p-4 rounded-full border border-white/20">
                  <UploadCloud className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Upload Your Resume
                </h3>
                <p className="text-sm text-orange-100">
                  Supported formats: <b>PDF, DOCX, DOC</b> • Max <b>5MB</b>
                </p>

                <label className="mt-4 border-2 border-dashed border-white/30 rounded-xl w-full py-10 flex flex-col items-center cursor-pointer hover:border-white/50 transition">
                  <FileText className="w-10 h-10 text-white/80 mb-2" />
                  <span className="text-white font-medium">
                    Drag & drop your file here
                  </span>
                  <span className="text-sm text-orange-100">
                    or click to browse
                  </span>
                  <input type="file" className="hidden" />
                </label>

                <div className="text-sm text-orange-100 mt-3">
                  Cost per parse: <b>20 credits</b>
                </div>
                <p className="text-xs text-orange-100/70 mt-2">
                  By uploading, you confirm you have the right to share this
                  file.
                </p>
              </div>
            </div>

            {/* Cover Letter Upload */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 w-full md:w-1/2 transition hover:scale-[1.02] hover:bg-white/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-white/10 p-4 rounded-full border border-white/20">
                  <UploadCloud className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Upload Your Cover Letter
                </h3>
                <p className="text-sm text-orange-100">
                  Supported formats: <b>PDF, DOCX, DOC</b> • Max <b>5MB</b>
                </p>

                <label className="mt-4 border-2 border-dashed border-white/30 rounded-xl w-full py-10 flex flex-col items-center cursor-pointer hover:border-white/50 transition">
                  <FileText className="w-10 h-10 text-white/80 mb-2" />
                  <span className="text-white font-medium">
                    Drag & drop your file here
                  </span>
                  <span className="text-sm text-orange-100">
                    or click to browse
                  </span>
                  <input type="file" className="hidden" />
                </label>

                <div className="text-sm text-orange-100 mt-3">
                  Cost per parse: <b>20 credits</b>
                </div>
                <p className="text-xs text-orange-100/70 mt-2">
                  By uploading, you confirm you have the right to share this
                  file.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicDashBoard;
