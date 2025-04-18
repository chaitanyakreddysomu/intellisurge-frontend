import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Admin {
  id: number;
  email: string;
  password: string;
  date_posted: string;
  is_admin: boolean;
}

const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("https://intellisurgetechnologies.onrender.com/api/admin/");
      setAdmins(response.data);
    } catch (err) {
      toast({
        title: "Error loading admins",
        description: "Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://intellisurgetechnologies.onrender.com/api/admin/${id}/`);
      toast({ title: "Deleted", description: "Admin deleted successfully." });
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Unable to delete admin. Try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/users/edit/${id}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin List</h1>
        <Button asChild>
          <Link to="/admin/admins/new">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Add Admin
          </Link>
        </Button>
      </div>

      {loading ? (
        <p>Loading admins...</p>
      ) : admins.length === 0 ? (
        <div className="text-center mt-10">
          <ShieldCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">No admins found</p>
          <p className="text-gray-500 mb-4">Add your first admin to get started</p>
          <Button asChild>
            <Link to="/admin/admins/new">Add Admin</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="py-3 px-2">Username</th>
                <th className="py-3 px-0">Password</th>
                <th className="py-3 px-2">Date Joined</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-t border-gray-200 hover:bg-gray-50 text-sm">
                  <td className="py-3 px-2 font-medium">{admin.email}</td>
                  <td className="py-3 px-0 text-gray-500">{admin.password}</td>
                  <td className="py-3 px-2 text-gray-500">
                    {new Date(admin.date_posted).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    {/* <Button size="icon" variant="ghost" onClick={() => handleEdit(admin.id)}>
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button> */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(admin.id)}
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

export default AdminList;
