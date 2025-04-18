import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface BlogPost {
  title: string;
  summary: string;
  content: string;
  image: File | null; // Changed from string to File
  youtube_url: string;
  image_preview_url?: string; // For preview
}

const EditBlog = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost>({
    title: "",
    summary: "",
    content: "",
    image: null,
    youtube_url: "",
    image_preview_url: "",
  });

  // Fetch blog data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://intellisurgetechnologies.onrender.com/api/blogs/${id}/`);
        setPost({
          title: res.data.title,
          summary: res.data.summary,
          content: res.data.content,
          youtube_url: res.data.youtube_url,
          image: null,
          image_preview_url: res.data.image, // Assuming backend returns image URL
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast({
          title: "Error",
          description: "Failed to load blog post.",
          variant: "destructive",
        });
      }
    };

    if (id) fetchPost();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPost((prev) => ({
        ...prev,
        image: file,
        image_preview_url: URL.createObjectURL(file),
      }));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("summary", post.summary);
    formData.append("content", post.content);
    formData.append("youtube_url", post.youtube_url);
    if (post.image) {
      formData.append("image", post.image);
    }

    try {
      await axios.put(`https://intellisurgetechnologies.onrender.com/api/blogs/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Blog post updated",
        description: `Successfully updated "${post.title}"`,
      });

      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Blog Post</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={post.summary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {post.image_preview_url && (
                <div className="mt-2 border rounded-md overflow-hidden h-48">
                  <img
                    src={post.image_preview_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Invalid+Image";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input
                id="youtube_url"
                name="youtube_url"
                value={post.youtube_url}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Update Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
