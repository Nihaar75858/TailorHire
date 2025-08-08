export default function StepResume({ data, updateFormData, nextStep }) {
  const handleFileChange = (e) => {
    updateFormData({ resumeFile: e.target.files[0] });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload or Select Resume</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={nextStep}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  );
}
