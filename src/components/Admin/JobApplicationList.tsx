import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const JobList = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [jobDetails, setJobDetails] = useState<{ [key: number]: any }>({});
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("https://intellisurgetechnologies.onrender.com/api/applications/");
      const apps = res.data;
      setApplications(apps);

      const uniqueJobIds = [...new Set(apps.map((app: any) => app.job))];
      await Promise.all(
        uniqueJobIds.map(async (jobId) => {
          try {
            const jobRes = await axios.get(`https://intellisurgetechnologies.onrender.com/api/jobs/${jobId}/`);
            setJobDetails((prev) => ({ ...prev, [jobId]: jobRes.data }));
          } catch (error) {
            console.error(`Error fetching job ${jobId}`, error);
          }
        })
      );
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/applications/${id}/`);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Applications</h1>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">No job applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Applied For</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const job = jobDetails[app.job];
                return (
                  <tr key={app.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{app.name}</td>
                    <td className="py-3 px-4">
                      <a
                        href={`mailto:${app.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {app.email}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      {job ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <span
                              className="text-blue-600 cursor-pointer hover:underline"
                              onClick={() => setSelectedJob(job)}
                            >
                              {job.job_title}
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-xl">
                            <DialogHeader>
                              <DialogTitle className="capitalize">{job.job_title}</DialogTitle>
                            </DialogHeader>
                            <div className="text-sm text-gray-700 space-y-2">
                              <p><strong>Department:</strong> {job.department}</p>
                              <p><strong>Location:</strong> {job.location}</p>
                              <p><strong>Job Type:</strong> {job.job_type}</p>
                              <p><strong>Salary:</strong> ₹{job.salary_range}</p>
                              <p><strong>Description:</strong> {job.job_description}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        "Loading..."
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      {app.resume && (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            Resume
                          </Button>
                        </a>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleDelete(app.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobList;
