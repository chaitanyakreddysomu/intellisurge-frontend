import { useState } from "react";
import axios from "axios";
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
  image: File | null;
  youtube_url: string;
}

const BlogForm = () => {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost>({
    title: "",
    summary: "",
    content: "",
    image: null,
    youtube_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPost({ ...post, image: file });

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await axios.post("https://intellisurgetechnologies.onrender.com/api/blogs/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Blog post created:", response.data);

      toast({
        title: "Blog post created",
        description: `Successfully created "${post.title}"`,
      });

      setPost({
        title: "",
        summary: "",
        content: "",
        image: null,
        youtube_url: "",
      });
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error posting blog:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create Blog Post</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Enter blog title"
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
                placeholder="Brief summary of your blog post"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Featured Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {/* {previewUrl && (
                <div className="mt-2 border rounded-md overflow-hidden h-48">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input
                id="youtube_url"
                name="youtube_url"
                value={post.youtube_url}
                onChange={handleChange}
                placeholder="https://youtube.com/xyz"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="Write your blog post content here..."
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Publish Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogForm;
