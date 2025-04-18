import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Book, Briefcase, FileText, Youtube, Menu, X ,User} from "lucide-react";
import { FaEnvelope,FaRegStar ,FaStar ,FaHandshake,FaUsers,FaCode  } from 'react-icons/fa';


interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();

  const navItems = [
    { icon: User, label: "Admins", path: "/admin/admins" },
  { icon: Book, label: "Blog Posts", path: "/admin/blogs" },
  { icon: FaEnvelope, label: "Contact Us", path: "/admin/Contact-us" },
  { icon: FileText, label: "Job Applications", path: "/admin/job-applications" },
  { icon: Briefcase, label: "Job Listings", path: "/admin/jobs" },
  { icon: FaUsers, label: "Our Team(Career Page)", path: "/admin/OurTeamCareer" },
  { icon: FaUsers, label: "Our Team(User Page)", path: "/admin/OurTeam" },
  { icon: FaHandshake, label: "Partners", path: "/admin/Partners" },
  { icon: FaRegStar, label: "Testimonials(Client)", path: "/admin/ClientTestimonials" },
  { icon: FaStar, label: "Testimonials(Team)", path: "/admin/TeamTestimonials" }
    // { icon: FaCode  , label: "Tools", path: "/admin/Tools" },
  ];

  return (
    <>
      {/* Hamburger Button - Only on Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 text-gray-800 bg-white p-2 rounded-md shadow"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 z-40 fixed md:relative inset-y-0 left-0 transition-all duration-300 ease-in-out",
          isOpen
            ? "w-64"
            : "w-0 overflow-hidden", // Mobile behavior
          "md:w-64 md:block" // Always visible on md and up
        )}
      >
        <div className="h-full flex flex-col">
          {/* Top section with logo and close icon */}
          <div className="p-4 border-b flex items-center justify-between">
            <a
              href="/admin"
              className="block w-full max-w-[150px] md:max-w-[180px] lg:max-w-[200px]"
            >
              <img
                src="https://intellisurgetechnologies.com/images/logo-final.svg"
                alt="Logo"
                className="w-full h-auto object-contain"
              />
            </a>

            {/* Close button for mobile only */}
            <button
              className="md:hidden ml-2 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 pt-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)} // Close on link click (mobile)
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md group transition-colors",
                      location.pathname === item.path
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Optional: Backdrop for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
