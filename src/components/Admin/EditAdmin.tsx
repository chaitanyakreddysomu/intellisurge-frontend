import { useEffect, useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface Admin {
  id?: number;
  email: string;
  password?: string;
}

const EditAdmin = ({ adminId }: { adminId: number }) => {
  const { toast } = useToast();
  const [admin, setAdmin] = useState<Admin>({ email: "" });
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`https://intellisurgetechnologies.onrender.com/api/admin/${adminId}`);
        setAdmin({ email: response.data.email });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load admin data",
          variant: "destructive",
        });
      }
    };

    fetchAdmin();
  }, [adminId, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setAdmin({ ...admin, email: value });
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let updatedData: Partial<Admin> = {
        email: admin.email,
      };

      if (newPassword) {
        if (newPassword.length < 8) {
          toast({
            title: "Validation Error",
            description: "Password must be at least 8 characters",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        updatedData.password = hashedPassword;
      }

      const response = await axios.put(
        `https://intellisurgetechnologies.onrender.com/api/admin/${adminId}/`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Admin Updated",
        description: `Admin ${response.data.email} updated successfully.`,
      });

      setNewPassword("");

    } catch (error: any) {
      console.error("Admin update error:", error);
      let errorMessage = "Failed to update admin";

      if (error.response) {
        if (error.response.data?.email) {
          errorMessage = `Email ${admin.email} is already registered`;
        } else if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data === 'object') {
          errorMessage = JSON.stringify(error.response.data);
        }
      } else if (error.request) {
        errorMessage = "No response from server - check your network connection";
      } else {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Admin</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                value={admin.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password (optional)</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Enter new password if you want to change"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAdmin;
