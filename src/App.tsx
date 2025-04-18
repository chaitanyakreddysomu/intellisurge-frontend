import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import Career from "./pages/Career";
import NotFound from "./pages/NotFound";
import BlogsPage from "./components/BlogsPage";
import BlogPost from "./components/BlogPosts";
import Login from "./pages/Login";

// Admin Components
import AdminLayout from "@/components/Admin/AdminLayout";
import AdminDashboard from "@/components/Admin/AdminDashboard";
import BlogList from "@/components/Admin/BlogList";
import BlogForm from "@/components/Admin/BlogForm";

import JobForm from "@/components/Admin/JobForm";
import JobApplicationList from "@/components/Admin/JobApplicationList";
import JobList from "./components/Admin/JobList";
import UserList from "./components/Admin/UserList";
import UserForm from "./components/Admin/UserForm";
import AdminList from "./components/Admin/UserList";
import ServicePage from "./pages/ServicePage";
import ToolsSection from "./components/ServicesPage/ToolSection";
import EditBlog from "./components/Admin/EditBlog";
import EditJob from "./components/Admin/EditJob";
import ContactList from "./components/Admin/ContactList";
import ClientTestimonials from "./components/Admin/ClientTestimonials";
import AddClientTestimonials from "./components/Admin/AddClientTestimonials";
import EditClientTestimonials from "./components/Admin/EditClientTestimonials";
import OurTeamList from "./components/Admin/OurTeamList";
import AddOurTeam from "./components/Admin/AddOurTeam";
import EditOurTeam from "./components/Admin/EditOurTeam";
import TeamTestimonials from "./components/Admin/TeamTestimonials";
import AddTeamTestimonials from "./components/Admin/AddTeamTestimonials";
import EditTeamTestimonials from "./components/Admin/EditTeamTestimonials";
import Partners from "./components/Admin/Partners";
import AddPartners from "./components/Admin/AddPartners";
import EditPartners from "./components/Admin/EditPartners";
import OurTeamClientList from "./components/Admin/OurTeamCareerList";
import AddOurTeamCareerList from "./components/Admin/AddOurTeamCareerList";
import EditOurTeamCareerList from "./components/Admin/EditOurTeamCareerList";
// import EditAdmin from "./components/Admin/EditAdmin";


// Create a query client
const queryClient = new QueryClient();

// 🔒 PrivateRoute for protecting admin routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();

  return isAdmin ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:id" element={<BlogPost />} />
              <Route path="/career" element={<Career />} />
              <Route path="/login" element={<Login />} />
              <Route path="/service" element={<ServicePage />} />
              <Route path="/Tools" element={<ToolsSection />} />
              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<AdminDashboard />} />

                <Route path="admins" element={<AdminList />} />
                <Route path="admins/new" element={<UserForm />} />
                {/* <Route path="users/edit/:id" element={<EditAdmin />} /> */}
                {/* Blog Management */}
                <Route path="blogs" element={<BlogList />} />
                <Route path="blogs/new" element={<BlogForm />} />
                <Route path="blogs/edit/:id" element={<EditBlog />} />


                <Route path="Contact-us" element={<ContactList />} />


                <Route path="ClientTestimonials" element={<ClientTestimonials />} />
                <Route path="ClientTestimonials/add" element={<AddClientTestimonials />} />
                <Route path="ClientTestimonials/edit/:id" element={<EditClientTestimonials />} />


                <Route path="TeamTestimonials" element={<TeamTestimonials />} />
                <Route path="TeamTestimonials/add" element={<AddTeamTestimonials />} />
                <Route path="TeamTestimonials/edit/:id" element={<EditTeamTestimonials />} />
                
                <Route path="OurTeam" element={<OurTeamList />} />
                <Route path="OurTeam/add" element={<AddOurTeam />} />
                <Route path="OurTeam/edit/:id" element={<EditOurTeam />} />
                
                <Route path="OurTeamCareer" element={<OurTeamClientList />} />
                <Route path="OurTeamCareer/add" element={<AddOurTeamCareerList />} />
                <Route path="OurTeamCareer/edit/:id" element={<EditOurTeamCareerList />} />


                {/* Job Management */}
                <Route path="jobs" element={<JobList />} />
                <Route path="jobs/new" element={<JobForm />} />
                <Route path="jobs/edit/:id" element={<EditJob />} />

                <Route path="partners" element={<Partners />} />
                <Route path="partners/add" element={<AddPartners />} />
                <Route path="partners/edit/:id" element={<EditPartners />} />

                {/* Job Applications */}
                <Route path="job-applications" element={<JobApplicationList />} />
              </Route>

              {/* Fallback for unknown paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
