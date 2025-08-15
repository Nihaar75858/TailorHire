import { useState } from "react";
import axios from "axios";

export default function StepReview({ data, prevStep }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const resumePreview = data.resumeFile
    ? data.resumeFile.name // just show file name
    : "No resume uploaded";

  const jobPreview = data.jobDescription
    ? data.jobDescription.slice(0, 200) + "..."
    : "No job description provided.";

  const handleAIProcess = async () => {
    if (!data.resumeFile) {
      alert("Please upload a resume first!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", data.resumeFile); // actual file
      formData.append("job", data.jobDescription || "");
      const res = await axios.post("http://localhost:8000/api/ai-job-helper-local/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(res.data);
      console.log("AI Response:", res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Review Your Submission</h2>
      <p className="mb-4">
        <strong>Resume:</strong> {resumePreview}
      </p>

      <p className="mb-4">
        <strong>Job Title:</strong> {data.jobTitle || "Not provided"}
      </p>

      <p className="mb-4">
        <strong>Job Description:</strong> {jobPreview}
      </p>

      <button
        onClick={prevStep}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg mr-4"
      >
        Back
      </button>

      <button
        onClick={handleAIProcess}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Generate Cover Letter & Score"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">AI Results</h3>
          <p><strong>Match Score:</strong> {result.score}</p>
          <p><strong>Cover Letter:</strong></p>
          <pre className="whitespace-pre-wrap">{result.cover_letter}</pre>
        </div>
      )}
    </div>
  );
}
