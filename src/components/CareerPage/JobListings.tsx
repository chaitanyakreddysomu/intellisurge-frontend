import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  X,
  Banknote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';

const JobListings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState(['All']);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    resume: null,
  });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    axios
      .get('https://intellisurgetechnologies.onrender.com/api/jobs/')
      .then((response) => {
        setJobs(response.data);
        const uniqueDepartments = [
          'All',
          ...new Set(response.data.map((job) => job.department)),
        ];
        setDepartments(uniqueDepartments);
      })
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.job_title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleApplyChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setApplicantData({ ...applicantData, resume: files[0] });
    } else {
      setApplicantData({ ...applicantData, [name]: value });
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('job', selectedJob.id);
    formData.append('name', applicantData.name);
    formData.append('email', applicantData.email);
    formData.append('resume', applicantData.resume);

    axios
      .post('https://intellisurgetechnologies.onrender.com/api/applications/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setSuccessMsg('Application submitted successfully!');
        setApplicantData({ name: '', email: '', resume: null });
        setTimeout(() => {
          setShowApplyForm(false);
          setSelectedJob(null);
          setSuccessMsg('');
        }, 1000);
      })
      .catch((error) => console.error('Error submitting application:', error));
  };

  return (
    <section className="bg-gray-50 section-padding" id="jobs">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0D3B66] text-center">
          Open Positions
        </h2>
        <p className="text-lg text-center text-[#dc3545] mt-2 mb-10">
          Discover exciting career opportunities and join our team of passionate innovators.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search positions..."
              className="pl-10 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-[#11B5E4]" />
            <span className="text-gray-700">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {departments.map((department) => (
                <Button
                  key={department}
                  variant={
                    selectedDepartment === department ? 'default' : 'outline'
                  }
                  size="sm"
                  className={
                    selectedDepartment === department
                      ? 'bg-[#0D3B66] text-white hover:bg-[#11B5E4]'
                      : 'text-gray-700 hover:text-white hover:bg-[#0D3B66] border-gray-300 hover:border-[#11B5E4] capitalize bg-white'
                  }
                  onClick={() => setSelectedDepartment(department)}
                >
                  {department}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <div className="border-l-4 border-[#11B5E4] p-6 relative">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-[#0D3B66] mb-2 group-hover:text-[#dc3545] transition-colors duration-300 capitalize">
                    {job.job_title}
                  </h3>
                  <span className="inline-block bg-[#11B5E4]/10 text-[#11B5E4] capitalize text-xs font-medium px-2 py-1 rounded-full">
                    {job.department}
                  </span>
                </div>

                <div className="flex flex-col space-y-2 mt-4 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span className="capitalize">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={16} className="mr-2" />
                    <span>{job.job_type}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>
                      Posted{' '}
                      {formatDistanceToNow(new Date(job.posted_on), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Banknote size={16} className="mr-2" />
                    <span>&#8377;{job.salary_range}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-white hover:bg-[#0D3B66] text-[#0D3B66] hover:text-white border border-[#0D3B66] transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                  }}
                >
                  View Position <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">
            Don't see a position that matches your skills?
          </p>
          <Button className="bg-[#dc3545] hover:bg-[#0D3B66] text-white transition-colors duration-300">
            Send Your Resume
          </Button>
        </div> */}

        {/* View Job Popup */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-[#dc3545] transition-colors"
              >
                <X size={22} />
              </button>

              <div className="flex items-center justify-between mb-1">
                <h2 className="text-2xl font-bold text-[#45494d] capitalize">
                  {selectedJob.job_title}
                </h2>
                <span className="text-sm text-gray-500 capitalize">
                  {formatDistanceToNow(new Date(selectedJob.posted_on), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="text-sm text-[#11B5E4] mb-4 font-medium capitalize">
                {selectedJob.department} • {selectedJob.location}
              </p>
              <div className="text-sm text-gray-500 mb-6">
                Type: {selectedJob.job_type} | Salary: {selectedJob.salary_range}
              </div>
              <div className="text-gray-700 leading-relaxed space-y-3 mb-4">
                <p>
                  <strong>Requirements:</strong>{' '}
                  <span className="text-[#11B5E4] capitalize">
                    {selectedJob.requirements_qualifications}
                  </span>
                </p>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-3 mb-4">
                {selectedJob.job_description}
              </div>

              <Button
                className="w-full bg-[#11B5E4] hover:bg-[#0D3B66] text-white"
                onClick={() => setShowApplyForm(true)}
              >
                Apply Now
              </Button>
            </div>
          </div>
        )}

        {/* Apply Form Modal */}
        {showApplyForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowApplyForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-[#dc3545]"
              >
                <X size={22} />
              </button>
              <h3 className="text-xl font-semibold text-[#0D3B66] mb-4">
                Apply for {selectedJob.job_title}
              </h3>
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <Input
                  className="text-black"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={applicantData.name}
                  onChange={handleApplyChange}
                />
                <Input
                  className="text-black"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={applicantData.email}
                  onChange={handleApplyChange}
                />
                <input
                  className="text-black block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  type="file"
                  name="resume"
                  accept=".pdf"
                  required
                  onChange={handleApplyChange}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#11B5E4] hover:bg-[#0D3B66] text-white"
                >
                  Submit Application
                </Button>
              </form>
              {successMsg && (
                <p className="text-green-600 text-sm mt-4">{successMsg}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
