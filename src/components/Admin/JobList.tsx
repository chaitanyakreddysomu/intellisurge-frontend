import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Edit, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const getJobTypeBadge = (jobType: string) => {
  switch (jobType) {
    case "fulltime":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Full-time</Badge>;
    case "parttime":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Part-time</Badge>;
    case "contract":
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Contract</Badge>;
    case "freelance":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Freelance</Badge>;
    case "internship":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Internship</Badge>;
    default:
      return <Badge>{jobType}</Badge>;
  }
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios.get("https://intellisurgetechnologies.onrender.com/api/jobs/")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Failed to fetch jobs:", error))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/jobs/${id}/`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Listings</h1>
        <Button asChild>
          <Link to="/admin/jobs/new">
            <Briefcase className="h-4 w-4 mr-2" />
            Post Job
          </Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mb-4 mx-auto" />
          <p className="text-lg font-medium mb-2">No job listings yet</p>
          <p className="text-gray-500 mb-6">Post your first job to get started</p>
          <Button asChild>
            <Link to="/admin/jobs/new">Post Job</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Job Type</th>
                <th className="py-3 px-4">Salary</th>
                <th className="py-3 px-4">Posted On</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4 font-medium">{job.job_title}</td>
                  <td className="py-3 px-4">{job.department}</td>
                  <td className="py-3 px-4">{job.location}</td>
                  <td className="py-3 px-4">{getJobTypeBadge(job.job_type)}</td>
                  <td className="py-3 px-4">₹{job.salary_range}</td>
                  <td className="py-3 px-4">
                    {formatDistanceToNow(new Date(job.posted_on), { addSuffix: true })}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button asChild variant="ghost" size="icon" className="text-blue-600">
                      <Link to={`/admin/jobs/edit/${job.id}`}>
                      
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleDelete(job.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobList;
