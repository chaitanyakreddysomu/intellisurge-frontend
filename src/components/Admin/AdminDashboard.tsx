import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Book,
  Briefcase,
  User,
  FileText
} from "lucide-react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    blogs: 0,
    jobs: 0,
    admins: 0,
    applications: 0
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [loggedInAdmin, setLoggedInAdmin] = useState<{ email: string } | null>(null);

  const fetchData = async () => {
    try {
      const results = await Promise.allSettled([
        axios.get("https://intellisurgetechnologies.onrender.com/api/blogs/"),
        axios.get("https://intellisurgetechnologies.onrender.com/api/jobs/"),
        axios.get("https://intellisurgetechnologies.onrender.com/api/admin/"),
        axios.get("https://intellisurgetechnologies.onrender.com/api/applications/")
      ]);

      const newCounts = { blogs: 0, jobs: 0, admins: 0, applications: 0 };
      const newErrors: string[] = [];

      if (results[0].status === "fulfilled") newCounts.blogs = results[0].value.data.length;
      else newErrors.push("Failed to load Blog Posts.");

      if (results[1].status === "fulfilled") newCounts.jobs = results[1].value.data.length;
      else newErrors.push("Failed to load Job Listings.");

      if (results[2].status === "fulfilled") newCounts.admins = results[2].value.data.length;
      else newErrors.push("Failed to load Admin Users.");

      if (results[3].status === "fulfilled") newCounts.applications = results[3].value.data.length;
      else newErrors.push("Failed to load Applications.");

      setCounts(newCounts);
      setErrors(newErrors);
    } catch {
      setErrors(["An unexpected error occurred while loading data."]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminData = localStorage.getItem("loggedInAdmin");
    if (adminData) {
      setLoggedInAdmin(JSON.parse(adminData));
    }
    fetchData();
  }, []);

  const stats = [
    {
      title: "Blog Posts",
      value: counts.blogs,
      icon: Book,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Job Listings",
      value: counts.jobs,
      icon: Briefcase,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Admins",
      value: counts.admins,
      icon: User,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Applications",
      value: counts.applications,
      icon: FileText,
      color: "bg-yellow-100 text-yellow-600"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        {loggedInAdmin && (
          <div className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow">
            Logged in as: <span className="font-semibold">{loggedInAdmin.email}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10 text-lg">Loading data...</div>
      ) : (
        <>
          {errors.length > 0 && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600">
                      New blog post: "TypeScript Best Practices" added
                    </span>
                    <span className="ml-auto text-xs text-gray-400">2h ago</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm text-gray-600">
                      Job listing: "Senior Developer" updated
                    </span>
                    <span className="ml-auto text-xs text-gray-400">1d ago</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-gray-600">
                      New application for "React Developer" submitted
                    </span>
                    <span className="ml-auto text-xs text-gray-400">3h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="/admin/admins/new"
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-8 w-8 text-yellow-500 mb-2" />
                    <span className="text-sm font-medium">Add admin</span>
                  </a>
                  <a
                    href="/admin/blogs/new"
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Book className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">New Blog Post</span>
                  </a>
                  <a
                    href="/admin/jobs/new"
                    className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Briefcase className="h-8 w-8 text-green-500 mb-2" />
                    <span className="text-sm font-medium">Post Job</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
