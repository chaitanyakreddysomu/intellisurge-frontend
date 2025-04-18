import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  youtube_url: string;
  date_posted: string;
}

const BlogsPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const blogSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBlogs = () => {
    blogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch('https://intellisurgetechnologies.onrender.com/api/blogs/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch blogs');
        return res.json();
      })
      .then((data: BlogPost[]) => {
        setBlogPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Navbar onBlogClick={scrollToBlogs} />
      <main className="flex-grow">
      <section className="bg-gradient-to-r from-intellsurge-primary to-intellsurge-accent pt-28 pb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">IntellSurge Blog</h1>
            

            <p className="text-xl text-blue-700/90 max-w-2xl mx-auto">
              Insights, updates, and expert perspectives on technology, innovation, and industry trends
            </p>
          </div>
        </section>

        <section ref={blogSectionRef} className="container mx-auto px-4 pt-10 pb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#0D3B66]">Our Blogs</h2>

          {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && blogPosts.length === 0 && (
            <p className="text-center text-gray-600">No blog posts found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <Link to={`/blogs/${post.id}`}>
                  <img
                    src={post.image || 'https://placehold.co/600x400?text=No+Image'}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                    }}
                  />
                </Link>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-[#0372aa]">Blog</span>
                    <span className="text-sm text-gray-500">
                    {new Date(post.date_posted).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <Link to={`/blogs/${post.id}`}>
                    <h2 className="text-xl font-bold mb-2 hover:text-[#0372aa] text-[#0D3B66]">
                      {post.title}
                    </h2>
                  </Link>
                  {/* <p className="text-gray-600 text-sm mb-2">{post.summary}</p> */}
                  <p className="text-gray-600 text-sm mb-4">
                    {post.summary.length > 100 ? `${post.summary.slice(0, 100)}...` : post.summary}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/blogs/${post.id}`}
                      className="text-[#dc3545] font-medium hover:text-[#024b74] transition-colors"
                    >
                      Read More →
                    </Link>
                    {/* {post.youtube_url && (
                      <a
                        href={post.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 underline"
                      >
                        Watch
                      </a>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogsPage;
