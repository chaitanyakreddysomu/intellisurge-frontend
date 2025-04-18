import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import "./Css/Navbar.css";

interface BlogPostData {
  id: number;
  title: string;
  summary: string;
  content: string[];
  image: string;
  youtube_url: string;
  date_posted: string;
}

const extractVideoId = (videoInput: string): string => {
  const match = videoInput.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/|youtube\.com\/embed\/)([^?&"'>]+)/);
  return match ? match[1] : videoInput;
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://intellisurgetechnologies.onrender.com/api/blogs/${id}/`);

        const parseHtmlContent = (html: string): string[] => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const paragraphs: string[] = [];

          const extractText = (node: ChildNode) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
              paragraphs.push(node.textContent.trim());
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.nodeName === 'P' || node.nodeName === 'DIV') {
                const text = node.textContent?.trim();
                if (text) paragraphs.push(text);
              } else {
                Array.from(node.childNodes).forEach(extractText);
              }
            }
          };

          Array.from(doc.body.childNodes).forEach(extractText);
          return paragraphs.filter(p => p.length > 0);
        };

        setPost({
          ...response.data,
          content: parseHtmlContent(response.data.content)
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async () => {
      try {
        const response = await axios.get(`https://intellisurgetechnologies.onrender.com/api/blogs/`);
        const filtered = response.data.filter((blog: BlogPostData) => blog.id.toString() !== id).slice(0, 3);
        setRelatedPosts(filtered);
      } catch (err) {
        console.error('Error fetching related posts:', err);
      }
    };

    if (id) {
      fetchPost();
      fetchRelatedPosts();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading blog post...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="mb-6 text-red-500">{error}</p>
          <Link 
            to="/blogs" 
            className="inline-block px-6 py-2 bg-intellsurge-primary text-white rounded-md hover:bg-intellsurge-accent transition-colors"
          >
            Return to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div
          className="w-full h-64 md:h-96 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${post.image}')`,
            backgroundPosition: 'center center'
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto mb-2">
                {post.title}
              </h1>
              <p className="text-lg opacity-90">
                Date Posted: {new Date(post.date_posted).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <article className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {post.summary && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-lg italic text-gray-700">Summary - {post.summary}</p>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {post.youtube_url && (
              <div className="my-10">
                <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractVideoId(post.youtube_url)}`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section className="bg-white py-16 w-full">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10 text-center">Related Posts</h2>
                <div className="grid  md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <div
                      key={relatedPost.id}
                      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <Link to={`/blogs/${relatedPost.id}`}>
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                      <div className="p-6">
                        <Link to={`/blogs/${relatedPost.id}`}>
                          <h3 className="font-bold text-lg mb-2 hover:text-intellsurge-primary transition-colors text-[#0D3B66]">
                            {relatedPost.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mb-2">
                          {new Date(relatedPost.date_posted).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                        <Link
                          to={`/blogs/${relatedPost.id}`}
                          className="text-intellsurge-primary hover:text-intellsurge-accent font-medium text-sm"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            )}

            

            {/* View All Posts Button */}
            <div className="mt-12 text-center">
              <Link 
                to="/blogs" 
                className="px-6 py-2 border border-intellsurge-primary text-intellsurge-primary text-[#0D3B66] hover:bg-intellsurge-primary hover:text-[#dc3545] transition-colors rounded-md inline-block font-medium"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
