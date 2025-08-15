import { useState } from "react";
import { Search } from "lucide-react";


const jobs = [
  {
    id: 1,
    title: "Junior Backend Developer (Node.JS)",
    company: "Antarctica",
    location: "Mumbai, Maharashtra",
    salary: "Up to ₹8,00,000 a year",
    rating: 5.0,
    perks: ["Work from home", "Paid time off"],
    tags: ["Typically responds within 1 day", "Easily apply"],
    type: "Hybrid work",
  },
  {
    id: 2,
    title: "Frontend Developer (React)",
    company: "TechCorp",
    location: "Bengaluru, Karnataka",
    salary: "₹10,00,000 - ₹12,00,000 a year",
    rating: 4.5,
    perks: ["Health insurance", "Flexible hours"],
    tags: ["Urgently hiring"],
    type: "Remote",
  },
];

export default function JobPostings() {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  const [query, setQuery] = useState("");

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      {/* 🔍 Search bar on top */}
      <div className="p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center max-w-xl mx-auto w-full rounded-full border px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Content below search bar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left side job list */}
        <div className="w-1/3 border-r overflow-y-auto p-4 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Jobs for you</h2>
          {jobs
            .filter((job) =>
              job.title.toLowerCase().includes(query.toLowerCase()) ||
              job.company.toLowerCase().includes(query.toLowerCase()) ||
              job.tags.some((tag) =>
                tag.toLowerCase().includes(query.toLowerCase())
              )
            )
            .map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition 
                ${selectedJob?.id === job.id ? "border-blue-500" : "border-gray-300"}`}
              >
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="text-green-700 font-medium mt-2">{job.salary}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.perks.map((perk) => (
                    <span
                      key={perk}
                      className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
                {job.tags.map((tag) => (
                  <p key={tag} className="text-xs text-blue-600 mt-1">
                    {tag}
                  </p>
                ))}
              </div>
            ))}
        </div>

        {/* Right side job detail preview */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedJob ? (
            <>
              <h2 className="text-2xl font-semibold">{selectedJob.title}</h2>
              <p className="text-gray-700 mt-1">
                {selectedJob.company} • ⭐ {selectedJob.rating}
              </p>
              <p className="text-gray-600">
                {selectedJob.location} • {selectedJob.type}
              </p>
              <p className="text-lg font-medium text-green-700 mt-3">
                {selectedJob.salary}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Apply now
                </button>
                <button className="border px-4 py-2 rounded">Save</button>
                <button className="border px-4 py-2 rounded">Share</button>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">Job description</h3>
                <p className="text-gray-700 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec
                  nisi nec massa viverra sagittis. Nulla facilisi. Fusce bibendum
                  blandit magna, nec vehicula arcu facilisis at.
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
