export default function StepJob({ data, updateFormData, nextStep, prevStep }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Job Details</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={data.jobTitle}
        onChange={(e) => updateFormData({ jobTitle: e.target.value })}
        className="block w-full mb-3 border border-gray-300 rounded-md p-2"
      />
      <textarea
        placeholder="Job Description"
        value={data.jobDescription}
        onChange={(e) => updateFormData({ jobDescription: e.target.value })}
        className="block w-full border border-gray-300 rounded-md p-2"
      />
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
