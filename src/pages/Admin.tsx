
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
import AdminLayout from "@/components/Admin/AdminLayout";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import BlogList from "@/components/Admin/BlogList";
import BlogForm from "@/components/Admin/BlogForm";
import YoutubeList from "@/components/Admin/YoutubeList";
import YoutubeForm from "@/components/Admin/YoutubeForm";
import JobList from "@/components/Admin/JobApplicationList";
import JobForm from "@/components/Admin/JobForm";
import JobDescriptionList from "@/components/Admin/JobApplicationList";
import NotFound from "./NotFound";


const queryClient = new QueryClient();

const Admin = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            
            {/* Blog Routes */}
            <Route path="/admin/blogs" element={<BlogList />} />
            <Route path="/admin/blogs/new" element={<BlogForm />} />
            <Route path="/admin/blogs/:id" element={<BlogForm />} />
            
            {/* YouTube Routes */}
            <Route path="/admin/youtube" element={<YoutubeList />} />
            <Route path="/admin/youtube/new" element={<YoutubeForm />} />
            <Route path="/admin/youtube/:id" element={<YoutubeForm />} />
            
            {/* Job Routes */}
            <Route path="/admin/jobs" element={<JobList />} />
            <Route path="/admin/jobs/new" element={<JobForm />} />
            <Route path="/admin/jobs/:id" element={<JobForm />} />
            
            {/* Job Description Routes */}
            <Route path="/admin/job-applications" element={<JobDescriptionList />} />
       
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default Admin;
