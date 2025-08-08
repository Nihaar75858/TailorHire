// components/JobPostings.jsx
export default function JobPostings() {
  const jobs = [
    { title: "Frontend Developer", company: "Tech Corp", location: "Remote" },
    { title: "Backend Engineer", company: "Cloudify", location: "Bangalore" },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3">Job Postings</h2>
      <ul className="space-y-3">
        {jobs.map((job, i) => (
          <li key={i} className="border-b pb-2">
            <p className="font-medium">{job.title}</p>
            <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
