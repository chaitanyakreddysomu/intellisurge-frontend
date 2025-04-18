import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FaYoutube } from 'react-icons/fa';

interface Blog {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string; // updated from image_url
  youtube_url: string;
  date_posted: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://intellisurgetechnologies.onrender.com/api/blogs/");
      setBlogs(response.data);
    } catch (err) {
      toast({
        title: "Error loading blogs",
        description: "Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/blogs/${id}/`);
      toast({ title: "Deleted", description: "Blog post deleted successfully." });
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Unable to delete post. Try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/blogs/edit/${id}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
        <Button asChild>
          <Link to="/admin/blogs/new">
            <Book className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading blog posts...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center mt-10">
          <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">No blog posts yet</p>
          <p className="text-gray-500 mb-4">Create your first blog post to get started</p>
          <Button asChild>
            <Link to="/admin/blogs/new">Create Blog Post</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Published</th>
                <th className="py-3 px-4">Summary</th>
                <th className="py-3 px-4">Content</th>
                <th className="py-3 px-4">YouTube</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                  <td className="py-3 px-4">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-16 w-24 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/150x100?text=No+Image";
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{blog.title}</td>
                  <td className="py-3 px-4">{new Date(blog.date_posted).toLocaleDateString()}</td>
                  <td className="py-3 px-4 max-w-sm line-clamp-2 text-gray-700">{blog.summary}</td>
                  <td className="py-3 px-4 max-w-xs truncate whitespace-nowrap overflow-hidden text-gray-600">
                    {blog.content}
                  </td>
                  <td className="py-3 px-4 text-blue-600">
                    {blog.youtube_url ? (
                      <a
                        href={blog.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <FaYoutube className="w-4 h-4 text-red-600" />
                          View
                        </Button>
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(blog.id)}>
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-500"
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

export default BlogList;
