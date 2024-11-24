"use client";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/actions/post";
import { Post } from "@prisma/client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { prata } from "@/font";

export const PostPreview = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllPosts();
        if ("error" in result) {
          setError(result.error);
        } else {
          setPosts(result.slice(0, 4));
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <ClipLoader size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 my-10">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          {/* Post Image */}
          {post.images && (
            <img
              src={post.images}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
          )}

          <CardContent className="p-4 flex flex-col">
            {/* Post Title */}
            <h2
              className={cn(
                "text-lg font-semibold text-gray-800 mb-2 capitalize",
                prata.className
              )}
            >
              {post.title}
            </h2>

            {/* Post Description */}
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {post.description}
            </p>

            {/* Read More */}
            <div className="flex items-start justify-start">
              <Link
                href={`/blog/${post.id}`}
                className="mt-auto text-white bg-ubepsa  px-2 py-1.5 rounded-md  flex  justify-start items-start   text-center text-sm  font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
