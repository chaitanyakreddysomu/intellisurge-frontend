import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface JobListing {
  job_title: string;
  department: string;
  location: string;
  job_type: string;
  salary_range: string;
  job_description: string;
  requirements_qualifications: string;
  // apply_link: string;
}

const JobForm = () => {
  const { toast } = useToast();
  const [job, setJob] = useState<JobListing>({
    job_title: "",
    department: "",
    location: "",
    job_type: "Full-time",
    salary_range: "",
    job_description: "",
    requirements_qualifications: "",
    // apply_link: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSelectChange = (value: string, name: string) => {
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://intellisurgetechnologies.onrender.com/api/jobs/", job, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Job listing created",
        description: `Successfully created "${response.data.job_title}" in ${response.data.department}`,
      });

      // Reset form after success
      setJob({
        job_title: "",
        department: "",
        location: "",
        job_type: "Full-time",
        salary_range: "",
        job_description: "",
        requirements_qualifications: "",
        // apply_link: "",
      });
    } catch (error: any) {
      console.error("Failed to create job:", error);
      toast({
        title: "Failed to create job",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Post Job Listing</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  name="job_title"
                  value={job.job_title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={job.department}
                  onChange={handleChange}
                  placeholder="e.g. Engineering"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_type">Job Type</Label>
                <Select
                  defaultValue={job.job_type}
                  onValueChange={(value) => handleSelectChange(value, "job_type")}
                >
                  <SelectTrigger id="job_type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary_range">Salary Range</Label>
                <Input
                  id="salary_range"
                  name="salary_range"
                  value={job.salary_range}
                  onChange={handleChange}
                  placeholder="e.g. ₹80000 - ₹120000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_description">Job Description</Label>
              <Textarea
                id="job_description"
                name="job_description"
                value={job.job_description}
                onChange={handleChange}
                placeholder="Describe the role and responsibilities..."
                className="min-h-[150px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements_qualifications">
                Requirements & Qualifications
              </Label>
              <Textarea
                id="requirements_qualifications"
                name="requirements_qualifications"
                value={job.requirements_qualifications}
                onChange={handleChange}
                placeholder="List the required skills, experience, education, etc."
                className="min-h-[150px]"
                required
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="apply_link">Application Link</Label>
              <Input
                id="apply_link"
                name="apply_link"
                value={job.apply_link}
                onChange={handleChange}
                placeholder="https://yourcompany.com/careers/apply"
              />
            </div> */}

            <div className="flex justify-end">
              <Button type="submit">Publish Job</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobForm;
