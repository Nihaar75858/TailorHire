import React, { useState } from "react";
import axios from "axios";

export default function AIHelper() {
  const [resume, setResume] = useState(null);
  const [jobPosting, setJobPosting] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobPosting) return alert("Upload resume and job posting!");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_posting", jobPosting);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/ai-job-helper-local/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md bg">
      <h2 className="text-xl font-bold mb-4">AI Resume Helper</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Paste job posting here..."
          value={jobPosting}
          onChange={(e) => setJobPosting(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold">Match Score:</h3>
            <p className="text-lg">{result.match_score}%</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold">Cover Letter:</h3>
            <p className="whitespace-pre-line">{result.cover_letter}</p>
          </div>
        </div>
      )}
    </div>
  );
}

