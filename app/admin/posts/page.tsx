"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { deletePost, getAllPosts } from "@/actions/post";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function AdminPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await getAllPosts();
      if ("error" in result) {
        setError(result.error);
      } else {
        setPosts(result); // result is of type Post[]
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <div className="text-red-600 font-medium">{error}</div>;
  }

  const deletePostById = async (id: string) => {
    const post = await deletePost(id);
    if (post.success) {
      router.refresh();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full mx-auto">
        <ClipLoader color="black" size={100} />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gray-50 p-6")}>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Admin Posts</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
        <Table>
          <TableCaption>A list of all posts</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm font-medium text-gray-700">
                Title
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-700">
                Description
              </TableHead>
              <TableHead className="text-sm font-medium text-gray-700 text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post: Post) => (
              <TableRow key={post.id} className="border-b hover:bg-gray-50">
                <TableCell className="py-3 px-4">{post.title}</TableCell>
                <TableCell className="py-3 px-4">{post.description}</TableCell>
                <TableCell className="py-3 px-4 text-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/admin/post/${post.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger className="text-red-600 hover:text-red-800 border-red-700 mx-2 border p-2 rounded-md">
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500"
                          onClick={() => deletePostById(post.id)}
                        >
                          Delete Post
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminPostPage;
