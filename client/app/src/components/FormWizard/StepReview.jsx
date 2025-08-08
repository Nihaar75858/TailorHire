import { useNavigate } from "react-router-dom";

export default function StepReview({ data, prevStep }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Final Data:", data);
    alert("Form submitted!");
    navigate("/"); // Redirect to home or another page after submission
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
      <p><strong>Resume:</strong> {data.resumeFile?.name || "No file selected"}</p>
      <p><strong>Job Title:</strong> {data.jobTitle}</p>
      <p><strong>Job Description:</strong> {data.jobDescription}</p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
