"use client";

import { getSinglePost } from "@/actions/post";
import { Comments } from "@/components/blog/comment";
import { bokor, prata } from "@/font";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function ViewSinglePostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getSinglePost(id as string);

        if (fetchedPost) {
          if ("error" in fetchedPost) {
            setError(fetchedPost.error as string);
          } else {
            setPost(fetchedPost);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostById();
    }
  }, [id]);

  // Loading Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <ClipLoader size={50} color="#3498db" />
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="text-center text-xl font-medium text-red-600">
        {error}
      </div>
    );
  }

  // If no post is found
  if (!post) {
    return (
      <div className="text-center text-xl font-medium text-red-600">
        Post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Title */}
      <h1
        className={cn(
          "text-4xl font-bold text-gray-900 mb-4 capitalize",
          prata.className
        )}
      >
        {post.title}
      </h1>

      {/* Image */}
      {post.images && (
        <div className="w-full h-[400px] relative mb-6">
          <Image
            src={post.images}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-xl text-gray-800 mb-4">{post.description}</p>

        <div className="mt-6 text-gray-700">
          <div
            className="prose prose-lg text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.story }}
          />
        </div>
      </div>
      <Comments postId={id as string} />
    </div>
  );
}

export default ViewSinglePostPage;
