"use client";

import { getAllPosts } from "@/actions/post";
import { bokor, prata } from "@/font";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await getAllPosts();
      if ("error" in result) {
        setError(result.error);
      } else {
        setPosts(result);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500">Loading posts...</p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-500">
            {error} Please try again later.
          </p>
        )}

        {/* Posts List */}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.id}`}
              key={post.id}
              className="bg-white p-4 shadow-md rounded-lg flex flex-col"
            >
              {/* Post Image */}
              {post.images && (
                <img
                  src={post.images}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}

              {/* Post Title */}
              <h2 className={cn("text-xl font-medium mb-2", prata.className)}>
                {post.title}
              </h2>

              {/* Post Description */}
              <p className="text-gray-700 line-clamp-3">{post.description}</p>

              {/* Read More */}
              <a
                href={`/posts/${post.id}`}
                className="mt-auto text-blue-500 font-medium hover:underline"
              >
                Read More →
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
