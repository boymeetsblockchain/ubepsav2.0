import { useState, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { commentPost, getPostComments } from "@/actions/post";

interface CommentProps {
  postId: string;
}

export const Comments = ({ postId }: CommentProps) => {
  const [comments, setComments] = useState<CommentPropsCompiled[] | null>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [commentMessage, setCommentMessage] = useState<string | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const getSinglePostComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await getPostComments(postId);
        if (fetchedComments.success) {
          setComments(fetchedComments.comments);
        } else if (fetchedComments.comments?.length == 0) {
          setError("No  comments yet .");
        } else if (fetchedComments.message) {
          setCommentMessage(fetchedComments.message);
        } else {
          setError("Failed to load comments.");
        }
      } catch (err) {
        setError("An error occurred while fetching comments.");
      } finally {
        setLoading(false);
      }
    };
    getSinglePostComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      setCommentError("Comment cannot be empty.");
      return;
    }
    if (!session?.user.id) {
      alert("Please login to comment.");
      return;
    }

    try {
      const formData = new FormData();
      formData.set("userId", session?.user.id as string);
      formData.set("postId", postId);
      formData.set("content", newComment);

      const commentResponse = await commentPost(formData);

      if (commentResponse.success) {
        setComments((prev) => [commentResponse.comment, ...(prev || [])]);
        setNewComment("");
        setCommentError(null);
      } else {
        setCommentError("Failed to post comment.");
      }
    } catch (err) {
      setCommentError("An error occurred while posting your comment.");
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>

      {/* New Comment Section */}
      <div className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border rounded-md shadow-sm"
          rows={3}
          placeholder="Add a comment..."
        />
        <Button
          onClick={handleCommentSubmit}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </Button>
        {commentError && <p className="text-red-500 mt-2">{commentError}</p>}
      </div>

      {/* Comments List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading comments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="flex items-start space-x-4 pb-4 border-b"
            >
              <img
                src={comment?.user?.imageUrl || "/user.jpg"}
                alt={comment?.user?.username || "User"}
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <div className="flex-1">
                <p className="text-gray-800">
                  <span className="font-semibold">
                    {comment?.user?.username || "Anonymous"}
                  </span>{" "}
                  <span className="text-sm text-gray-500">
                    @{comment?.user?.username?.toLowerCase() || "unknown"}
                  </span>
                </p>
                <p className="text-gray-600 mt-1">{comment.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          {commentMessage} Be the first to comment!
        </p>
      )}
    </div>
  );
};
