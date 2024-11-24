"use server";

import cloudinary from "@/config/cloudinary";
import { db } from "@/lib/db";
import { error } from "console";
import { redirect } from "next/navigation";

export const createPost = async (formdata: FormData) => {
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const image = formdata.get("image") as File;
  const details = formdata.get("details") as string;

  if (!title || !description || !details) {
    return {
      error: "Missing required fields",
    };
  }
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const imageData = Buffer.from(buffer);

  // Convert the image data to base64
  const imageBase64 = imageData.toString("base64");

  // Make request to upload to Cloudinary
  const result = await cloudinary.uploader.upload(
    `data:image/png;base64,${imageBase64}`,
    {
      folder: "blog",
    }
  );

  const imageUrl = result.secure_url;

  const newPost = await db.post.create({
    data: {
      title,
      images: imageUrl,
      story: details,
      description,
    },
  });

  if (newPost) {
    redirect("/admin/posts");
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc", // Change 'desc' to 'asc' if you want ascending order
      },
    });
    return posts || []; // Returns an empty array if there are no posts
  } catch (error: unknown) {
    return { error: "Something went wrong" };
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const post = await db.post.findFirst({
      where: {
        id,
      },
    });
    return post;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { error: "Something went wrong" };
  }
};

export const commentPost = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const userId = formData.get("userId") as string;

  if (!content || !postId || !userId) {
    return {
      error: "Content, postId, and userId are required fields.",
    };
  }
  try {
    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return { error: "Post not found." };
    }

    // Check if the user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found." };
    }

    const comment = await db.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });

    return { success: "Comment added successfully.", comment };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { error: "Failed to add comment. Please try again later." };
  }
};

export const getPostComments = async (postId: string) => {
  try {
    // Validate the input
    if (!postId) {
      return { error: "Post ID is required." };
    }

    // Find the comments for the given post
    const comments = await db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    });

    if (comments.length === 0) {
      return { message: "No comments found for this post." };
    }

    return { success: "Comments retrieved successfully.", comments };
  } catch (error: unknown) {
    console.error("Error retrieving comments:", error);
    return { error: "Failed to retrieve comments. Please try again later." };
  }
};

export const deletePost = async (postId: string) => {
  // Validate the input
  if (!postId) {
    return { error: "Post ID is required." };
  }

  try {
    const post = await db.post.delete({
      where: {
        id: postId,
      },
    });

    return {
      success: "Post successfully Deleted",
    };
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return { error: "Failed to retrieve comments. Please try again later." };
  }
};
export const deletePostComment = async (commentId: string) => {
  // Validate the input
  if (!commentId) {
    return { error: "Post ID is required." };
  }

  try {
    const post = await db.comment.delete({
      where: {
        id: commentId,
      },
    });

    return {
      success: "Post successfully Deleted",
    };
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return { error: "Failed to retrieve comments. Please try again later." };
  }
};
